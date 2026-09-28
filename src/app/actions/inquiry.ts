"use server";

export type InquiryState = { status: "idle" | "success" | "error"; message?: string; note?: string };

const REQUIRED = ["Please add your full name.", "Please add an email address.", "Please choose how you are enquiring."];

/**
 * Handles the "Plan Your Stay" enquiry.
 * TODO: wire to the email provider (Resend/Brevo) and/or Contentful once
 * credentials are available. For now it validates and logs server-side.
 */
export async function submitInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  const get = (k: string) => String(formData.get(k) ?? "").trim();
  const name = get("name");
  const email = get("email");
  const phone = get("phone");
  const enquiringAs = get("enquiringAs");
  const agency = get("agency");
  const arrival = get("arrival");
  const departure = get("departure");
  const flexible = formData.get("flexible") === "on";
  const undecided = formData.get("undecided") === "on";
  const adults = get("adults");
  const children = get("children") || "0";
  const message = get("message");

  const fail = (m: string): InquiryState => ({ status: "error", message: m });

  if (!name) return fail(REQUIRED[0]);
  if (!email) return fail(REQUIRED[1]);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return fail("Please enter a valid email address.");
  if (!enquiringAs) return fail(REQUIRED[2]);
  if (enquiringAs === "Travel advisor / Agency" && !agency) return fail("Please add the agency name.");
  if (!undecided && (!arrival || !departure)) {
    return fail("Please add your arrival and departure dates, or tick “Dates not yet decided”.");
  }
  if (arrival && departure && departure < arrival) return fail("The departure date falls before the arrival date.");
  if (!adults) return fail("Please tell us how many adults will be staying.");

  console.info("[enquiry]", {
    name, email, phone, enquiringAs, agency,
    arrival, departure, flexible, undecided,
    adults, children, message: message.slice(0, 500),
  });

  return {
    status: "success",
    message: "Thank you for your enquiry. Our team will be in touch to discuss your stay.",
    note: "Your enquiry does not confirm a reservation.",
  };
}
