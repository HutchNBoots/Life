import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireProfileId, handleApiError, ApiError } from "@/lib/api";

/**
 * Rename and/or archive a goal, scoped to the current profile. Archiving is
 * a soft delete (`active: false` + `archivedAt`) — streak history and
 * earned milestones are kept, never hard-deleted (ready_MVP2_5.md Epic 12).
 */
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const profileId = requireProfileId();
    const { label, archived } = await req.json();
    if (label === undefined && archived === undefined) {
      throw new ApiError(400, "label or archived is required.");
    }

    const goal = await prisma.binaryGoal.findUnique({ where: { id: params.id } });
    if (!goal || goal.profileId !== profileId) {
      throw new ApiError(404, "Unknown goal.");
    }

    const data: { label?: string; active?: boolean; archivedAt?: Date } = {};
    if (label !== undefined) {
      if (typeof label !== "string" || !label.trim()) {
        throw new ApiError(400, "label must be a non-empty string.");
      }
      data.label = label.trim();
    }
    if (archived === true) {
      data.active = false;
      data.archivedAt = new Date();
    }

    const updated = await prisma.binaryGoal.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json({ goal: updated });
  } catch (e) {
    return handleApiError(e);
  }
}
