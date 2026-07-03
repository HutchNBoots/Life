import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireProfileId, handleApiError, ApiError } from "@/lib/api";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const profileId = requireProfileId();
    const { label } = await req.json();
    if (typeof label !== "string" || !label.trim()) {
      throw new ApiError(400, "label is required.");
    }

    const goal = await prisma.binaryGoal.findUnique({ where: { id: params.id } });
    if (!goal || goal.profileId !== profileId) {
      throw new ApiError(404, "Unknown goal.");
    }

    const updated = await prisma.binaryGoal.update({
      where: { id: params.id },
      data: { label: label.trim() },
    });

    return NextResponse.json({ goal: updated });
  } catch (e) {
    return handleApiError(e);
  }
}
