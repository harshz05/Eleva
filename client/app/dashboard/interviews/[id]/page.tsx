import InterviewSessionClient from "@/components/interviews/InterviewSessionClient";

export default function InterviewSessionPage({ params }: { params: { id: string } }) {
  return <InterviewSessionClient sessionId={params.id} />;
}