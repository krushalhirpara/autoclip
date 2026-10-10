import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/server/auth/guards";
import { ClipService } from "@/server/services/clip.service";
import { AppError } from "@/core/errors/app-error";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireUser();
    const { id } = await params;
    const clip = await ClipService.getClip(id, user);

    if (!clip) {
      return NextResponse.json({ error: "Clip not found" }, { status: 404 });
    }

    // Convert any BigInt fields on video if present
    const serializedClip = {
      ...clip,
      video: clip.video
        ? {
            ...clip.video,
            fileSize: clip.video.fileSize ? clip.video.fileSize.toString() : null,
          }
        : null,
    };

    return NextResponse.json({ clip: serializedClip });
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to get clip" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireUser();
    const { id } = await params;
    const body = await request.json();

    const updated = await ClipService.updateClip(id, user, {
      title: body.title,
      hook: body.hook,
      description: body.description,
      startTime: typeof body.startTime === "number" ? body.startTime : undefined,
      endTime: typeof body.endTime === "number" ? body.endTime : undefined,
    });

    return NextResponse.json({ clip: updated });
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update clip" },
      { status: 500 }
    );
  }
}
