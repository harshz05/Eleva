export default function Hero() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center text-center">

      <h1 className="text-6xl font-bold">
        Ace Your Next Interview
      </h1>

      <p className="mt-6 max-w-2xl text-xl text-gray-400">

        AI-powered mock interviews tailored to your resume,
        communication skills and career goals.

      </p>

      <div className="mt-10 flex gap-4">

        <button className="rounded-xl bg-white px-8 py-3 font-semibold text-black">

          Start Interview

        </button>

        <button className="rounded-xl border border-gray-600 px-8 py-3">

          View Demo

        </button>

      </div>

    </section>
  );
}