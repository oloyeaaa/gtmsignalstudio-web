"use client";

import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="border border-light-border rounded-lg overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-cream transition-colors"
            aria-expanded={openIndex === i}
          >
            <h3 className="font-heading font-semibold text-text-dark text-sm pr-4 m-0">
              {item.question}
            </h3>
            <span className="text-orange text-lg flex-shrink-0" aria-hidden="true">
              {openIndex === i ? "−" : "+"}
            </span>
          </button>
          {openIndex === i && (
            <div className="px-4 pb-4 border-t border-light-border">
              <p className="text-text-body text-sm leading-relaxed pt-3">
                {item.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
