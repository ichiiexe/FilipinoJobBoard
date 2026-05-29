import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getJobs } from "../api/axios";
import { Bookmark } from "lucide-react";

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
            <></>
          ))}
        </div>
      )}
    </div>
  );
}

export default Jobs;
