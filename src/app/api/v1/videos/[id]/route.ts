import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/server/auth/guards";
import { VideoService } from "@/server/services/video.service";
import { AppError } from "@/core/errors/app-error";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireUser();
    const { id } = await params;
    const video = await VideoService.getVideoDetails(id, user);

    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    // Convert any BigInt fields to numbers/strings for JSON serialization
    const serializedVideo = {
      ...video,
      fileSize: video.fileSize ? video.fileSize.toString() : null,
    };

    return NextResponse.json({ video: serializedVideo });
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to get video" },
      { status: 500 }
    );
  }
}
