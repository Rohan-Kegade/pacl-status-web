export default function Header() {
  return (
    <header className="flex min-h-[260px] sm:min-h-[340px] w-full flex-col items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 px-4 text-center">
      <h1 className="mb-4 text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl">
        PACL Refund Status Checker
      </h1>

      <p className="max-w-2xl text-base font-black leading-relaxed text-slate-300 sm:text-xl">
        Check status of multiple PACL refund claims in bulk{" "}
        <span className="text-amber-400">with ease</span>.
      </p>
    </header>
  );
}
