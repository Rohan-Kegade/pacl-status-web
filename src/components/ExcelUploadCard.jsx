import React, { useState, useRef } from "react";
import {
  UploadCloud,
  FileSpreadsheet,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Eye,
  X,
} from "lucide-react";
import sampleExcel from "../assets/sample-excel.png";

export default function ExcelUploadCard() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jobId, setJobId] = useState(null);
  const [error, setError] = useState(null);
  const [showSample, setShowSample] = useState(false);

  const fileInputRef = useRef(null);

  const validateAndSetFile = (selectedFile) => {
    const file = selectedFile?.[0];

    if (!file) return;

    setError(null);
    setJobId(null);

    if (file.size > 1 * 1024 * 1024) {
      setError("File size exceeds the 1 MB limit.");
      setFile(null);
      return;
    }

    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return;

    setLoading(true);
    setError(null);
    setJobId(null);

    const formData = new FormData();
    formData.append("excel_batch", file);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const mockJobId = `job_pacl_${Math.random().toString(36).slice(2, 11)}`;

      setJobId(mockJobId);
    } catch {
      setError("Failed to initialize bulk processing job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full rounded-3xl border border-slate-300 bg-white shadow-2xl shadow-blue-950/10">
      <div className="p-6 sm:p-8 flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-6">
          Upload Excel File
        </h2>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            validateAndSetFile(e.dataTransfer.files);
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`
            w-full rounded-2xl border-2 border-dashed p-8 sm:p-12
            flex flex-col items-center justify-center cursor-pointer
            transition-all duration-200 group
            ${
              isDragging
                ? "border-blue-500 bg-blue-50/40"
                : "border-slate-300 bg-slate-50 hover:border-slate-500"
            }
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={(e) => validateAndSetFile(e.target.files)}
            className="hidden"
          />

          <UploadCloud
            className={`w-12 h-12 mb-4 transition-colors ${
              isDragging
                ? "text-blue-500"
                : "text-slate-400 group-hover:text-slate-600"
            }`}
          />

          <p className="text-base font-bold text-slate-800 text-center">
            Click to upload{" "}
            <span className="font-normal text-slate-500">or drag and drop</span>
          </p>

          <p className="mt-1.5 text-xs text-slate-400 font-medium text-center">
            Excel file (.xlsx) up to 1MB
          </p>
        </div>

        <div className="w-full mt-4 flex flex-col gap-3">
          {file && !jobId && (
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm">
              <FileSpreadsheet className="w-5 h-5 text-emerald-600 shrink-0" />

              <span className="truncate font-mono text-slate-800">
                {file.name}
              </span>

              <span className="ml-auto text-xs text-slate-400">
                {(file.size / 1024).toFixed(1)} KB
              </span>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm font-medium text-rose-700">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          {jobId && (
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Upload Successful!
              </div>

              <div className="sm:ml-4 flex items-center gap-2 text-xs sm:text-sm">
                Job ID:
                <span className="rounded bg-emerald-950 px-2 py-1 font-mono text-emerald-300">
                  {jobId}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="w-full mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* View Sample File */}
          <button
            type="button"
            onClick={() => setShowSample(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
          >
            <Eye className="w-4 h-4" />
            View Sample File
          </button>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!file || loading}
            className={`
              w-full sm:w-auto inline-flex items-center justify-center gap-2
              rounded-xl px-6 py-2.5 text-sm font-bold transition
              ${
                !file || loading
                  ? "cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-400"
                  : "bg-slate-900 text-white hover:bg-slate-800"
              }
            `}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Submit"
            )}
          </button>
        </div>

        {/* Sample Image Modal */}
        {showSample && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="relative w-full max-w-3xl rounded-3xl bg-white p-4 shadow-2xl">
              <button
                onClick={() => setShowSample(false)}
                className="absolute top-4 right-4 rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="mb-4 text-lg font-bold text-slate-800">
                Sample Excel Preview
              </h3>

              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <img
                  src={sampleExcel}
                  alt="Sample Excel Preview"
                  className="w-full object-cover"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
