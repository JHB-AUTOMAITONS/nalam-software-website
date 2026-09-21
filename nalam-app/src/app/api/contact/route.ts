import { NextResponse } from "next/server";
import { sendContactNotification } from "@/lib/email";
import { contactFormSchema } from "@/lib/validation";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = contactFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Please check the highlighted fields.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ success: true });
  }

  try {
    await sendContactNotification(parsed.data);
  } catch (error) {
    console.error("[contact] Failed to send notification email:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "We couldn't send your requirements right now. Please try again or email us directly.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
