import { NextResponse } from "next/server";
import { sendContactNotification } from "@/lib/email";
import {
  contactFormSchema,
  popupFormSchema,
  type ContactFormValues,
  type PopupFormValues,
} from "@/lib/validation";

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

  // The full Contact-page form always sends every field (contactFormSchema).
  // The 45-second popup only requires Name + Phone, so its payload is
  // validated against the shorter popupFormSchema instead — this keeps the
  // Contact page's own required fields fully unchanged.
  const parsed = contactFormSchema.safeParse(body);

  let finalData: ContactFormValues | PopupFormValues;

  if (parsed.success) {
    finalData = parsed.data;
  } else {
    const parsedPopup = popupFormSchema.safeParse(body);
    if (!parsedPopup.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please check the highlighted fields.",
          fieldErrors: {
            ...parsed.error.flatten().fieldErrors,
            ...parsedPopup.error.flatten().fieldErrors,
          },
        },
        { status: 422 }
      );
    }
    finalData = parsedPopup.data;
  }

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
