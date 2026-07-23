export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 text-slate-800">
      <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: July 2026</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-slate-900">What Eleva is</h2>
          <p className="mt-2">
            Eleva is a student-built placement preparation tool. It is not a
            commercial product, and it is not backed by a company with a
            dedicated privacy or legal team. This page explains, in plain
            terms, what data the app collects and how it is used.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">What we collect</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Account information (name, email) via Clerk, our authentication provider.</li>
            <li>Interview session data: the role/company/type you select, AI-generated questions, and the answers you type.</li>
            <li>Resume files you upload (PDF), the text extracted from them, and the AI-generated feedback.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">How your data is used</h2>
          <p className="mt-2">
            Interview answers and resume text are sent to Google&apos;s Gemini
            API to generate feedback and scoring. This data is processed by
            Google under their own API terms; Eleva does not control how
            Google&apos;s models process this data beyond the single request
            made. Your resume file itself is stored in a private Supabase
            Storage bucket, accessible only via short-lived signed links
            generated for your account. Your account and session data are
            stored in a Postgres database.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">Who can see your data</h2>
          <p className="mt-2">
            Only you can access your own interview history and resume through
            your account. As the developer, I have administrative access to
            the underlying database and storage for maintenance and
            debugging purposes, but I do not access individual user data
            except to fix a reported issue.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">Data deletion</h2>
          <p className="mt-2">
            If you&apos;d like your account and associated data deleted,
            email me at{" "}
            <a href="mailto:harsh.guptaa205@gmail.com" className="text-blue-600 hover:underline">
              harsh.guptaa205@gmail.com
            </a>{" "}
            and I will remove it.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">Changes to this policy</h2>
          <p className="mt-2">
            This is a student project under active development. This policy
            may be updated as the app changes; significant changes will be
            reflected in the &quot;last updated&quot; date above.
          </p>
        </section>
      </div>
    </div>
  );
}