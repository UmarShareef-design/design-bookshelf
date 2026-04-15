/**
 * JSON-LD Structured Data for "Hooked by Nir Eyal" Book Review Article
 * 
 * Schemas included:
 * 1. Review + Book (nested) — For rich review snippets in Google
 * 2. FAQPage — For FAQ rich results and AI citation
 * 3. Article — For article rich results and Google News
 * 
 * Usage in Astro:
 *   import { reviewSchema, faqSchema, articleSchema } from '../schemas/hooked-review-schemas';
 *   <script type="application/ld+json" set:html={JSON.stringify(reviewSchema)} />
 *   <script type="application/ld+json" set:html={JSON.stringify(faqSchema)} />
 *   <script type="application/ld+json" set:html={JSON.stringify(articleSchema)} />
 */

const baseUrl = "https://uxbooks.in";
const articleUrl = `${baseUrl}/hooked-book-review`;
const articleImage = `${baseUrl}/hooked-review-og.png`;
const datePublished = "2025-01-15"; // TODO: Update to actual publish date
const dateModified = "2025-01-15"; // TODO: Update when content changes

// TODO: Update placeholder social URLs below with actual profiles

// ─────────────────────────────────────────────
// 1. REVIEW + BOOK SCHEMA (nested)
// ─────────────────────────────────────────────
export const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Review",
  "name": "Should You Buy Hooked by Nir Eyal? — Honest Review 2025",
  "description": "Comprehensive buyer's guide and review of Hooked: How to Build Habit-Forming Products by Nir Eyal. Covers the Hook Model, ethics, writing quality, alternatives, and whether the book is worth buying.",
  "url": articleUrl,
  "datePublished": datePublished,
  "dateModified": dateModified,
  "inLanguage": "en",
  "author": {
    "@type": "Person",
    "name": "Umar Shareef",
    "url": baseUrl,
    "jobTitle": "UX Designer & Book Reviewer",
    "sameAs": [
      // TODO: Replace with actual social profile URLs
      "https://twitter.com/umarshareef",
      "https://linkedin.com/in/umarshareef"
    ]
  },
  "publisher": {
    "@type": "Organization",
    "name": "UI/UX Design Bookshelf",
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/favicon.svg`
    }
  },
  "itemReviewed": {
    "@id": "#hooked-book",
    "@type": "Book",
    "name": "Hooked: How to Build Habit-Forming Products",
    "author": {
      "@id": "#nir-eyal",
      "@type": "Person",
      "name": "Nir Eyal",
      "url": "https://www.nirandfar.com",
      "jobTitle": "Behavioral Designer & Author",
      "alumniOf": {
        "@type": "Organization",
        "name": "Stanford University"
      }
    },
    "isbn": "978-0241184837",
    "bookFormat": "https://schema.org/Paperback",
    "numberOfPages": 256,
    "datePublished": "2014-11-04",
    "publisher": {
      "@type": "Organization",
      "name": "Portfolio / Penguin",
      "url": "https://www.penguin.co.uk/portfolio"
    },
    "genre": "Product Design",
    "inLanguage": "en",
    "description": "A practical guide to building products that form user habits, presenting the four-step Hook Model: Trigger, Action, Variable Reward, and Investment.",
    "image": `${baseUrl}/hooked-book-cover.jpg`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "3.86",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": 30000,
      "reviewCount": 2500
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.amazon.in/Hooked-Build-Habit-Forming-Products/dp/0241184835",
      "priceCurrency": "INR",
      "price": "299",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Amazon India"
      }
    }
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "3.5",
    "bestRating": "5",
    "worstRating": "1",
    "description": "Essential reading for product builders, but summaries suffice if you only need the framework concept. The Hook Model is timeless, though examples are dated."
  },
  "reviewBody": "Hooked by Nir Eyal presents the Hook Model — a four-step cyclical process (Trigger, Action, Variable Reward, Investment) for building habit-forming products. The framework is practical and immediately actionable, especially for B2C product managers and designers. However, the book's examples (FarmVille, early Pinterest) feel dated in 2025, the content could be denser — some readers find it repetitive, and those seeking deep behavioral science should look elsewhere. For product builders who don't yet know the Hook Model, this book is essential. For everyone else, a thorough summary may suffice."
};

// ─────────────────────────────────────────────
// 2. FAQPAGE SCHEMA
// ─────────────────────────────────────────────
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is Hooked by Nir Eyal worth reading in 2025?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, the Hook Model framework is timeless — the psychology of triggers, variable rewards, and user investment remains valid. However, the tech examples (FarmVille, early Twitter) are dated. Replace them mentally with TikTok and modern apps and the book works perfectly. If you build consumer products, it's essential reading."
      }
    },
    {
      "@type": "Question",
      "name": "Is Hooked a manipulation manual?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No — Nir Eyal includes the Manipulation Matrix and Regret Test as ethical frameworks to ensure designers build products that improve users' lives. He distinguishes between persuasion (helping users do what they already want) and coercion (forcing unwanted behavior). Critics argue the ethics section is insufficient, but the book explicitly addresses the concern."
      }
    },
    {
      "@type": "Question",
      "name": "Can I just read a summary of Hooked instead of the full book?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It depends on your goal. If you only want to understand the Hook Model concept (Trigger, Action, Variable Reward, Investment), a good summary is sufficient. If you want to actually build a habit-forming product, you need the full book for its Habit Testing methodology, chapter exercises, and detailed case studies that show how to apply the model in practice."
      }
    },
    {
      "@type": "Question",
      "name": "Is Hooked better than Atomic Habits?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "They serve different purposes. Hooked is for designing habits in OTHERS (your product users). Atomic Habits by James Clear is for building habits in YOURSELF (personal improvement). If you're a product builder, read Hooked first. If you want self-improvement, read Atomic Habits. For a complete picture, read both."
      }
    },
    {
      "@type": "Question",
      "name": "How long does Hooked take to read?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Hooked is approximately 256 pages and takes about 3 hours to read at average speed. It's intentionally concise — the audiobook runs about 5 hours. The book is a quick, accessible read with a conversational tone."
      }
    },
    {
      "@type": "Question",
      "name": "What is the Hook Model?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Hook Model is a four-step cyclical process for building habit-forming products: 1) Trigger - an external or internal cue that prompts action, 2) Action - the simplest behavior in anticipation of a reward, 3) Variable Reward - an unpredictable reward that creates craving and engagement, 4) Investment - user effort that increases product value and loads the next trigger. This cycle repeats until the behavior becomes automatic."
      }
    },
    {
      "@type": "Question",
      "name": "Is Hooked by Nir Eyal outdated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The framework is NOT outdated — the neuroscience of dopamine, variable rewards, and habit loops is well-established and unchanged since 2014. The EXAMPLES are dated (FarmVille, early Pinterest UI, pre-acquisition Instagram). The underlying psychology holds up perfectly. Nir Eyal himself updated his thinking in his 2019 follow-up book Indistractable, which addresses the other side of habit-forming technology."
      }
    },
    {
      "@type": "Question",
      "name": "Who should skip Hooked?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Skip Hooked if: you're looking to break your own bad habits (read Indistractable instead), you work in B2B enterprise SaaS (the model is less applicable), you already understand the Hook Model from summaries, you want deep academic behavioral science (read The Power of Habit instead), or you want personal habit formation (read Atomic Habits instead)."
      }
    }
  ]
};

// ─────────────────────────────────────────────
// 3. ARTICLE SCHEMA
// ─────────────────────────────────────────────
export const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Should You Buy Hooked by Nir Eyal? (Honest Review 2025)",
  "alternativeHeadline": "Hooked Book Review: Is It Worth Your Money and Time?",
  "description": "Comprehensive buyer's guide to Hooked: How to Build Habit-Forming Products by Nir Eyal. Covers the Hook Model, writing quality, ethical concerns, comparisons with Atomic Habits and Power of Habit, and a clear buy/skip recommendation.",
  "image": articleImage,
  "datePublished": datePublished,
  "dateModified": dateModified,
  "inLanguage": "en",
  "url": articleUrl,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": articleUrl
  },
  "author": {
    "@type": "Person",
    "name": "Umar Shareef",
    "url": baseUrl,
    "jobTitle": "UX Designer & Book Reviewer",
    "sameAs": [
      // TODO: Replace with actual social profile URLs
      "https://twitter.com/umarshareef",
      "https://linkedin.com/in/umarshareef"
    ]
  },
  "publisher": {
    "@type": "Organization",
    "name": "UI/UX Design Bookshelf",
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/favicon.svg`
    }
  },
  "keywords": [
    "Hooked book review",
    "Hooked Nir Eyal summary",
    "Should I buy Hooked",
    "Hook Model explained",
    "habit-forming products book",
    "Hooked vs Atomic Habits",
    "Nir Eyal book review 2025",
    "Hooked how to build habit-forming products summary",
    "product design books",
    "UX design books"
  ],
  "wordCount": 2500, // TODO: Update to actual word count when article is written
  "articleSection": "Book Review",
  "about": {
    "@id": "#hooked-book",
    "@type": "Book",
    "name": "Hooked: How to Build Habit-Forming Products",
    "author": {
      "@id": "#nir-eyal"
    }
  },
  "citation": [
    {
      "@type": "CreativeWork",
      "name": "Hooked — Goodreads",
      "url": "https://www.goodreads.com/book/show/22665519-hooked"
    },
    {
      "@type": "CreativeWork",
      "name": "Hooked — Nir Eyal Official Site",
      "url": "https://www.nirandfar.com/hooked/"
    },
    {
      "@type": "CreativeWork",
      "name": "Hooked — Amazon India",
      "url": "https://www.amazon.in/Hooked-Build-Habit-Forming-Products/dp/0241184835"
    }
  ],
  "mentions": [
    {
      "@type": "Thing",
      "name": "Hook Model",
      "description": "A four-step cyclical process for building habit-forming products: Trigger, Action, Variable Reward, Investment"
    },
    {
      "@type": "Book",
      "name": "Atomic Habits",
      "author": { "@type": "Person", "name": "James Clear" }
    },
    {
      "@type": "Book",
      "name": "Indistractable",
      "author": { "@type": "Person", "name": "Nir Eyal" }
    }
  ]
};

// ─────────────────────────────────────────────
// 4. BREADCRUMBLIST SCHEMA (Home → Book Reviews → Hooked Review)
// ─────────────────────────────────────────────
export const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": baseUrl
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Book Reviews",
      "item": `${baseUrl}/book-reviews`
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Hooked by Nir Eyal — Review",
      "item": articleUrl
    }
  ]
};

// ─────────────────────────────────────────────
// 5. COMBINED SCHEMA (single @graph block)
// Use this if you prefer ONE script tag instead of three
// Removes redundant @context from each item since the top-level @context applies
// ─────────────────────────────────────────────
const { "@context": _rc, ...reviewNoContext } = reviewSchema;
const { "@context": _fc, ...faqNoContext } = faqSchema;
const { "@context": _ac, ...articleNoContext } = articleSchema;
const { "@context": _bc, ...breadcrumbNoContext } = breadcrumbSchema;

export const combinedSchema = {
  "@context": "https://schema.org",
  "@graph": [
    reviewNoContext,
    faqNoContext,
    articleNoContext,
    breadcrumbNoContext
  ]
};

// Export all schemas as a single object for convenience
export default {
  reviewSchema,
  faqSchema,
  articleSchema,
  breadcrumbSchema,
  combinedSchema
};
