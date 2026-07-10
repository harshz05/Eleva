import Link from "next/link";

const links = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Mock Interviews", href: "/dashboard/interviews" },
  { name: "Resume", href: "/dashboard/resume" },
  { name: "DSA Roadmap", href: "/dashboard/dsa" },
  { name: "Analytics", href: "/dashboard/analytics" },
  { name: "Settings", href: "/dashboard/settings" },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 p-6">
        <h1 className="text-2xl font-bold text-blue-600">
          Eleva
        </h1>
      </div>

      <nav className="flex flex-1 flex-col gap-2 p-4">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="rounded-lg px-4 py-3 text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}