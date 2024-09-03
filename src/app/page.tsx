import Link from "next/link";
import { Button } from "./_components/ui/button";

export default async function Home() {
  return (
    <main className="flex h-[100dvh] items-center justify-center">
      <Button asChild>
        <Link href="/app">To App</Link>
      </Button>
    </main>
  );
}
