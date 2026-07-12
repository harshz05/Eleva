import { UserProfile } from "@clerk/nextjs";

export default function ProfilePage() {
  return (
    <div className="flex justify-center">
      <UserProfile
        routing="hash"
        appearance={{
          elements: {
            rootBox: "w-full",
            card: "shadow-sm border border-slate-200",
          },
        }}
      />
    </div>
  );
}