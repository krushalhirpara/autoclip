import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/server/auth/guards";
import { VideoService } from "@/server/services/video.service";
import { CreditService } from "@/server/services/credit.service";
import { getStorageService } from "@/core/storage";
import { AppError } from "@/core/errors/app-error";
import { registerBackgroundWorkers } from "@/core/queue/worker-pool";

// Ensure queue workers are registered
registerBackgroundWorkers();

export async function POST(request: NextRequest) {
  try {
    const user = await requireUser();
    const formData = await request.formData();

    const file = formData.get("file") as File | null;
    const projectId = formData.get("projectId") as string | null;
    const title = (formData.get("title") as string | null) || file?.name || "Untitled Video";

    if (!projectId) {
      return NextResponse.json({ error: "projectId is required" }, { status: 400 });
    }

    if (!file) {
      return NextResponse.json({ error: "No video file provided" }, { status: 400 });
    }

    // Deduct 5 credits for video processing job
    await CreditService.deductCredits(user.id, 5, `AI Clipping Analysis for ${title}`);

    // Upload file through storage abstraction
    const storageService = getStorageService();
    const buffer = Buffer.from(await file.arrayBuffer());
    const storageKey = `videos/${user.id}/${Date.now()}-${file.name}`;
    const uploadResult = await storageService.uploadFile(buffer, storageKey, file.type || "video/mp4");

    // Register video and enqueue background analysis job
    const result = await VideoService.registerVideo({
      projectId,
      userId: user.id,
      title,
      originalFilename: file.name,
      storageKey: uploadResult.key,
      storageUrl: uploadResult.url,
      fileSize: BigInt(file.size),
    });

    return NextResponse.json(
      {
        video: {
          id: result.video.id,
          title: result.video.title,
          status: result.video.status,
          storageUrl: result.video.storageUrl,
        },
        job: {
          id: result.job.id,
          status: result.job.status,
          progress: result.job.progress,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to upload video" },
      { status: 500 }
    );
  }
}
