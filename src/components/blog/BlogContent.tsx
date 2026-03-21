"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import { usePathname } from "next/navigation";
import { trackCTAClick, trackNewsletterClick } from "@/components/Analytics";

const AI_PRESENCE_AUDIT_PATHS = ["/ai-presence-audit", "gtmsignalstudio.com/ai-presence-audit"];
const NEWSLETTER_PATHS = ["newsletter.gtmsignalstudio.com", "/newsletter"];

function isAiPresenceAuditLink(href: string) {
  return AI_PRESENCE_AUDIT_PATHS.some((p) => href.includes(p));
}

function isNewsletterLink(href: string) {
  return NEWSLETTER_PATHS.some((p) => href.includes(p));
}

export default function BlogContent({ content }: { content: string }) {
  const pathname = usePathname();

  return (
    <div className="prose max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug]}
        components={{
          a: ({ href, children, ...props }) => {
            const url = href || "";
            const handleClick = () => {
              if (isAiPresenceAuditLink(url)) {
                trackCTAClick("ai_presence_audit", pathname);
              } else if (isNewsletterLink(url)) {
                trackNewsletterClick(pathname);
              }
            };
            return (
              <a
                href={url}
                onClick={handleClick}
                target={url.startsWith("http") ? "_blank" : undefined}
                rel={url.startsWith("http") ? "noopener noreferrer" : undefined}
                {...props}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
