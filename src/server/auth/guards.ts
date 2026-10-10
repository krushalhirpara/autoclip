import { getSession, SessionUser } from "./auth.config";
import { ForbiddenError, NotFoundError, UnauthorizedError } from "@/core/errors/app-error";
import { prisma } from "../db/prisma";

export async function isUserSuspended(userId: string): Promise<boolean> {
  const latestSuspensionLog = await prisma.usageLog.findFirst({
    where: {
      userId,
      action: {
        in: ["ADMIN_SUSPEND_USER", "ADMIN_REACTIVATE_USER"],
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return latestSuspensionLog?.action === "ADMIN_SUSPEND_USER";
}

export async function requireUser(): Promise<SessionUser> {
  const session = await getSession();
  if (!session || !session.user) {
    throw new UnauthorizedError("You must be logged in to perform this action");
  }

  // Enforce server-side suspension check
  const suspended = await isUserSuspended(session.user.id);
  if (suspended) {
    throw new ForbiddenError("Your account has been suspended by an administrator. Please contact support.");
  }

  return session.user;
}

export async function requireAdmin(): Promise<SessionUser> {
  const user = await requireUser();
  if (user.role !== "ADMIN") {
    throw new ForbiddenError("Administrative privileges required");
  }
  return user;
}

export async function requireProjectAccess(projectId: string, user: SessionUser) {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!project) {
    throw new NotFoundError("Project", projectId);
  }

  if (project.userId !== user.id && user.role !== "ADMIN") {
    throw new ForbiddenError("You do not have permission to access this project");
  }

  return project;
}

export async function requireVideoAccess(videoId: string, user: SessionUser) {
  const video = await prisma.video.findUnique({
    where: { id: videoId },
    include: { project: true },
  });

  if (!video) {
    throw new NotFoundError("Video", videoId);
  }

  if (video.userId !== user.id && user.role !== "ADMIN") {
    throw new ForbiddenError("You do not have permission to access this video");
  }

  return video;
}

export async function requireClipAccess(clipId: string, user: SessionUser) {
  const clip = await prisma.clip.findUnique({
    where: { id: clipId },
    include: { video: true, project: true },
  });

  if (!clip) {
    throw new NotFoundError("Clip", clipId);
  }

  if (clip.video.userId !== user.id && user.role !== "ADMIN") {
    throw new ForbiddenError("You do not have permission to access this clip");
  }

  return clip;
}
