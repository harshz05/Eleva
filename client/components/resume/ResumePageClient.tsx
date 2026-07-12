"use client";

import { useEffect, useState } from "react";
import { getCurrentResume } from "@/lib/resume";
import { Resume } from "@/types/resume";
import ResumeUpload from "./ResumeUpload";
import ResumeAnalysisView from "./ResumeAnalysisView";

export default function ResumePageClient() {
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentResume().then((r) => {
      setResume(r);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="text-sm text-slate-500">Loading...</p>;

  return (
    <div className="space-y-6">
      <ResumeUpload onUploaded={setResume} />
      {resume && (
        <>
          <p className="text-sm text-slate-500">
            Uploading a new file will replace your current resume.
          </p>
          <ResumeAnalysisView resume={resume} />
        </>
      )}
    </div>
  );
}
