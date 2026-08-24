import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

/**
 * UK Marketing Careers 2026 — the second signal.
 *
 * GTM Signal Studio has always researched one go-to-market signal: whether AI recommends you.
 * This is the second: what the market actually pays for marketing skills, and what AI is
 * doing to each job.
 *
 * Built to be cited. Every figure carries a named source, the raw data is a public API, and
 * the page ships Dataset, Article and FAQPage structured data so both search engines and
 * language models can lift a specific claim with its attribution attached.
 */

const CANONICAL = "https://gtmsignalstudio.com/research/uk-marketing-careers-2026";
const UPDATED = "2026-08-24";

export const metadata: Metadata = {
  title: "UK Marketing Careers 2026 | Every Role Ranked by Salary, Demand and AI Risk",
  description:
    "Twelve UK marketing roles ranked on median salary, hiring demand, how hard each is to enter, and what AI is doing to it. Product marketing £65,000, campaign management £45,000, social media £37,000. Every figure sourced. Free to cite.",
  keywords: [
    "UK marketing salaries 2026",
    "what career in marketing should I go for",
    "marketing career path UK",
    "product marketing manager salary UK",
    "campaign manager salary UK",
    "which marketing job pays most",
    "AI impact on marketing jobs",
    "marketing jobs ranked UK",
    "how to get into marketing UK",
  ],
  openGraph: {
    title: "UK Marketing Careers 2026 | Every Role Ranked",
    description:
      "Twelve UK marketing roles ranked on pay, demand, entry difficulty and AI exposure. Every figure sourced. Free to cite.",
    type: "article",
    url: CANONICAL,
  },
  alternates: { canonical: CANONICAL },
};

type Role = {
  role: string;
  median: string;
  range: string;
  source: string;
  entry: "From outside" | "You arrive here";
  ai: string;
  aiTone: "low" | "medium" | "high" | "unknown";
};

const ROLES: Role[] = [
  { role: "Product marketing manager", median: "£65,000", range: "£47,973 – £85,445", source: "IT Jobs Watch", entry: "You arrive here", ai: "Least exposed on the board", aiTone: "low" },
  { role: "SEO manager", median: "£61,330", range: "£52,569 – £70,092", source: "Ashdown Group", entry: "You arrive here", ai: "Genuinely unknown", aiTone: "unknown" },
  { role: "PPC / demand gen manager", median: "£56,950", range: "£48,188 – £70,092", source: "Ashdown Group", entry: "You arrive here", ai: "Automates setup, not targeting", aiTone: "medium" },
  { role: "CRM / lifecycle manager", median: "£52,569", range: "£43,807 – £65,711", source: "Ashdown Group", entry: "You arrive here", ai: "The job already is the automation", aiTone: "low" },
  { role: "Brand manager", median: "£50,817", range: "£44,684 – £65,711", source: "Ashdown Group", entry: "You arrive here", ai: "Largely untouched", aiTone: "low" },
  { role: "Campaign manager", median: "£45,000", range: "£39,427 – £56,950", source: "IT Jobs Watch", entry: "From outside", ai: "Loses the admin half", aiTone: "medium" },
  { role: "Content manager", median: "£42,055", range: "£35,046 – £52,569", source: "Ashdown Group", entry: "From outside", ai: "Hit hardest of anything here", aiTone: "high" },
  { role: "Insights / marketing analyst", median: "£41,750", range: "£32,250 – £59,000", source: "Robert Half", entry: "From outside", ai: "Faster, not replaced", aiTone: "low" },
  { role: "PPC executive", median: "£39,427", range: "£30,665 – £43,807", source: "Ashdown Group", entry: "From outside", ai: "Loses the button-pressing", aiTone: "medium" },
  { role: "Social media manager", median: "£37,000", range: "£30,000 – £56,500", source: "Robert Half", entry: "From outside", ai: "Production gets easier", aiTone: "medium" },
  { role: "Digital marketing executive", median: "£30,000", range: "£26,250 – £35,000", source: "Robert Half", entry: "From outside", ai: "The entry route that is closing", aiTone: "high" },
  { role: "Copywriter (job title)", median: "No published median", range: "—", source: "Neither quartile-based guide lists one", entry: "From outside", ai: "Words to a brief: gone", aiTone: "high" },
];

const AI_TONE: Record<Role["aiTone"], string> = {
  low: "text-green-700",
  medium: "text-text-body",
  high: "text-orange",
  unknown: "text-text-muted italic",
};

const FAQS = [
  {
    q: "What career in marketing should I go for?",
    a: "It depends less on what pays most and more on what you can actually get. Campaign management, content, analytics, PPC executive and social media are all enterable from outside marketing. Product marketing, SEO management, CRM management and brand are roles people arrive at after two to four years elsewhere. If you are outside marketing now, the realistic answer is to take an executive or campaign role and specialise within twelve months, because the generalist role is the one contracting fastest.",
  },
  {
    q: "Which marketing job pays the most in the UK?",
    a: "Product marketing, at a median of £65,000, followed by SEO management at £61,330 and PPC or demand generation management at £56,950. Product marketing is also the role least exposed to AI, because the work is judgment built on direct customer contact.",
  },
  {
    q: "Which marketing job is easiest to get into?",
    a: "Campaign management is the most realistic entry point for people coming from project management, operations or admin, because the underlying skill is the same: deadlines, dependencies, budget and getting work out of the door. UK employers typically ask for three to five years running campaigns or something adjacent, and a CIM qualification is usually listed as desirable rather than essential.",
  },
  {
    q: "Is AI going to replace marketing jobs?",
    a: "The evidence points somewhere more specific than replacement. Teams are flattening from pyramid structures into flatter ones, junior hiring is down, and content production is the function most disrupted. The clearest effect is on the entry route rather than on established roles: the job you would have started in is disappearing faster than the ones above it.",
  },
  {
    q: "Are UK marketing salaries going up or down?",
    a: "Down. Average UK marketing pay fell in 2026 across nearly every sector and level of seniority, by almost £11,000 in some cases, according to Marketing Week's Career and Salary Survey of 2,350 respondents. Product marketing fell 7.14% year on year and campaign management 5.26%. Of sixteen sectors measured, only entertainment saw pay rise.",
  },
  {
    q: "Is copywriting still a good career in marketing?",
    a: "As a skill it remains central to almost every senior marketing role. As a standalone job title it is weakening: neither of the two UK salary guides that publish quartile methodology lists a median for Copywriter any more. The judgment of what to say and why still commands a salary, but usually under a different job title.",
  },
];

export default function UkMarketingCareers2026() {
  const dataset = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "UK Marketing Careers 2026: salary, demand and AI exposure by role",
    description:
      "Twelve UK marketing roles with median salary, salary range, entry route, hiring demand and AI exposure. Compiled from IT Jobs Watch, Ashdown Group, Robert Half, Marketing Week, the IPA and Michael Page. Every figure carries a named source.",
    url: CANONICAL,
    identifier: CANONICAL,
    keywords: ["UK marketing salaries", "marketing careers", "AI and marketing jobs", "marketing job market 2026"],
    license: "https://creativecommons.org/licenses/by/4.0/",
    isAccessibleForFree: true,
    dateModified: UPDATED,
    spatialCoverage: { "@type": "Place", name: "United Kingdom" },
    temporalCoverage: "2025/2026",
    creator: { "@type": "Organization", name: "GTM Signal Studio", url: "https://gtmsignalstudio.com" },
    // Deliberately no DataDownload pointing at the raw API. Oloye's call 2026-08-24, and he
    // is right: handing a stranger a JSON dump one click from a public page is the wrong
    // front door. It costs nothing for citation, because variableMeasured below already
    // carries all twelve roles with their values and sources inside the page itself.
    variableMeasured: ROLES.map((r) => ({
      "@type": "PropertyValue",
      name: r.role,
      value: r.median,
      description: `UK median salary. Range ${r.range}. Source: ${r.source}. AI exposure: ${r.ai}.`,
    })),
  };

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "UK Marketing Careers 2026: Every Role Ranked by Salary, Demand and AI Risk",
    description: metadata.description,
    datePublished: UPDATED,
    dateModified: UPDATED,
    mainEntityOfPage: CANONICAL,
    author: { "@type": "Person", name: "Oloye Adeosun", url: "https://gtmsignalstudio.com/about/founder" },
    publisher: { "@type": "Organization", name: "GTM Signal Studio", url: "https://gtmsignalstudio.com" },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dataset) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />

      <PageHeader
        tagline="Research · August 2026"
        breadcrumb={{ label: "Research", href: "/research" }}
        title="UK Marketing Careers 2026"
        subtitle="Twelve roles ranked on what they pay, who is hiring, how hard each is to get into, and what AI is doing to it. Every figure has a source. All of it free to cite."
      />

      {/* The finding */}
      <section className="section-light py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">THE FINDING</p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-6">
            The pay gap is not about scarcity of jobs
          </h2>
          <div className="space-y-4 text-text-body leading-relaxed">
            <p>
              Over the same six months, UK employers advertised <strong>50 permanent product
              marketing roles and 56 campaign manager roles</strong>. Almost identical demand.
              The median salaries are <strong>£65,000 and £45,000</strong>.
            </p>
            <p>
              A £20,000 gap on near-identical volume is not a supply problem in the job market.
              It is a supply problem in the labour pool. Far fewer people can do one of these
              jobs than the other, and the reason is that one of them cannot be entered from
              outside.
            </p>
            <p>
              That pattern repeats across the board. <strong>What separates the well-paid
              marketing roles from the rest is not difficulty. It is whether you can be hired
              into them without already being inside.</strong>
            </p>
          </div>
          <div className="mt-8 p-6 bg-cream rounded-lg">
            <p className="font-semibold text-text-dark mb-2">And the market is contracting</p>
            <p className="text-text-body">
              Average UK marketing pay fell in 2026 across nearly every sector and seniority, by
              almost £11,000 in some cases. Product marketing fell 7.14% year on year, campaign
              management 5.26%. Meanwhile the number of marketers actively looking for work at
              one UK recruiter rose from 16,000 to around 30,000 in twelve months.
            </p>
          </div>
        </div>
      </section>

      {/* The board */}
      <section className="section-white py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">THE DATA</p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-3">
            Twelve UK marketing roles
          </h2>
          <p className="text-text-body mb-8">
            Median salary, typical range, whether the role can be entered from outside
            marketing, and what AI is doing to it.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead>
                <tr className="border-b-2 border-text-dark/10">
                  <th className="py-3 pr-4 font-mono text-xs uppercase tracking-wider text-text-muted">Role</th>
                  <th className="py-3 pr-4 font-mono text-xs uppercase tracking-wider text-text-muted text-right">Median</th>
                  <th className="py-3 pr-4 font-mono text-xs uppercase tracking-wider text-text-muted">Range</th>
                  <th className="py-3 pr-4 font-mono text-xs uppercase tracking-wider text-text-muted">Entry</th>
                  <th className="py-3 font-mono text-xs uppercase tracking-wider text-text-muted">What AI does</th>
                </tr>
              </thead>
              <tbody>
                {ROLES.map((r) => (
                  <tr key={r.role} className="border-b border-text-dark/5 align-top">
                    <td className="py-3 pr-4 font-semibold text-text-dark">{r.role}</td>
                    <td className="py-3 pr-4 font-mono text-text-dark text-right whitespace-nowrap">{r.median}</td>
                    <td className="py-3 pr-4 font-mono text-sm text-text-muted whitespace-nowrap">{r.range}</td>
                    <td className="py-3 pr-4 text-sm text-text-body whitespace-nowrap">{r.entry}</td>
                    <td className={`py-3 text-sm ${AI_TONE[r.aiTone]}`}>{r.ai}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-sm text-text-muted mt-6">
            Sources: IT Jobs Watch (6 months to 24 August 2026), Ashdown Group Marketing Salary
            Guide (July 2025), Robert Half UK Salary Guide 2026. Recruiter salary pages that do
            not publish a method were not used.
          </p>
        </div>
      </section>

      {/* What it means */}
      <section className="section-light py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">WHAT THE DATA SAYS</p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-8">Three conclusions</h2>

          <div className="space-y-8">
            <div>
              <h3 className="font-heading text-xl font-bold text-text-dark mb-2">
                1. AI is taking the entry route, not the job
              </h3>
              <p className="text-text-body leading-relaxed">
                Teams are flattening from pyramid structures into flatter ones. Junior hiring is
                down and junior roles are being cut hardest. Content production is the single
                most disrupted function. The clearest effect is not that established marketers
                are replaced, but that the job somebody would have started in is disappearing
                faster than the roles above it.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-text-dark mb-2">
                2. The job title is worth £9,500 on its own
              </h3>
              <p className="text-text-body leading-relaxed">
                In the same salary guide, on the same page, a Marketing Automation Specialist has
                a median of £35,500 and a Marketing Automation Manager £45,000, for heavily
                overlapping work. Title inflation and title deflation are real, measurable and
                worth negotiating over.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-text-dark mb-2">
                3. Some skills are strong while their job titles weaken
              </h3>
              <p className="text-text-body leading-relaxed">
                Copywriting is the clearest case. It remains a core requirement of almost every
                senior marketing role, and neither UK salary guide that publishes quartile
                methodology lists a median for Copywriter any more. The skill has not lost
                value. The title has.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ, rendered so it matches the structured data */}
      <section className="section-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">QUESTIONS</p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-8">
            The things people actually ask
          </h2>
          <div className="space-y-8">
            {FAQS.map((f) => (
              <div key={f.q}>
                <h3 className="font-heading text-lg font-bold text-text-dark mb-2">{f.q}</h3>
                <p className="text-text-body leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Method and use */}
      <section className="section-light py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">METHOD</p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-6">
            How this was put together, and what to distrust
          </h2>
          <div className="space-y-4 text-text-body leading-relaxed">
            <p>
              Salary figures come only from sources that publish their method. Robert Half builds
              from actual placements plus 350,000 third-party job postings. Ashdown Group
              publishes national quartiles with definitions. IT Jobs Watch counts live job ads.
              Recruiter salary pages with no stated method were excluded, including one quoting
              marketing automation at £50,000 to £75,000 against Robert Half&apos;s placement
              median of £35,500.
            </p>
            <p>
              <strong>Where the sources disagree, that is shown rather than smoothed.</strong>{" "}
              Product marketing is the weakest-sourced role here: Glassdoor says £63,157, IT Jobs
              Watch £65,000, Indeed £56,284 and PayScale £46,213. A £19,000 spread should be read
              as a range, not a fact.
            </p>
            <p>
              One statistic was discarded during collection. A claim that graduate marketing
              postings had fallen 66% was attributed to a Marketing Week article that, when
              retrieved in full, did not contain it. It is not used here.
            </p>
          </div>

          <div className="mt-10 p-6 bg-cream rounded-lg">
            <p className="font-semibold text-text-dark mb-3">Use the data</p>
            <p className="text-text-body mb-4">
              Every figure above is in the stats database with the source it came from. Free to
              cite, quote or build on, with attribution.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/research/stats"
                className="bg-orange hover:bg-orange-hover text-white px-5 py-2.5 rounded-lg font-semibold text-sm text-center transition-colors"
              >
                Browse the stats database
              </Link>
            </div>
            <p className="text-sm text-text-muted mt-4">
              Suggested citation: GTM Signal Studio, <em>UK Marketing Careers 2026</em>, {UPDATED}.{" "}
              {CANONICAL}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
