export default function Navbar() {
  return (
    <nav className="sticky top-0 flex items-center justify-between border-b border-gray-800 bg-black px-10 py-6">

      <h1 className="text-2xl font-bold">
        Eleva
      </h1>

      <div className="flex gap-8">

        <a href="#features">Features</a>

        <a href="#">About</a>

        <button className="rounded-lg bg-white px-5 py-2 text-black">
          Start
        </button>

      </div>

    </nav>
  );
}