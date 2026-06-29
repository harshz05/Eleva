export default function Features() {
  return (
    <section 
      id="features"
      className="mx-auto max-w-6xl px-8 py-20">

      <h2 className="mb-12 text-center text-4xl font-bold">
        Why Eleva?
      </h2>

      <div className="grid gap-8 md:grid-cols-3">

        <div className="rounded-2xl border border-gray-700 p-8">
          <h3 className="mb-4 text-2xl font-semibold">
            Resume-Based Interviews
          </h3>

          <p className="text-gray-400">
            AI generates interview questions based on your resume and projects.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-700 p-8">
          <h3 className="mb-4 text-2xl font-semibold">
            Personalized Feedback
          </h3>

          <p className="text-gray-400">
            Receive detailed feedback on technical answers and communication.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-700 p-8">
          <h3 className="mb-4 text-2xl font-semibold">
            Progress Tracking
          </h3>

          <p className="text-gray-400">
            Monitor your improvement through analytics and interview history.
          </p>
        </div>

      </div>
    </section>
  );
}