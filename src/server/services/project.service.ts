import { prisma } from "../db/prisma";
import { ProjectStatus } from "@prisma/client";
import { requireProjectAccess } from "../auth/guards";
import { SessionUser } from "../auth/auth.config";

export interface CreateProjectDTO {
  title: string;
  description?: string;
}

export class ProjectService {
  static async listUserProjects(userId: string) {
    return prisma.project.findMany({
      where: {
        userId,
        status: { not: ProjectStatus.DELETED },
      },
      include: {
        _count: {
          select: {
            videos: true,
            clips: true,
          },
        },
      },
      orderBy: { updatedAt: "desc" },
    });
  }

  static async getProjectById(projectId: string, user: SessionUser) {
    await requireProjectAccess(projectId, user);

    return prisma.project.findUnique({
      where: { id: projectId },
      include: {
        videos: {
          orderBy: { createdAt: "desc" },
          include: {
            clips: {
              include: { score: true },
            },
            processingJobs: true,
          },
        },
      },
    });
  }

  static async createProject(userId: string, data: CreateProjectDTO) {
    return prisma.project.create({
      data: {
        userId,
        title: data.title,
        description: data.description,
        status: ProjectStatus.ACTIVE,
      },
    });
  }

  static async deleteProject(projectId: string, user: SessionUser) {
    await requireProjectAccess(projectId, user);

    return prisma.project.update({
      where: { id: projectId },
      data: { status: ProjectStatus.DELETED },
    });
  }
}
