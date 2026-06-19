export default function JobSeekerLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto mb-3"></div>
        <p className="text-slate-600">Loading your dashboard...</p>
      </div>
    </div>
  );
}
