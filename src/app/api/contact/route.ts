import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields (name, email, message)" },
        { status: 400 }
      );
    }

    const host = request.headers.get("host") || "localhost:3000";
    const origin = request.headers.get("origin") || `http://${host}`;
    const referer = request.headers.get("referer") || `${origin}/contact`;

    const emailSubject = subject
      ? `[Portfolio Contact] ${subject} - from ${name}`
      : `[Portfolio Contact] New message from ${name}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch("https://formsubmit.co/ajax/yashwadhvani123@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: origin,
        Referer: referer,
      },
      body: JSON.stringify({
        name,
        email,
        _subject: emailSubject,
        message,
        _replyto: email,
        _template: "table",
        _captcha: "false",
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await response.json().catch(() => ({}));

    // FormSubmit returns string 'true' or boolean true on success
    if (data.success === "true" || data.success === true) {
      return NextResponse.json({
        success: true,
        message: "Message successfully transmitted to yashwadhvani123@gmail.com",
      });
    }

    // Check if FormSubmit requires initial one-time activation
    if (data.message && data.message.toLowerCase().includes("activation")) {
      return NextResponse.json({
        success: false,
        needsActivation: true,
        message:
          "FormSubmit sent a one-time activation email to yashwadhvani123@gmail.com. Please open your Gmail (check Spam if needed) and click 'Activate Form'. Once activated, all web transmissions will deliver directly!",
      });
    }

    return NextResponse.json({
      success: false,
      message: data.message || "Unable to dispatch message through web service.",
    });
  } catch (error: any) {
    console.error("Contact API dispatch error:", error?.message || error);
    return NextResponse.json(
      {
        success: false,
        message:
          error?.name === "AbortError"
            ? "Service response timed out."
            : error?.message || "Internal server error occurred",
      },
      { status: 500 }
    );
  }
}
