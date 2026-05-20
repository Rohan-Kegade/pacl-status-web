export default function Footer() {
  return (
    <footer className="mt-auto bg-slate-900 py-6 text-center text-sm text-white font-medium tracking-wide">
      <div className="max-w-6xl mx-auto px-4">
        <span className="text-slate-400 font-sans">&copy;</span>{" "}
        {new Date().getFullYear()} PACL Refund Status Checker. All Rights
        Reserved.
      </div>
    </footer>
  );
}
