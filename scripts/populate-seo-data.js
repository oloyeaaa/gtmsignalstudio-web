/**
 * Populate FAQ, short_answer, and tags for all 21 posts
 * Usage: node scripts/populate-seo-data.js
 */
const { createClient } = require("@supabase/supabase-js");

const sb = createClient(
  "https://qgcbzstbwfpxkruanrgt.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnY2J6c3Rid2ZweGtydWFucmd0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzU3NTY4NSwiZXhwIjoyMDg5MTUxNjg1fQ.ZWfOuASAF3hFpGQaFKl8FR2ctV2KtZI3wD9zJBmUdkY"
);

// ============================================
// FAQ + SHORT ANSWER + TAGS DATA FOR ALL 21 POSTS
// ============================================

const postData = {
  // ─── ICP & BUYER UNDERSTANDING (6 posts) ───

  "beginner-guide-icp-cold-email-2026": {
    short_answer: "An ideal customer profile (ICP) defines the company characteristics — industry, size, revenue, and buying behaviour — that predict which prospects will convert. B2B teams that define a clear ICP before outreach see faster sales cycles and higher deal values.",
    tags: ["ICP", "cold email", "B2B targeting", "buyer persona", "lead qualification"],
    faq: [
      { question: "What is an ideal customer profile in B2B sales?", answer: "An ideal customer profile describes the firmographic and behavioural attributes of the companies most likely to buy from you. Unlike buyer personas (which describe individuals), an ICP targets the account level — industry, company size, revenue, technology stack, and buying triggers." },
      { question: "How many attributes should an ICP include?", answer: "Aim for 5-10 defining attributes. Too few and your targeting is vague. Too many and your addressable market shrinks to zero. The best ICPs balance specificity with scale — tight enough to repel wrong buyers, broad enough to fill a pipeline." },
      { question: "What is the difference between an ICP and a buyer persona?", answer: "An ICP describes the ideal company (firmographics like industry, size, revenue). A buyer persona describes the ideal person within that company (job title, goals, pain points). You need both — the ICP qualifies the account, the persona qualifies the contact." },
      { question: "How often should you update your ICP?", answer: "Review your ICP quarterly against closed-won data. If your best customers no longer match your ICP criteria, the profile is stale. Companies that update ICPs quarterly report 68% better pipeline quality than those who set-and-forget." },
    ],
  },

  "build-validate-icp-card-2026": {
    short_answer: "An ICP card is a one-page document that captures your ideal customer's firmographics, pain points, buying triggers, and disqualifiers. Validate it by scoring existing customers against the card and removing criteria that do not predict conversion.",
    tags: ["ICP card", "validation", "B2B targeting", "customer scoring", "sales process"],
    faq: [
      { question: "What is an ICP card?", answer: "An ICP card is a concise, structured document (usually one page) that defines your ideal customer across key dimensions: industry, company size, revenue, technology, pain points, buying triggers, and disqualifiers. Sales teams use it to qualify prospects in under 60 seconds." },
      { question: "How do you validate an ICP?", answer: "Score your existing customers against each ICP criterion. Customers that score highest should be your best accounts (highest revenue, lowest churn, fastest close). If high-scoring ICP matches do not correlate with your best customers, your criteria are wrong — remove or replace them." },
      { question: "What are ICP disqualifiers?", answer: "Disqualifiers are criteria that immediately exclude a prospect regardless of other fit. Common disqualifiers include company size below minimum threshold, no budget authority, industries you cannot serve, or prospects already using a competitor with a long contract lock-in." },
    ],
  },

  "why-job-titles-arent-enough-building-full-icp-profiles-in-2026": {
    short_answer: "Job titles alone cannot predict buying intent because they describe who someone is, not what they need right now. A complete ICP profile adds firmographic, behavioural, and signal-based criteria to identify prospects with active, time-sensitive problems.",
    tags: ["ICP", "job titles", "buying signals", "B2B targeting", "prospect qualification"],
    faq: [
      { question: "Why are job titles insufficient for B2B targeting?", answer: "Job titles are static characteristics — they are the same today as they were six months ago. They tell you someone exists but not whether they have an active problem. Two CTOs at identical companies may have completely different needs and timelines." },
      { question: "What should you use instead of job titles for targeting?", answer: "Combine job titles with buying signals (hiring activity, funding events, leadership changes), technographic data (what tools they use), and behavioural signals (content engagement, website visits). This creates a dynamic profile that reflects current need, not just demographic fit." },
      { question: "How do buying signals improve ICP accuracy?", answer: "Buying signals indicate timing — they reveal when a prospect has an active need. A CTO who just raised a Series A has different urgency than one who has been in role for three years. Signal-filtered outreach achieves 5-12% reply rates compared to 1-3% for title-only targeting." },
    ],
  },

  "icp-scoring-pain-money-fit-2026": {
    short_answer: "ICP scoring evaluates prospects across four dimensions: pain (severity of the problem), money (budget availability), reachability (ability to contact decision-makers), and fit (alignment with your solution). Prospects scoring high on all four convert fastest.",
    tags: ["ICP scoring", "lead scoring", "pain points", "B2B qualification", "sales qualification"],
    faq: [
      { question: "What is ICP scoring?", answer: "ICP scoring assigns a numerical value to each prospect based on how closely they match your ideal customer profile. The four core dimensions are pain (problem severity), money (budget and authority), reachability (can you contact the decision-maker), and fit (does your solution match their need)." },
      { question: "How do you score pain in ICP evaluation?", answer: "Pain scoring measures how urgently the prospect needs a solution. High pain: they have tried to solve the problem and failed. Medium pain: they know the problem exists but have not prioritised it. Low pain: they do not recognise the problem yet. High-pain prospects close 3x faster." },
      { question: "What is the difference between ICP scoring and lead scoring?", answer: "ICP scoring evaluates account-level fit (is this the right type of company?). Lead scoring evaluates individual-level engagement (has this person shown buying behaviour?). ICP scoring happens before outreach; lead scoring happens during the sales process." },
    ],
  },

  "buyer-signals-narrow-icp": {
    short_answer: "Buyer signals narrow your ICP by filtering for timing — they identify which prospects within your ICP have an active need right now. The three strongest B2B signals are new hires in sales roles, recent funding, and leadership changes.",
    tags: ["buying signals", "ICP", "signal-led outreach", "B2B prospecting", "sales timing"],
    faq: [
      { question: "What are B2B buying signals?", answer: "Buying signals are observable events that indicate a company is more likely to purchase right now. Examples include hiring for sales roles (indicates outbound investment), recent funding (indicates budget), leadership changes (indicates strategic review), and technology migrations (indicates infrastructure decisions)." },
      { question: "How many buying signals should I track?", answer: "Three signals are sufficient for most B2B service businesses. Track signals that are specific to your ICP, verifiable online, and timestamped within the last 14 days. Quality matters more than quantity — three precise signals outperform twenty generic indicators." },
      { question: "Where can I find buying signals for free?", answer: "LinkedIn Jobs (hiring signals), company press releases and Crunchbase (funding signals), and LinkedIn profile changes (leadership appointments) are the primary free sources. A 15-minute scan twice per week generates 5-10 signal-qualified leads." },
    ],
  },

  "signal-driven-icp-framework": {
    short_answer: "A signal-driven ICP framework combines traditional firmographic criteria with real-time buying signals to create a dynamic targeting model. Instead of asking 'who matches our ICP?', it asks 'who in our ICP has a reason to buy right now?'",
    tags: ["ICP framework", "buying signals", "signal-led GTM", "B2B targeting", "outbound strategy"],
    faq: [
      { question: "What is a signal-driven ICP framework?", answer: "A signal-driven ICP framework layers real-time buying signals on top of traditional firmographic criteria. It filters your total addressable market down to prospects with active, time-sensitive needs — producing higher reply rates and faster sales cycles than static list-based targeting." },
      { question: "How does a signal-driven ICP differ from a traditional ICP?", answer: "A traditional ICP uses static criteria (industry, size, revenue). A signal-driven ICP adds dynamic criteria (recently hired a VP of Sales, just raised funding, migrating technology). The static criteria define who could buy; the signals identify who will buy now." },
      { question: "What results can you expect from signal-driven targeting?", answer: "Signal-qualified outreach typically achieves 5-12% reply rates versus 1-3% for volume-based cold outreach. The first seller to contact a prospect after a trigger event wins the deal five times more often than later arrivals." },
      { question: "How do you implement a signal-driven ICP?", answer: "Define 3 buying signals specific to your ICP. Build a detection routine (LinkedIn Jobs, Crunchbase, press releases). Reference the signal in your first email. The signal makes the email relevant — it transforms cold outreach into timely outreach." },
    ],
  },

  // ─── SIGNAL-LED GTM STRATEGY (5 posts) ───

  "why-gtm-strategies-fail": {
    short_answer: "Most go-to-market strategies fail because they optimise for volume instead of timing. They target static characteristics (job title, company size) rather than buying signals that indicate a prospect has an active need right now.",
    tags: ["GTM strategy", "go-to-market", "B2B sales", "signal-led", "outbound failure"],
    faq: [
      { question: "Why do most GTM strategies fail?", answer: "Most GTM strategies fail because they prioritise volume over precision. They build large prospect lists based on static characteristics and blast generic messaging. Without timing signals, 95-99% of recipients have no reason to engage — regardless of how good the copy is." },
      { question: "What is the biggest mistake in B2B go-to-market?", answer: "The biggest mistake is treating outreach as a numbers game. More emails to unqualified prospects does not produce more pipeline — it burns domain reputation, trains inbox algorithms to deprioritise your messages, and compounds deliverability problems over time." },
      { question: "How do you fix a failing GTM strategy?", answer: "Replace volume-based targeting with signal-based targeting. Define 3 buying signals specific to your ICP, detect them in real time, and reference them in your outreach. This shifts the response from 'not another cold email' to 'how did they know?'" },
    ],
  },

  "types-of-gtm-signals": {
    short_answer: "The five types of GTM signals are hiring signals, funding signals, leadership changes, technology migrations, and engagement signals. Each indicates a different type of buying intent and requires a different outreach approach.",
    tags: ["GTM signals", "buying signals", "signal types", "B2B outreach", "sales intelligence"],
    faq: [
      { question: "What are the different types of GTM signals?", answer: "The five primary signal types are: hiring signals (new sales/marketing roles), funding signals (investment rounds), leadership signals (C-suite appointments), technology signals (tool migrations or adoptions), and engagement signals (content consumption, website visits, event attendance)." },
      { question: "Which GTM signal is the strongest predictor of buying intent?", answer: "Hiring for sales or business development roles is the strongest signal because it proves budget allocation — the salary is the investment. A company posting for an SDR has already decided to invest in outbound. The question is whether they have infrastructure for the new hire." },
      { question: "How quickly should you act on a buying signal?", answer: "Within 14 days of the signal appearing. Signals decay — a company that raised funding 6 months ago has already made most infrastructure decisions. The first seller to reach a prospect after a trigger event wins 5x more often than those who arrive later." },
    ],
  },

  "why-cold-emails-get-ignored-timing-not-copy": {
    short_answer: "Cold emails get ignored because of bad timing, not bad copy. When a prospect has no active need, no amount of copywriting skill will generate a reply. Signal-led outreach solves this by contacting prospects when they have a demonstrated, time-sensitive problem.",
    tags: ["cold email", "email timing", "buying signals", "reply rates", "B2B outreach"],
    faq: [
      { question: "Why do cold emails get ignored?", answer: "The primary reason cold emails get ignored is timing, not copy quality. If the recipient has no active need for your solution, even a perfectly written email will be deleted. Research shows 61% of B2B buyers now prefer a rep-free experience — you need a compelling reason to interrupt." },
      { question: "Does better copywriting improve cold email reply rates?", answer: "Copywriting alone has diminishing returns. Studies show pitching in cold emails reduces reply rates by up to 57%. The highest-performing cold emails are under 80 words, reference a specific pain point or signal, and make one clear ask. Relevance beats cleverness every time." },
      { question: "What is the average cold email reply rate?", answer: "The average cold email reply rate is between 1-5%. Top performers achieve 10-15% by combining signal-based targeting with short, specific messaging. The single biggest factor in reply rate is whether the prospect has an active need when your email arrives." },
    ],
  },

  "signal-logic-the-filter-between-raw-data-and-qualified-pipeline": {
    short_answer: "Signal logic is the decision framework that filters raw prospect data into qualified pipeline. It evaluates each data point against three criteria: is it verifiable, is it time-stamped, and does it indicate a specific buying need?",
    tags: ["signal logic", "pipeline qualification", "data filtering", "B2B sales", "signal-led GTM"],
    faq: [
      { question: "What is signal logic in B2B sales?", answer: "Signal logic is the filtering framework that separates noise from actionable buying signals. It takes raw data (job postings, funding announcements, technology changes) and applies three tests: verifiability (can you confirm it?), recency (did it happen in the last 14 days?), and relevance (does it indicate a need you solve?)." },
      { question: "How does signal logic differ from lead scoring?", answer: "Lead scoring assigns points based on engagement actions (email opens, page visits). Signal logic evaluates external events that the prospect did not direct at you — hiring decisions, funding rounds, leadership changes. Signal logic works before first contact; lead scoring works after." },
      { question: "Why does raw data not equal qualified pipeline?", answer: "Raw data (company lists, job titles, industry codes) describes who someone is, not what they need. A list of 10,000 CTOs is data. A list of 50 CTOs who hired a VP of Sales last week is pipeline. Signal logic is the filter between the two." },
    ],
  },

  "signal-based-gtm": {
    short_answer: "Signal-based GTM is a go-to-market strategy that prioritises outreach based on real-time buying signals rather than static prospect lists. Companies using signal-based approaches achieve 5-12% reply rates versus 1-3% for volume-based outreach.",
    tags: ["signal-based GTM", "go-to-market strategy", "buying signals", "B2B sales", "outbound sales"],
    faq: [
      { question: "What is signal-based GTM?", answer: "Signal-based GTM is a go-to-market approach where outreach timing is driven by observable buying signals — events like hiring activity, funding rounds, leadership changes, or technology migrations. Instead of blasting static lists, you contact prospects when evidence suggests they have a current need." },
      { question: "How does signal-based GTM improve sales performance?", answer: "Signal-based GTM improves performance because it addresses timing, which is the number one factor in cold outreach success. The first seller to contact a decision-maker after a trigger event is 5x more likely to win the deal. Signal-qualified outreach achieves 5-12% reply rates." },
      { question: "What tools do you need for signal-based GTM?", answer: "You need a signal detection source (LinkedIn Sales Navigator, Crunchbase, or a dedicated tool like Signalbase), a CRM or tracking system (Airtable, HubSpot), and an outreach platform (SmartLead, Instantly). Most of these have free tiers sufficient for early-stage teams." },
      { question: "Is signal-based GTM only for large sales teams?", answer: "No. Signal-based GTM is particularly effective for small teams and solo founders because it reduces volume requirements. Instead of sending 1,000 emails to get 10 replies, you send 100 signal-qualified emails to get 10 replies. Less infrastructure, same result." },
    ],
  },

  // ─── COLD EMAIL INFRASTRUCTURE (7 posts) ───

  "how-to-warm-up-email-domains-safely-in-2026-gtm-consultant-guide": {
    short_answer: "Email domain warmup is the process of gradually increasing sending volume on a new domain to build sender reputation with inbox providers. Start with 5-10 emails per day for 2-4 weeks before scaling to campaign volumes.",
    tags: ["email warmup", "domain reputation", "cold email", "deliverability", "sender reputation"],
    faq: [
      { question: "How long does email domain warmup take?", answer: "A typical warmup period is 2-4 weeks for new domains. Start with 5-10 emails per day and increase by 5-10 per day each week. Rushing warmup by sending high volumes too early damages sender reputation and can take months to recover." },
      { question: "Should I use a separate domain for cold email?", answer: "Yes. Always use a subdomain or separate domain for cold outreach. If the outbound domain gets flagged, your primary business domain survives. Common patterns include mail.yourdomain.com or using a .co or .io variant of your main domain." },
      { question: "What is a good warmup volume schedule?", answer: "Week 1: 5-10 emails per day. Week 2: 15-20 per day. Week 3: 25-35 per day. Week 4: 40-50 per day. Never exceed 50 emails per mailbox per day for cold outreach. Use multiple mailboxes to scale volume, not higher sends per mailbox." },
    ],
  },

  "3335-2": {
    short_answer: "SPF, DKIM, and DMARC are email authentication protocols that verify your sending identity. SPF authorises which servers can send from your domain, DKIM cryptographically signs your messages, and DMARC tells receiving servers how to handle authentication failures.",
    tags: ["SPF", "DKIM", "DMARC", "email authentication", "deliverability"],
    faq: [
      { question: "What is SPF and why does it matter for cold email?", answer: "SPF (Sender Policy Framework) is a DNS record that specifies which mail servers are authorised to send email on behalf of your domain. Without SPF, inbox providers cannot verify your emails are legitimate, increasing the chance they land in spam." },
      { question: "What is the difference between SPF, DKIM, and DMARC?", answer: "SPF verifies the sending server is authorised. DKIM adds a cryptographic signature proving the message was not altered in transit. DMARC ties SPF and DKIM together and tells receiving servers what to do when authentication fails (none, quarantine, or reject)." },
      { question: "Do I need all three for cold email in 2026?", answer: "Yes. Since February 2024, Gmail requires SPF, DKIM, and DMARC for bulk senders. Microsoft Outlook enforced the same from May 2025. Without all three configured correctly, your cold emails will increasingly land in spam or be rejected entirely." },
    ],
  },

  "how-to-avoid-spam-filters-and-improve-cold-email-deliverability-2026-guide": {
    short_answer: "Avoid spam filters by authenticating your domain (SPF, DKIM, DMARC), warming up slowly, keeping volume under 50 emails per mailbox per day, and writing short, personalised emails that reference specific buying signals rather than generic pitches.",
    tags: ["spam filters", "deliverability", "cold email", "inbox placement", "email reputation"],
    faq: [
      { question: "Why do cold emails go to spam?", answer: "Cold emails land in spam due to poor domain reputation, missing authentication (SPF/DKIM/DMARC), high bounce rates (over 2%), spam complaint rates above 0.3%, or content that triggers spam filters (excessive links, sales language, HTML-heavy formatting)." },
      { question: "How do I check if my emails are going to spam?", answer: "Use Gmail Postmaster Tools to monitor domain reputation and spam rates. Send test emails to seed accounts across Gmail, Outlook, and Yahoo. Tools like GlockApps or Mail Tester provide inbox placement reports showing exactly where your emails land." },
      { question: "What spam complaint rate is acceptable?", answer: "Keep spam complaint rates below 0.3%. Google, Yahoo, and Microsoft all enforce this threshold for bulk senders. A single campaign with a 0.5% complaint rate can damage your domain reputation for weeks. Signal-qualified targeting naturally keeps complaint rates low because recipients find the email relevant." },
    ],
  },

  "the-complete-guide-to-cold-email-metrics-you-should-track-2026": {
    short_answer: "The essential cold email metrics are reply rate (target 5-12%), bounce rate (under 2%), spam complaint rate (under 0.3%), and conversion rate from reply to meeting. Open rates are unreliable due to tracking pixel blocking and should not be a primary metric.",
    tags: ["cold email metrics", "reply rate", "email analytics", "B2B outreach", "campaign tracking"],
    faq: [
      { question: "What is a good cold email reply rate?", answer: "A good cold email reply rate is 5-12%. Top performers using signal-based targeting achieve 10-15%. Below 3% indicates a targeting or messaging problem. Reply rate is the most reliable metric because it cannot be faked by tracking pixels or automated opens." },
      { question: "Should I track open rates for cold emails?", answer: "Open rates are increasingly unreliable for cold email. Apple Mail Privacy Protection, corporate firewalls, and email proxies inflate open rates artificially. Many experienced cold emailers turn off open tracking entirely. Reply rate is the metric that matters." },
      { question: "What bounce rate is too high for cold email?", answer: "Keep bounce rates under 2%. Google and Microsoft flag senders with bounce rates above 2% as potentially sending to purchased or scraped lists. Verify email addresses before sending using tools like NeverBounce or ZeroBounce to prevent bounces." },
    ],
  },

  "cold-email-tools-compared-smartlead-vs-clay-vs-instantly-2026": {
    short_answer: "SmartLead, Clay, and Instantly serve different parts of the cold email stack. SmartLead handles multi-mailbox sending and warmup. Clay handles data enrichment and prospect research. Instantly focuses on email sending with built-in deliverability features.",
    tags: ["SmartLead", "Clay", "Instantly", "cold email tools", "email infrastructure"],
    faq: [
      { question: "What is the difference between SmartLead and Instantly?", answer: "Both are cold email sending platforms, but SmartLead offers deeper multi-mailbox management (unlimited mailboxes on higher plans) and API access for automation. Instantly focuses on ease of use with built-in deliverability scoring and a simpler interface. SmartLead is better for technical users who want control." },
      { question: "Do I need Clay if I already use SmartLead?", answer: "Clay and SmartLead do different things. Clay is a data enrichment and prospect research tool — it helps you build and enrich lead lists. SmartLead is a sending tool — it handles mailbox rotation, warmup, and sequences. Most teams use both: Clay for building lists, SmartLead for sending." },
      { question: "Which cold email tool is best for beginners?", answer: "Instantly is the most beginner-friendly with a clean interface and built-in warmup. SmartLead offers more power but steeper learning curve. Start with one tool and master it before adding others. The tool matters less than your targeting and messaging." },
    ],
  },

  "cold-email-deliverability-2026-infrastructure": {
    short_answer: "Cold email deliverability in 2026 requires SPF, DKIM, and DMARC authentication, separate outbound domains, gradual warmup, volume limits of 50 emails per mailbox per day, and signal-based targeting to keep complaint rates below 0.3%.",
    tags: ["email deliverability", "cold email infrastructure", "domain setup", "2026 email", "sender reputation"],
    faq: [
      { question: "What has changed about email deliverability in 2026?", answer: "Gmail required SPF, DKIM, and DMARC for bulk senders from February 2024. Microsoft Outlook enforced the same from May 2025. One-click unsubscribe is now mandatory. Spam complaint thresholds are strictly enforced at 0.3%. Volume-based sending without authentication is effectively dead." },
      { question: "How many emails can I send per day for cold outreach?", answer: "Limit to 50 emails per mailbox per day. Use multiple mailboxes across separate domains to scale volume. Start at 20 per day for new mailboxes and increase gradually. Sending 500 emails from one mailbox will destroy your domain reputation." },
      { question: "What is the most important deliverability factor in 2026?", answer: "Targeting quality. If 80% of your recipients genuinely need what you sell, inbox algorithms work in your favour because engagement signals (replies, not-spam actions) build positive reputation. If 80% do not care, no amount of technical setup saves you." },
    ],
  },

  "cold-email-deliverability-framework": {
    short_answer: "A cold email deliverability framework combines three layers: technical authentication (SPF, DKIM, DMARC), infrastructure management (domain rotation, mailbox warmup, volume limits), and targeting quality (signal-based lists that keep complaint rates below 0.3%).",
    tags: ["deliverability framework", "cold email infrastructure", "email setup", "domain management", "outbound system"],
    faq: [
      { question: "What is a cold email deliverability framework?", answer: "A deliverability framework is a systematic approach to ensuring cold emails reach the inbox. It covers three layers: authentication (SPF, DKIM, DMARC), infrastructure (domain setup, mailbox warmup, sending limits), and targeting (signal-qualified lists that minimise complaints and bounces)." },
      { question: "How many domains do I need for cold email?", answer: "Start with 2-3 domains with 3 mailboxes each. This gives you 6-9 sending identities to rotate across, reducing the load on any single domain. Use .com, .co, or .io variants of your brand name. Never send cold email from your primary business domain." },
      { question: "What is the role of domain rotation in deliverability?", answer: "Domain rotation spreads sending volume across multiple domains so no single domain sends enough to trigger spam filters. If one domain reputation dips, the others continue delivering. This is why enterprise outbound teams use 5-10+ domains even for moderate volumes." },
      { question: "How do I recover a burned email domain?", answer: "Stop all sending from the domain immediately. Wait 2-4 weeks for reputation to stabilise. Restart warmup from scratch with 5-10 emails per day. If the domain was severely flagged, it may be cheaper to start fresh with a new domain than to rehabilitate the old one." },
    ],
  },

  // ─── COLD EMAIL TACTICS (1 post) ───

  "7-cold-email-subject-line-formulas-that-boost-open-rates-2026": {
    short_answer: "The highest-performing cold email subject lines are 36-50 characters, include the prospect's name or company, and reference a specific pain point or signal. Personalised subject lines increase response rates by 30.5% compared to generic alternatives.",
    tags: ["subject lines", "cold email", "open rates", "email copywriting", "A/B testing"],
    faq: [
      { question: "What is the ideal length for a cold email subject line?", answer: "Subject lines between 36-50 characters generate the highest response rates. Longer subject lines (up to 50 characters) see roughly 25% better open rates than very short ones. Keep it long enough to be specific, short enough to display fully on mobile." },
      { question: "Should I use the prospect's name in the subject line?", answer: "Yes. Using the prospect's first name in the subject line increases reply rates to 43.41%. However, over-personalisation can feel intrusive. The best approach combines a name with a relevant signal: 'Quick question about [Company]' outperforms 'Hey [Name]' alone." },
      { question: "Do numbers in subject lines improve cold email performance?", answer: "Yes. Subject lines with numbers show a 113% improvement in open rates. Numbers create specificity and curiosity — 'Scored your GTM 34/100' is more compelling than 'Your GTM needs work' because it implies concrete analysis, not generic outreach." },
      { question: "Should I A/B test subject lines?", answer: "Always. Test angles, not words. 'Quick question' vs 'Scored [Company] out of 100' tests two different psychological hooks (curiosity vs specificity). Send each variant to a minimum of 30 prospects before drawing conclusions. Reply rate, not open rate, is the metric that determines the winner." },
    ],
  },

  // ─── BUILD IN PUBLIC (2 posts) ───

  "business-functions-need-automation-2026": {
    short_answer: "The business functions that benefit most from automation in 2026 are lead qualification, email outreach sequences, data enrichment, reporting, and customer onboarding. Marketing automation delivers the highest ROI for B2B service companies.",
    tags: ["business automation", "marketing automation", "B2B operations", "workflow automation", "AI tools"],
    faq: [
      { question: "Which business functions should be automated first?", answer: "Start with high-volume, rule-based tasks: email sequences, lead scoring, data entry, and reporting. These have the highest time-savings-to-implementation-cost ratio. Automate outreach infrastructure before creative tasks — the system should handle scheduling, sending, and tracking while humans handle strategy and relationship-building." },
      { question: "What is the ROI of marketing automation for small businesses?", answer: "Companies using marketing automation see an average 14.5% increase in sales productivity and 12.2% reduction in marketing overhead. For small B2B service businesses, the biggest ROI comes from automating lead follow-up — most leads are lost to slow response times, not bad offers." },
      { question: "Can AI replace marketing automation?", answer: "AI complements automation rather than replacing it. Automation handles the mechanical execution (sending emails, updating CRM records, triggering workflows). AI handles the intelligence layer (writing personalised copy, scoring intent signals, prioritising leads). The combination is more powerful than either alone." },
    ],
  },

  "claude-code-memory-system": {
    short_answer: "Claude Code's memory system uses CLAUDE.md files and auto-memory to persist instructions, learnings, and patterns across conversations. A 4-layer approach (project rules, user preferences, feedback, and learnings) gives the AI persistent context without re-explaining.",
    tags: ["Claude Code", "AI memory", "CLAUDE.md", "AI productivity", "developer tools"],
    faq: [
      { question: "How do I make Claude Code remember things between sessions?", answer: "Claude Code reads CLAUDE.md files from your project root at the start of every conversation. Write your coding standards, architecture decisions, preferred libraries, and project context into this file. Claude Code also builds auto-memory by saving learnings about your codebase as it works." },
      { question: "What is the CLAUDE.md file?", answer: "CLAUDE.md is a markdown file in your project root that Claude Code reads automatically at the start of every session. It serves as persistent instructions — coding standards, architecture decisions, preferred patterns, and project-specific rules. Think of it as a briefing document for your AI assistant." },
      { question: "What is the difference between CLAUDE.md and auto-memory?", answer: "CLAUDE.md is manually written by you — it contains explicit instructions and project rules. Auto-memory is written by Claude Code itself — it stores things it learns while working, like build commands, test patterns, and debugging insights. Both persist across sessions but serve different purposes." },
      { question: "How do I set up a 4-layer memory system in Claude Code?", answer: "Layer 1: Project rules in CLAUDE.md (coding standards, architecture). Layer 2: User preferences in user memory (your personal patterns and style). Layer 3: Feedback memory (corrections and guidance you give). Layer 4: Learnings (patterns the AI discovers). Each layer is a separate file in the .claude/ directory." },
    ],
  },
};

async function populate() {
  let updated = 0;
  let errors = 0;

  for (const [slug, data] of Object.entries(postData)) {
    const { error } = await sb
      .from("posts")
      .update({
        short_answer: data.short_answer,
        tags: data.tags,
        faq: data.faq,
      })
      .eq("slug", slug);

    if (error) {
      console.log("ERROR: " + slug + " — " + error.message);
      errors++;
    } else {
      console.log("OK: " + slug + " (" + data.faq.length + " FAQs, " + data.tags.length + " tags)");
      updated++;
    }
  }

  console.log("\nDone. Updated: " + updated + ", Errors: " + errors);
}

populate().catch(console.error);
