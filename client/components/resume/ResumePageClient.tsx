"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { getCurrentResume } from "@/lib/resume";
import { Resume } from "@/types/resume";
import ResumeUpload from "./ResumeUpload";
import ResumeAnalysisView from "./ResumeAnalysisView";

export default function ResumePageClient() {
  const { getToken } = useAuth();
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentResume(getToken).then((r) => {
      setResume(r);
      setLoading(false);
    });
  }, [getToken]);

  if (loading) return <p className="text-sm text-slate-500">Loading...</p>;

  return (
    <div className="space-y-6">
      <ResumeUpload getToken={getToken} onUploaded={setResume} />
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