"use server";

export type InquiryState = { status: "idle" | "success" | "error"; message?: string };

/**
 * Handles the "Plan Your Visit" form.
 * TODO: wire to the email provider (Resend/Brevo) and/or Contentful once
 * credentials are available. For now it validates and logs server-side.
 */
export async function submitInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { status: "error", message: "Please fill in your name, email and message." };
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  console.info("[inquiry]", { name, email, phone, message: message.slice(0, 200) });
  return { status: "success", message: "Thank you — we will be in touch shortly." };
}
