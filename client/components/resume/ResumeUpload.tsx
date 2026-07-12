"use client";

import { useRef, useState } from "react";
import { uploadResume } from "@/lib/resume";
import { Resume } from "@/types/resume";
import { UploadCloud } from "lucide-react";

interface ResumeUploadProps {
  onUploaded: (resume: Resume) => void;
}

export default function ResumeUpload({ onUploaded }: ResumeUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      return;
    }
    setError(null);
    setIsUploading(true);
    const resume = await uploadResume(file);
    setIsUploading(false);
    onUploaded(resume);
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) handleFile(file);
      }}
      className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white p-12 text-center transition hover:border-blue-300"
    >
      <UploadCloud className="text-slate-400" size={36} />
      <p className="mt-3 text-sm text-slate-600">
        {isUploading ? "Uploading & analyzing..." : "Drag and drop your resume PDF, or"}
      </p>
      {!isUploading && (
        <button
          onClick={() => inputRef.current?.click()}
          className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Browse Files
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}