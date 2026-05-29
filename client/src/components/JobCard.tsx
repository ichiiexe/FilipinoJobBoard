import { Link } from "react-router-dom";

type JobCardProps = {
  job: {
    _id: string;
    title: string;
    salary: string;
    companyName?: string;
    location?: string;
    jobType?: string;
    experienceLevel?: string;
    postedBy?: {
      fullName?: string;
    };
  };
};

function JobCard({ job }: JobCardProps) {
  return (
    <div
      key={job._id}
      className="w-[20rem] h-100 relative rounded-2xl border border-border bg-card p-2 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex flex-col gap-4 w-full rounded-lg h-[80%] bg-danger/90 p-4 text-text">
        <div className="flex items-start justify-between gap-3 w-full">
          <p className="text-sm font-semibold">
            {job.salary || "Salary not listed"}$/mo
          </p>
          <p className="text-sm font-semibold">{job.jobType || "Job"}</p>
        </div>

        <h2 className="p-5 text-4xl font-semibold tracking-wide italic text-muted-foreground">
          {job.title}
        </h2>
      </div>

      <div className="flex items-center justify-between w-full h-[20%] px-4">
        <div className="flex items-center gap-2">
          <img
            src="/default-avatar.png"
            alt="Avatar"
            className="w-6 h-6 rounded-full"
          />

          <p className="text-sm text-text-dim ml-2.5">
            {job.companyName || job.postedBy?.fullName || "Unknown Company"}
          </p>
        </div>

        <Link
          to={`/jobs/${job._id}`}
          className="text-md font-medium px-6 py-2 bg-primary rounded-4xl text-white transition-colors hover:bg-primary-hover "
        >
          View
        </Link>
      </div>
    </div>
  );
}

export default JobCard;
