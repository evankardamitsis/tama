"use client";

import { useActionState } from "react";
import { submitInquiry, type InquiryState } from "@/app/actions/inquiry";
import type { HomePage } from "@/content/types";

type Props = { fields: HomePage["inquiries"]["fields"]; submit: string };

const initial: InquiryState = { status: "idle" };

const inputCls =
  "w-full bg-transparent font-angie text-[16px] leading-normal text-ink outline-none placeholder:text-transparent";

/** Underlined fields: 20px label, 1px bark rule 66px below the label top. */
export function InquiryForm({ fields, submit }: Props) {
  const [state, action, pending] = useActionState(submitInquiry, initial);

  return (
    <form action={action} className="flex w-full flex-col" noValidate>
      {fields.map((f) => {
        const isArea = f.type === "textarea";
        return (
          <label key={f.name} className={`block ${isArea ? "mb-[33px]" : "mb-[24px]"}`}>
            <span className="block t-h3 text-[20px] leading-[18px]">{f.label}</span>
            {isArea ? (
              <textarea
                name={f.name}
                rows={5}
                required={f.name === "message"}
                className={`${inputCls} mt-[8px] h-[148px] resize-none border-b border-bark pb-[6px]`}
              />
            ) : (
              <input
                type={f.type}
                name={f.name}
                required={f.name !== "phone"}
                autoComplete={f.type === "email" ? "email" : f.type === "tel" ? "tel" : "name"}
                className={`${inputCls} mt-[8px] h-[40px] border-b border-bark`}
              />
            )}
          </label>
        );
      })}

      <div className="flex items-center gap-6">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-[48px] w-[178px] items-center justify-center rounded-[32px] border border-bark bg-bark pt-[14px] pb-[15px] pl-[19px] pr-[22px] font-angie text-[16px] leading-normal text-white transition-colors hover:bg-transparent hover:text-bark disabled:opacity-60"
        >
          {pending ? "Sending…" : submit}
        </button>
        {state.status !== "idle" && (
          <p role="status" className={`t-body ${state.status === "error" ? "text-terracotta" : "text-bark"}`}>
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
