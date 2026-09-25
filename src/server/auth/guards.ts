import { getSession, SessionUser } from "./auth.config";
import { ForbiddenError, NotFoundError, UnauthorizedError } from "@/core/errors/app-error";
import { prisma } from "../db/prisma";

export async function requireUser(): Promise<SessionUser> {
  const session = await getSession();
  if (!session || !session.user) {
    throw new UnauthorizedError("You must be logged in to perform this action");
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
