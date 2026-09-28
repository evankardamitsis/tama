import { Reveal } from "@/components/motion/Reveal";
import { Paragraphs } from "@/components/ui/Text";

export const metadata = { title: "Privacy Notice — Tama Mykonos" };

/**
 * Placeholder notice so the enquiry form's link is live. The final wording
 * and the question of whether a full policy is required are still to be
 * confirmed with Evangelos — replace the body below once settled.
 */
export default function PrivacyPage() {
  return (
    <main className="page-container pt-[120px] pb-[80px] lg:pt-[180px] lg:pb-[120px]">
      <Reveal className="flex flex-col gap-[18px] lg:w-[60%]">
        <p className="t-eyebrow">PRIVACY</p>
        <h1 className="t-h1">Privacy Notice</h1>
        <Paragraphs
          items={[
            "When you send an enquiry through this website, we collect the details you provide — your name, email address, phone number, travel dates and any message — so that our team can respond to you and help plan your stay.",
            "We use these details only to answer your enquiry and to arrange your stay. They are not sold, and they are not shared with anyone beyond the team and the trusted partners required to fulfil a request you have made.",
            "We keep enquiry details for as long as needed to deal with your enquiry and to meet our record-keeping obligations. You can ask us at any time to see, correct or delete the information we hold about you by writing to info@tamamykonos.com.",
          ]}
        />
      </Reveal>
    </main>
  );
}
