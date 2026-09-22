import { NextResponse } from "next/server";
import { sendContactNotification } from "@/lib/email";
import { requirementsFormSchema } from "@/lib/validation";

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

  // The Contact-page form and the automatic popup are the same requirements
  // form, so both submit against this one shared schema.
  const parsed = requirementsFormSchema.safeParse(body);

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

  const finalData = parsed.data;

  if (finalData.website) {
    return NextResponse.json({ success: true });
  }

  try {
    await sendContactNotification(finalData);
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
