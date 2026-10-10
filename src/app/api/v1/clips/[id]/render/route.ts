import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/server/auth/guards";
import { ClipService } from "@/server/services/clip.service";
import { AppError } from "@/core/errors/app-error";
import { registerBackgroundWorkers } from "@/core/queue/worker-pool";

registerBackgroundWorkers();

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireUser();
    const { id } = await params;
    const renderJob = await ClipService.triggerRender(id, user);

    return NextResponse.json(
      {
        message: "Render job queued successfully",
        renderJob: {
          id: renderJob.id,
          status: renderJob.status,
          progress: renderJob.progress,
        },
      },
      { status: 202 }
    );
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to queue render job" },
      { status: 500 }
    );
  }
}
