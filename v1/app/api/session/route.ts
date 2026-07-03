import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { PROFILE_COOKIE } from "@/lib/session";
import { handleApiError, ApiError } from "@/lib/api";

const ONE_YEAR = 60 * 60 * 24 * 365;

export async function POST(req: NextRequest) {
  try {
    const { profileId } = await req.json();
    if (!profileId || typeof profileId !== "string") {
      throw new ApiError(400, "profileId is required.");
    }
    const profile = await prisma.profile.findUnique({ where: { id: profileId } });
    if (!profile) throw new ApiError(404, "Unknown profile.");

    cookies().set(PROFILE_COOKIE, profile.id, {
      maxAge: ONE_YEAR,
      sameSite: "lax",
      path: "/",
    });
    return NextResponse.json({ profile });
  } catch (e) {
    return handleApiError(e);
  }
}

export async function DELETE() {
  cookies().delete(PROFILE_COOKIE);
  return NextResponse.json({ ok: true });
}
