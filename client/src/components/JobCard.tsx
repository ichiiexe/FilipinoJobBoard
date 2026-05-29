import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { Bookmark } from "lucide-react";

function Jobs() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleApply = (jobId: string) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    alert(`Applied to job ${jobId}!`);
  };

  const job = {
    _id: "1",
    title: "Software Engineer",
    salary: 5000,
    postedBy: {
      name: "Tech Company",
    },
  };

  return (
    <div
      key={job._id}
      className="w-[20rem] h-100 relative rounded-2xl border border-border bg-card p-2 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex flex-col items-center gap-4 w-full rounded-lg h-[80%] bg-danger ">
        <div className="flex items-start justify-between gap-3 w-full">
          <p className="p-2 rounded-2xl text-sm font-semibold text-text">
            ${job.salary}/mo
          </p>
          <button className="rounded-2xl px-3 py-2 text-dim transition group-hover:bg-primary group-hover:text-white">
            <Bookmark />
          </button>
        </div>
        <h2 className="text-3xl font-semibold tracking-tight text-muted-foreground w-full p-2">
          {job.title}
        </h2>
      </div>

      <div className="flex items-center justify-between w-full h-[20%] ">
        <div className="flex items-center gap-2">
          <img
            src="/default-avatar.png"
            alt="Avatar"
            className="w-6 h-6 rounded-full"
          />

          <p className="text-sm text-text-dim ml-2.5">
            {job.postedBy?.name || "Unknown Company"}
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
          {isAuthenticated ? "View" : "Login to Apply"}
        </button>
      </div>
    </div>
  );
}
