import { FileSpreadsheet, UploadCloud, Clock, Download } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      icon: FileSpreadsheet,
      title: "Prepare Excel File",
      desc: "Create an Excel file listing the Certificate Numbers you want to check.",
    },
    {
      id: 2,
      icon: UploadCloud,
      title: "Upload File",
      desc: "Upload your Excel file using the upload section below.",
    },
    {
      id: 3,
      icon: Clock,
      title: "Processing",
      desc: "Your file will be processed in the background. You'll receive a Job ID to track progress.",
    },
    {
      id: 4,
      icon: Download,
      title: "Download Results",
      desc: "Once complete, download the updated Excel file with refund status for all entries.",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-14 sm:py-18 text-center">
      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-12">
        How It Works ?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step) => {
          const IconComponent = step.icon;

          return (
            <div key={step.id} className="flex flex-col items-center">
              <div className="relative mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-600 border border-blue-250">
                <IconComponent className="w-7 h-7" />

                <span className="absolute -bottom-1 -left-1 flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold shadow-sm">
                  {step.id}
                </span>
              </div>

              <h3 className="text-lg font-black text-slate-900 mb-2">
                {step.title}
              </h3>

              <p className="text-sm text-slate-500 leading-relaxed">
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
