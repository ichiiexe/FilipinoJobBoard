import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Bookmark, Edit, Pin, Trash } from "lucide-react";
import Button from "../components/ui/Button";
import { getJobById } from "../api/axios";
import { useUser } from "../hooks/useUser";

function JobDetail() {
  const { user } = useUser();
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchJob = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getJobById(id);
        setJob(response.job);
      } catch (err) {
        console.error("Failed to load job details:", err);
        setError("Unable to load job details.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-text-dim">
        Loading job details...
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="container mx-auto px-4 py-8 text-text-dim">
        {error || "Job not found."}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-8 py-12 text-text">
      <div className="flex flex-col border border-border rounded-2xl bg-card p-20 shadow-sm">
        <div className="flex justify-between gap-4">
          <h1 className="text-4xl font-bold tracking-tight">{job.title}</h1>
          <div className="flex items-center gap-4">
            <button className="flex items-center transition-colors hover:text-primary-hover">
              <Bookmark size={24} />
            </button>
            {user?.role === "admin" && (
              <>
                <button className="flex items-center transition-colors hover:text-primary-hover">
                  <Edit size={24} />
                </button>
                <button className="flex items-center transition-colors hover:text-red-600">
                  <Trash size={24} />
                </button>
              </>
            )}
            <Button>Apply Now</Button>
          </div>
        </div>
        <div className="flex items-center gap-4 p-2">
          <img
            src="/default-avatar.png"
            alt="Company Logo"
            className="w-16 h-16 rounded-full"
          />
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className="text-base font-semibold text-text">
                {job.companyName || job.postedBy?.fullName}
              </p>
              <Pin size={16} className="inline-block text-danger" />
              <p className="text-sm text-text-dim">{job.location}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-sm bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                {job.jobType}
              </span>
              <span className="inline-flex items-center rounded-sm bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                {job.experienceLevel}
              </span>
              <span className="inline-flex items-center rounded-sm bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                {job.salary}/mo
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-auto text-sm text-text-dim">
            <p>Posted by: </p>
            <p className="text-sm text-text-dim">
              {job.postedBy?.fullName || "Unknown"}
            </p>
          </div>
        </div>
        <div className="mt-6 p-4">
          <section className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Role Summary</h2>
            <p className="leading-7 text-text-dim">{job.description}</p>
          </section>
          <section className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">
              Required Skills & Qualifications
            </h2>
            <p className="leading-7 text-text-dim">{job.requirements}</p>
          </section>
          <section className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">
              Key Responsibilities
            </h2>
            <p className="leading-7 text-text-dim">{job.keyResponsibilities}</p>
          </section>
          {job.niceToHave && (
            <section className="mt-10">
              <h2 className="text-2xl font-semibold mb-4">
                Nice to Have (Bonus Qualifications)
              </h2>
              <p className="leading-7 text-text-dim">{job.niceToHave}</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobDetail;
