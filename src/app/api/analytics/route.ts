import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { event, page, metadata } = body;

    if (!event) {
      return NextResponse.json({ error: "Event required" }, { status: 400 });
    }

    await prisma.analytics.create({
      data: {
        event,
        page: page || "",
        metadata: metadata || "",
      },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
