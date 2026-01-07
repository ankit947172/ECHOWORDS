import { db } from "@/lib/db";
import { ThoughtForm } from "@/components/thought-form";
import { formatDistanceToNow } from "date-fns";

export default async function Home() {
  const thoughts = await db.thought.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">EchoWords</h1>

      <ThoughtForm />

      <div className="space-y-4">
        {thoughts.map((t) => (
          <div key={t.id} className="p-4 bg-white border rounded shadow-sm">
            <p className="text-gray-800">{t.content}</p>
            <p className="text-xs text-gray-400 mt-2 text-right">
              {formatDistanceToNow(new Date(t.createdAt))} ago
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
