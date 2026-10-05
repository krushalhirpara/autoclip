import Link from "next/link";
import { Scissors, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-140px)] w-full flex-col items-center justify-center bg-[#F8F9FC] px-4 py-16 text-center dark:bg-[#0A0A0C]">
      <div className="relative mx-auto max-w-md space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7C5CFC] to-[#9B7CFF] shadow-[0_0_24px_rgba(124,92,252,0.4)]">
          <Scissors className="h-8 w-8 text-white" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#7C5CFC] dark:text-[#A78BFA]">
            404 — Page Not Found
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#111118] dark:text-white sm:text-4xl">
            Lost in the cutting room?
          </h1>
          <p className="text-sm text-[#6B6B78] dark:text-[#A1A1AA]">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button asChild className="w-full sm:w-auto rounded-xl bg-[#7C5CFC] text-white hover:bg-[#6b47fa]">
            <Link href="/" className="inline-flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full sm:w-auto rounded-xl border-[#E8E7F0] bg-white text-[#111118] hover:bg-[#F4F3FF] dark:border-[#27272A] dark:bg-[#141416] dark:text-white">
            <Link href="/help" className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Visit Help Center</span>
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
