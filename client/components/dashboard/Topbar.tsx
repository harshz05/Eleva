import { UserButton } from "@clerk/nextjs";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-5">
      <div>
        <h2 className="text-2xl font-bold">
          Dashboard
        </h2>

        <p className="text-slate-500">
           Continue your placement preparation journey.
        </p>
      </div>

      <UserButton />
    </header>
  );
}