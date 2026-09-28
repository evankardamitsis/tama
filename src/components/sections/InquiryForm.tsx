"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { submitInquiry, type InquiryState } from "@/app/actions/inquiry";
import type { HomePage, SiteSettings } from "@/content/types";

type Props = { enquiries: HomePage["enquiries"]; contact: SiteSettings["contact"] };

const initial: InquiryState = { status: "idle" };

const field =
  "w-full bg-transparent font-angie text-[16px] leading-normal text-bark outline-none placeholder:text-bark/40";
const line = "mt-[8px] h-[40px] border-b border-bark";
const label = "block t-h3 text-[20px] leading-[18px]";

const ENQUIRING_AS = ["Guest", "Travel advisor / Agency", "Other"];

function Check({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <label className="flex cursor-pointer items-center gap-[10px] font-angie text-[14px] leading-normal">
      <input type="checkbox" name={name} className="peer sr-only" />
      <span className="flex h-[16px] w-[16px] shrink-0 items-center justify-center border border-bark transition-colors duration-300 peer-checked:bg-bark peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2">
        <svg width="9" height="7" viewBox="0 0 9 7" className="fill-none stroke-sand opacity-0 transition-opacity duration-200 peer-checked:opacity-100" strokeWidth="1.4" aria-hidden>
          <path d="M1 3.6 3.3 6 8 1" />
        </svg>
      </span>
      {children}
    </label>
  );
}

/** Underlined fields on the sand background, matching the Figma form. */
export function InquiryForm({ enquiries, contact }: Props) {
  const [state, action, pending] = useActionState(submitInquiry, initial);
  const [role, setRole] = useState("");
  const [undecided, setUndecided] = useState(false);

  return (
    <form action={action} className="flex w-full flex-col" noValidate>
      <label className="mb-[24px] block">
        <span className={label}>Full name</span>
        <input type="text" name="name" autoComplete="name" required className={`${field} ${line}`} />
      </label>

      <label className="mb-[24px] block">
        <span className={label}>Email address</span>
        <input type="email" name="email" autoComplete="email" required className={`${field} ${line}`} />
      </label>

      <label className="mb-[24px] block">
        <span className={label}>Phone / WhatsApp</span>
        <input
          type="tel"
          name="phone"
          autoComplete="tel"
          placeholder="+30 …"
          className={`${field} ${line}`}
        />
      </label>

      <label className="mb-[24px] block">
        <span className={label}>Enquiring as</span>
        <select
          name="enquiringAs"
          required
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className={`${field} ${line} cursor-pointer appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="6"><path d="M0 0l5 6 5-6z" fill="%23332b25"/></svg>')] bg-[right_2px_center] bg-no-repeat`}
        >
          <option value="">Please choose</option>
          {ENQUIRING_AS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </label>

      {role === "Travel advisor / Agency" && (
        <label className="mb-[24px] block">
          <span className={label}>Agency name</span>
          <input type="text" name="agency" required className={`${field} ${line}`} />
        </label>
      )}

      <div className="mb-[16px] grid grid-cols-2 gap-[20px]">
        <label className="block">
          <span className={label}>Arrival</span>
          <input type="date" name="arrival" disabled={undecided} className={`${field} ${line} disabled:opacity-40`} />
        </label>
        <label className="block">
          <span className={label}>Departure</span>
          <input type="date" name="departure" disabled={undecided} className={`${field} ${line} disabled:opacity-40`} />
        </label>
      </div>

      <div className="mb-[28px] flex flex-col gap-[12px] sm:flex-row sm:gap-[28px]">
        <Check name="flexible">My dates are flexible</Check>
        <label className="flex cursor-pointer items-center gap-[10px] font-angie text-[14px] leading-normal">
          <input
            type="checkbox"
            name="undecided"
            checked={undecided}
            onChange={(e) => setUndecided(e.target.checked)}
            className="peer sr-only"
          />
          <span className="flex h-[16px] w-[16px] shrink-0 items-center justify-center border border-bark transition-colors duration-300 peer-checked:bg-bark">
            <svg width="9" height="7" viewBox="0 0 9 7" className="fill-none stroke-sand opacity-0 transition-opacity duration-200 peer-checked:opacity-100" strokeWidth="1.4" aria-hidden>
              <path d="M1 3.6 3.3 6 8 1" />
            </svg>
          </span>
          Dates not yet decided
        </label>
      </div>

      <div className="mb-[24px] grid grid-cols-2 gap-[20px]">
        <label className="block">
          <span className={label}>Adults</span>
          <input type="number" name="adults" min={1} max={14} defaultValue={2} required className={`${field} ${line}`} />
        </label>
        <label className="block">
          <span className={label}>Children</span>
          <input type="number" name="children" min={0} max={14} defaultValue={0} className={`${field} ${line}`} />
        </label>
      </div>

      <label className="mb-[26px] block">
        <span className={label}>Message</span>
        <textarea
          name="message"
          rows={4}
          placeholder={enquiries.messagePlaceholder}
          className={`${field} mt-[8px] h-[120px] resize-none border-b border-bark pb-[6px]`}
        />
      </label>

      <p className="mb-[20px] font-angie text-[12px] leading-normal text-bark/70">
        By sending this enquiry you agree to our{" "}
        <Link href={enquiries.privacy.href} className="link-line underline [text-underline-position:from-font]">
          {enquiries.privacy.label}
        </Link>
        .
      </p>

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-[48px] w-full shrink-0 items-center justify-center rounded-[32px] border border-bark bg-bark pl-[19px] pr-[22px] font-angie text-[16px] leading-normal text-white transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-transparent hover:text-bark disabled:opacity-60 sm:w-[190px]"
        >
          {pending ? "Sending…" : enquiries.submit}
        </button>
        {state.status !== "idle" && (
          <p role="status" className={`t-body ${state.status === "error" ? "text-terracotta" : "text-bark"}`}>
            {state.message}
            {state.note && <span className="mt-[4px] block text-bark/70">{state.note}</span>}
          </p>
        )}
      </div>

      <p className="mt-[24px] t-body">
        {enquiries.directContact.prefix}{" "}
        <a href={`mailto:${contact.email}`} className="link-line underline [text-underline-position:from-font]">
          {enquiries.directContact.emailLabel}
        </a>{" "}
        {enquiries.directContact.join}{" "}
        <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="link-line underline [text-underline-position:from-font]">
          {enquiries.directContact.whatsappLabel}
        </a>
        .
      </p>
    </form>
  );
}
