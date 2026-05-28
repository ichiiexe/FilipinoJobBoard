import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import { postJob } from "../api/axios";
import { Briefcase, Building2, FileText } from "lucide-react";
import Button from "../components/ui/Button";

const jobTypes = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Live-in",
  "Remote",
];

const experienceLevels = ["Entry-level", "Mid-level", "Senior-level"];

// Component or helper function.
function Post() {
// React Router navigation hook.
  const navigate = useNavigate();
// Local React state.
  const [loading, setLoading] = useState(false);
// Local React state.
  const [form, setForm] = useState({
    title: "",
    description: "",
    companyName: "",
    location: "",
    salary: "",
    jobType: jobTypes[0],
    experienceLevel: experienceLevels[0],
    skills: "",
    applyURL: "",
  });

  const handleInputChange = (name: keyof typeof form, value: string) => {
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        skills: form.skills
          ? form.skills
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
      } as any;

      await postJob(payload);
      navigate("/jobs");
    } catch (err) {
      console.error(err);
      alert("Failed to post job. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)]  px-8 py-10 text-text">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="rounded-2xl border border-elevated bg-bg p-10 shadow-2xl shadow-black/20">
          <div className="mb-6">
            <h1 className="text-4xl font-extrabold tracking-tight">
              Post a Job
            </h1>
            <p className="mt-2 text-text-dim max-w-2xl">
              Find the right candidate by sharing a clean, easy-to-scan job
              posting.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-6">
            <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Briefcase className="text-danger" size={20} />
                    <h2 className="text-xl font-semibold">Job Details</h2>
                  </div>

                  <p className="text-sm text-text-dim">
                    Title, category, experience level, and salary range.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <FormField
                  label="Job Title"
                  name="title"
                  required
                  placeholder="e.g. Senior Frontend Developer"
                  type="text"
                  value={form.title}
                  onChange={(value) => handleInputChange("title", value)}
                />
                <FormField
                  label="Category"
                  name="jobType"
                  required
                  placeholder="Select a category"
                  as="select"
                  options={jobTypes}
                  value={form.jobType}
                  onChange={(value) => handleInputChange("jobType", value)}
                />
                <FormField
                  label="Employment Type"
                  name="experienceLevel"
                  required
                  placeholder="Select experience level"
                  as="select"
                  options={experienceLevels}
                  value={form.experienceLevel}
                  onChange={(value) =>
                    handleInputChange("experienceLevel", value)
                  }
                />
                <FormField
                  label="Salary Range"
                  name="salary"
                  required
                  placeholder="e.g. ₱50k - ₱70k"
                  type="text"
                  value={form.salary}
                  onChange={(value) => handleInputChange("salary", value)}
                />
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-1">
                  <Building2 className="text-danger" size={20} />
                  <h2 className="text-xl font-semibold">Company & Location</h2>
                </div>
                <p className="text-sm text-text-dim">
                  Tell candidates where the role is based and which company is
                  hiring.
                </p>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <FormField
                  label="Company Name"
                  name="companyName"
                  required
                  placeholder="Your company name"
                  type="text"
                  value={form.companyName}
                  onChange={(value) => handleInputChange("companyName", value)}
                />
                <FormField
                  label="Location"
                  name="location"
                  required
                  placeholder="e.g. Manila, Philippines"
                  type="text"
                  value={form.location}
                  onChange={(value) => handleInputChange("location", value)}
                />
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="text-danger" size={20} />
                  <h2 className="text-xl font-semibold">Job Description</h2>
                </div>
                <p className="text-sm text-text-dim">
                  Add the responsibilities, requirements, and what makes this
                  role exciting.
                </p>
              </div>

              <div className="grid gap-4">
                <FormField
                  label="Description"
                  name="description"
                  required
                  placeholder="Describe the role and responsibilities..."
                  as="textarea"
                  rows={6}
                  value={form.description}
                  onChange={(value) => handleInputChange("description", value)}
                />
                <FormField
                  label="Requirements"
                  name="skills"
                  required={false}
                  placeholder="List required skills, comma separated"
                  type="text"
                  value={form.skills}
                  onChange={(value) => handleInputChange("skills", value)}
                />
                <FormField
                  label="Apply Link"
                  name="applyURL"
                  required={false}
                  placeholder="Link to apply"
                  type="url"
                  value={form.applyURL}
                  onChange={(value) => handleInputChange("applyURL", value)}
                />
              </div>
            </section>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
              <Button type="button" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Posting..." : "Post Job"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Post;
