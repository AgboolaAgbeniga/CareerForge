export default function RecruiterLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-400 mx-auto mb-3"></div>
        <p className="text-slate-300">Loading recruiter dashboard...</p>
      </div>
    </div>
  );
}
