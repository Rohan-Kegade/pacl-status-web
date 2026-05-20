import React, { useState } from "react";
import {
  Search,
  Loader2,
  Download,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export default function CheckJobStatusCard() {
  const [jobId, setJobId] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobDetails, setJobDetails] = useState(null);
  const [error, setError] = useState(null);

  const handleCheckStatus = async (e) => {
    e.preventDefault();

    if (!jobId.trim()) return;

    setLoading(true);
    setError(null);
    setJobDetails(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setJobDetails({
        id: jobId.trim(),
        status: "SUCCESS",
        totalRecords: 100,
      });
    } catch {
      setError("Invalid Job ID or records could not be retrieved.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!jobDetails) return;

    console.log(`Downloading job: ${jobDetails.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto w-full rounded-3xl border border-emerald-200 bg-white shadow-2xl shadow-emerald-900/10 my-4">
      <div className="w-full rounded-[26px] bg-white px-4 py-8 font-sans antialiased">
        <div className="flex flex-col items-center">
          <h2 className="mb-6 text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            Check Job Status
          </h2>

          <form
            onSubmit={handleCheckStatus}
            className="w-full rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xl flex flex-col sm:flex-row items-center gap-3.5"
          >
            <div className="relative w-full flex-grow">
              <input
                type="text"
                value={jobId}
                onChange={(e) => setJobId(e.target.value)}
                placeholder="Enter Job ID"
                disabled={loading}
                className="
                  w-full rounded-xl border border-slate-300
                  bg-slate-50/30 px-4 py-3 text-sm font-medium
                  text-slate-800 placeholder-slate-400
                  focus:outline-none focus:ring-2
                  focus:ring-blue-500/20 focus:border-blue-500
                  disabled:bg-slate-50 disabled:text-slate-400
                "
              />
            </div>

            <button
              type="submit"
              disabled={loading || !jobId.trim()}
              className={`
                w-full sm:w-auto min-w-[120px]
                inline-flex items-center justify-center gap-2
                rounded-xl px-6 py-3 text-sm font-bold uppercase tracking-wider transition
                ${
                  loading || !jobId.trim()
                    ? "cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-400 shadow-none"
                    : "bg-blue-600 text-white hover:bg-blue-500 active:scale-[0.98] shadow-md"
                }
              `}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Search className="h-4 w-4 stroke-[2.5]" />
                  Check
                </>
              )}
            </button>
          </form>

          <div className="mt-4 w-full flex flex-col gap-3">
            {error && (
              <div className="flex w-full items-center gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold tracking-wide text-rose-700">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <div>{error}</div>
              </div>
            )}

            {jobDetails && (
              <div className="relative mt-2 flex w-full flex-col justify-between gap-5 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl sm:flex-row sm:items-center sm:p-6">
                <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-emerald-500/5 blur-2xl pointer-events-none" />

                <div className="z-10 flex flex-col items-start text-left">
                  <div className="mb-1.5 flex items-center gap-2 text-sm font-bold tracking-wide text-emerald-400">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    Processing Complete
                  </div>

                  <div className="space-y-1 text-xs font-medium text-slate-400">
                    <p>
                      Job Ref:
                      <span className="ml-2 rounded border border-slate-800 bg-slate-950/60 px-1.5 py-0.5 font-mono text-[11px] text-slate-200">
                        {jobDetails.id}
                      </span>
                    </p>

                    <p>
                      Records verified:
                      <span className="ml-2 font-semibold text-slate-200">
                        {jobDetails.totalRecords} entries
                      </span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleDownload}
                  className="
                    z-10 w-full sm:w-auto
                    inline-flex items-center justify-center gap-2
                    rounded-xl bg-emerald-600 px-5 py-2.5
                    text-sm font-bold text-white transition
                    hover:bg-emerald-500 active:scale-[0.98]
                    shadow-md
                  "
                >
                  <Download className="h-4 w-4 shrink-0" />
                  Download Results Excel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
