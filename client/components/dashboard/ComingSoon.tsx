interface ComingSoonProps {
  title: string;
  description: string;
}

export default function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-24 text-center">
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      <p className="mt-2 max-w-md text-slate-500">{description}</p>
    </div>
  );
}