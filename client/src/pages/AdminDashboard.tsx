function AdminDashboard() {
  return (
    <div className="flex flex-col p-10 min-h-[80vh]">
      <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-text-dim max-w-2xl">
        This page is only visible to admin users. Use it to manage users, job
        listings, or administrative settings.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">User Management</h2>
          <p className="text-text-dim">
            Approve accounts, manage roles, or disable users.
          </p>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Job Management</h2>
          <p className="text-text-dim">
            Create, edit, and remove job listings across the platform.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
