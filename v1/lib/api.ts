import { NextResponse } from "next/server";
import { getCurrentProfileId } from "./session";

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

/** Every API route that reads/writes profile-scoped data goes through this. */
export function requireProfileId(): string {
  const id = getCurrentProfileId();
  if (!id) throw new ApiError(401, "No profile selected.");
  return id;
}

export function handleApiError(e: unknown) {
  if (e instanceof ApiError) {
    return NextResponse.json({ error: e.message }, { status: e.status });
  }
  console.error(e);
  return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
}
