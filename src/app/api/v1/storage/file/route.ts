import { NextRequest, NextResponse } from "next/server";
import { getStorageService } from "@/core/storage";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const key = searchParams.get("key");

  if (!key) {
    return NextResponse.json({ error: "Missing key parameter" }, { status: 400 });
  }

  try {
    const storageService = getStorageService();
    const buffer = await storageService.downloadFile(key);

    const contentType = key.endsWith(".mp4")
      ? "video/mp4"
      : key.endsWith(".mp3")
      ? "audio/mp3"
      : key.endsWith(".png")
      ? "image/png"
      : key.endsWith(".jpg")
      ? "image/jpeg"
      : "application/octet-stream";

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
