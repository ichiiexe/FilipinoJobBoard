import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getJobs } from "../api/axios";

// Component or helper function.
function Jobs() {
// Access authentication helpers.
  const { isAuthenticated } = useAuth();
// React Router navigation hook.
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<any[]>([]);
// Local React state.
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await getJobs();
        setJobs(res.jobs || []);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = (jobId: string) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    alert(`Applied to job ${jobId}!`);
  };

  return (
    <div className="flex flex-col p-10 min-h-[80vh] text-text">
      <div className="mb-10 space-y-4">
        <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
          Explore jobs
        </span>
        <h1 className="text-5xl font-extrabold tracking-tight">
          Discover the latest openings
        </h1>
        <p className="max-w-3xl text-text-dim text-lg">
          Browse real job postings from companies and see who posted each role.
          Sign in to apply and connect with recruiters.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-16 text-text-dim">Loading jobs...</div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-16 text-text-dim">
          No jobs available yet.
        </div>
      ) : (
        <div className="grid gap-8 xl:grid-cols-3 lg:grid-cols-2">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="rounded-2xl bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                  {job.salary}
                </div>
                <div className="rounded-2xl border border-border bg-surface px-3 py-2 text-text-dim transition group-hover:bg-primary group-hover:text-white">
                  Save
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div>
                  <h2 className="text-3xl font-semibold tracking-tight text-text">
                    {job.title}
                  </h2>
                  <p className="mt-3 text-sm text-text-dim">
                    {job.companyName} · {job.location}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl bg-surface p-4">
                    <p className="text-xs uppercase tracking-[0.35em] text-text-dim">
                      Type
                    </p>
                    <p className="mt-2 font-semibold text-text">
                      {job.jobType}
                    </p>
                  </div>
                  <div className="rounded-3xl bg-surface p-4">
                    <p className="text-xs uppercase tracking-[0.35em] text-text-dim">
                      Level
                    </p>
                    <p className="mt-2 font-semibold text-text">
                      {job.experienceLevel}
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-6 line-clamp-3 text-text-dim">
                {job.description}
              </p>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-text-dim">
                    Posted by
                  </p>
                  <p className="mt-2 font-medium text-text">
                    {job.postedBy?.fullName || "Unknown"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleApply(job._id)}
                  disabled={!isAuthenticated}
                  className={`rounded-full px-6 py-3 text-sm font-semibold transition-all ${
                    isAuthenticated
                      ? "bg-primary text-white hover:bg-primary-hover"
                      : "bg-surface text-text-dim cursor-not-allowed"
                  }`}
                >
                  {isAuthenticated ? "Apply Now" : "Login to Apply"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Jobs;
