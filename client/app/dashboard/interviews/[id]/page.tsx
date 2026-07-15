import InterviewSessionClient from "@/components/interviews/InterviewSessionClient";

export default async function InterviewSessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <InterviewSessionClient sessionId={id} />;
}