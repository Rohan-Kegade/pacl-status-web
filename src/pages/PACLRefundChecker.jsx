import Header from "../components/Header";
import Footer from "../components/Footer";
import HowItWorks from "../components/HowItWorks";
import ExcelUploadCard from "../components/ExcelUploadCard";
import CheckJobStatusCard from "../components/CheckJobStatusCard";

export default function PACLRefundChecker() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header />

      <main>
        <HowItWorks />
        <ExcelUploadCard />
        <CheckJobStatusCard />
      </main>

      <Footer />
    </div>
  );
}
