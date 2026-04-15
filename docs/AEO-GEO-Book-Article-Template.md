# 🏆 AEO/GEO Book Article Template — Universal 10/10 Blueprint

> **Purpose:** Step-by-step instructions to write a 10/10 AEO/GEO-optimized article for **any book**, targeting the search intent *"[Book Title] summary"* and serving the audience of people deciding whether to buy the book.

---

## 📋 Required Variables

Before writing, fill in these placeholders:

| Variable | Description | Example |
|---|---|---|
| `{{TITLE}}` | Full book title | *Hooked: How to Build Habit-Forming Products* |
| `{{AUTHOR}}` | Author full name | Nir Eyal |
| `{{YEAR}}` | Original publication year | 2014 |
| `{{GENRE}}` | Primary category | Product Design / Business |
| `{{PAGES}}` | Page count | 256 |
| `{{READING_TIME}}` | Estimated reading time | ~3 hours |
| `{{CORE_THEME}}` | The book's central concept/framework | The Hook Model |
| `{{RATING_OUT_OF_5}}` | Your rating on a 5-point scale | 3.5 |
| `{{PRICE}}` | Current approximate price (number only for schema) | 350 |
| `{{ISBN}}` | ISBN-13 | 978-0241184834 |
| `{{PUBLISHER}}` | Publisher name | Portfolio/Penguin |
| `{{CURRENT_YEAR}}` | Year article is published | 2025 |
| `{{SITE_URL}}` | Your website base URL | https://uxbooks.in |
| `{{AUTHOR_BIO}}` | Article author name & credentials | Umar Shareef, UX Designer & Book Reviewer |
| `{{AUTHOR_BIO_NAME}}` | Article author's full name (for schema) | Umar Shareef |
| `{{AUTHOR_BIO_ROLE}}` | Article author's job title (for schema) | UX Designer & Book Reviewer |
| `{{VERDICT}}` | BUY / SKIP / SKIM | BUY |
| `{{SLUG}}` | Article URL slug | hooked-book-review |
| `{{PUBLISH_DATE}}` | Article publish date (ISO format) | 2025-01-15 |
| `{{MODIFY_DATE}}` | Article last modified date (ISO format) | 2025-01-15 |
| `{{SITE_NAME}}` | Website/publication name | UI/UX Design Bookshelf |
| `{{SOCIAL_URL_1}}` | Author's primary social profile | https://twitter.com/umarshareef |
| `{{SOCIAL_URL_2}}` | Author's secondary social profile | https://linkedin.com/in/umarshareef |
| `{{AUTHOR_WEBSITE}}` | Book author's official website | https://www.nirandfar.com |
| `{{GOODREADS_RATING}}` | Average Goodreads rating (out of 5) | 3.86 |
| `{{GOODREADS_RATING_COUNT}}` | Number of Goodreads ratings (integer) | 30000 |
| `{{GOODREADS_REVIEW_COUNT}}` | Number of Goodreads text reviews (integer) | 2500 |
| `{{GOODREADS_URL}}` | Direct URL to book's Goodreads page | https://goodreads.com/book/show/... |
| `{{PURCHASE_URL}}` | Direct URL to buy the book | https://www.amazon.in/... |
| `{{CURRENCY}}` | Price currency code | INR |
| `{{GENRE_SLUG}}` | URL-safe genre slug | product-design-books |
| `{{OG_IMAGE}}` | Open Graph image filename | hooked-review-og.png |
| `{{ARTICLE_META_DESCRIPTION}}` | Meta description (under 155 chars, includes "Summary" + "Review" + title) | Hooked by Nir Eyal summary and review — should you buy it? Covers the Hook Model, ethics, alternatives, and whether summaries suffice. |
| `{{ONE_LINE_REVIEW_SUMMARY}}` | One-line summary for reviewRating schema | Essential for product builders, but summaries suffice if you only need the framework. |
| `{{FULL_REVIEW_SUMMARY_200_WORDS}}` | 200-word review body for schema | Hooked by Nir Eyal presents the Hook Model... |
| `{{WORD_COUNT}}` | Total word count of the published article (integer, updated after writing) | 2500 |

---

## 🌐 Global AEO/GEO Style Rules

These rules apply to **every sentence** in the article. Violate any one and you lose citation potential.

### 1. Entity Consistency
- **Always** refer to the book as **"`{{TITLE}}` by `{{AUTHOR}}`"** on first use in every major section.
- After first use in a section, refer to it as "`{{TITLE}}`" or "the book" — never just "it" or "this book" in H2/H3 contexts.

### 2. Entity Bolding
- **Bold** all proprietary terms, framework names, and key concepts from the book.
- Example: The **Hook Model**, **Variable Reward**, **Manipulation Matrix**, **Habit Zone**.
- This helps LLMs confidently map entities to the specific book/author.

### 3. Literal Headings — Zero Cleverness
- **NEVER** use metaphors, nicknames, or clever labels in headings (H1–H4).
- AI engines match headings to natural language queries. Nobody searches *"Hooked book meat test"*.
- ❌ "The Meat Test" → ✅ "Is Reading a Summary of Hooked Enough?"
- ❌ "The 2014 Test" → ✅ "Is Hooked Outdated in 2025?"

### 4. Question-Based Headings (H2/H3)
- Write all H2 and H3 headings as **natural language questions** that people actually search.
- This is the single highest-impact AEO technique — AI engines parse H2/H3 to match against user queries.
- ❌ "Alternatives" → ✅ "How Does `{{TITLE}}` Compare to Similar Books?"
- ❌ "Writing Quality" → ✅ "Is `{{TITLE}}` Well-Written or a Boring Read?"

### 5. Inverted Pyramid (BLUF — Bottom Line Up Front)
- Answer the heading's question in the **first 1–2 sentences** beneath it.
- Then elaborate. Never build up to the answer.
- AI engines extract the first sentence under a heading as the "answer" — make it count.

### 6. High-Information Density in Direct Answers
- The first sentence under any heading must contain **facts, definitions, or data** — not fluff or opinions.
- ❌ "This is an interesting question many people ask." → ✅ "`{{TITLE}}` by `{{AUTHOR}}` presents a 4-step framework called the **Hook Model** for building habit-forming products."

### 7. Statistics & Verifiable Data
- Include **at least 3 verifiable statistics** in the article (Princeton GEO research shows stats increase AI citation by up to 40%).
- Goodreads rating + count, Amazon rating + count, sales figures, pages, reading time, publication data.
- Always cite the source of the statistic.

### 8. Direct Quotations
- Include **at least 2 direct quotes minimum** from the book (blockquotes with attribution). In the Deep Summary section, aim for **1 quote per H3** for maximum AI citation.
- Include **at least 1 quote** from an external expert or authoritative review.
- AI engines prioritize content with cited quotations over paraphrased content.

### 9. External Authoritative Citations
- Link to **at least 5 authoritative external sources** (author's website, publisher, academic papers, major publications, Goodreads).
- Outbound links to high-authority domains increase your article's perceived trustworthiness for AI citation.

### 10. Consistent Formatting
- Use bullet lists, comparison tables, and numbered lists throughout.
- AI engines extract structured content more reliably than prose paragraphs.

---

## 📝 Article Structure & Section-by-Section Instructions

---

### H1: `{{TITLE}}` Summary and Review: Should You Buy It in `{{CURRENT_YEAR}}`?

**Critical:** The H1 **must** include the word **"Summary"** — this matches the primary search intent ("[book title] summary"). Without it, AI engines will not cite your article for summary queries.

**Beneath H1, include:**
- A 2-sentence overarching premise of the book
- An E-E-A-T author byline: *"By `{{AUTHOR_BIO}}`"*
- Last updated date
- Estimated reading time of the article itself

---

### H2: TL;DR — The Verdict on `{{TITLE}}` by `{{AUTHOR}}`

**Purpose:** Answer the reader's #1 question ("Should I buy this?") before they scroll.

**Instructions:**
1. Start with a bolded one-word verdict: **`{{VERDICT}}`** (BUY / SKIP / SKIM)
2. Your rating: **`{{RATING_OUT_OF_5}}`/5**
3. Three bullet points explaining *why* (1 strength, 1 weakness, 1 audience qualifier)
4. Quick stats line: *"`{{PAGES}}` pages · `{{READING_TIME}}` reading time · Published `{{YEAR}}`"*
5. One-line author credential (e.g., *"Nir Eyal is a Stanford lecturer and behavioral designer"*)

**AEO impact:** This section alone can be cited by Perplexity/SGE for "Should I read [book]?" queries.

---

### H2: Top 5 Key Takeaways from `{{TITLE}}`

**Purpose:** AI engines love extracting pre-packaged bullet lists. This is one of the highest-impact AEO patterns.

**Instructions:**
1. Exactly 5 bullets (not 4, not 6 — consistency aids extraction)
2. Each bullet: Bold the core entity/concept, then explain in one sentence
3. At least 1 bullet must include a compelling statistic or data point from the book
4. Order from most important to least important

**Example format:**
```
1. **[Core Concept 1]**: One-sentence explanation with a key insight
2. **[Core Concept 2]**: One-sentence explanation
3. **[Core Concept 3]**: One-sentence explanation with a statistic
4. **[Core Concept 4]**: One-sentence explanation
5. **[Core Concept 5]**: One-sentence explanation
```

**AEO impact:** Perplexity and Google SGE frequently cite "key takeaways" lists verbatim.

---

### H2: Who Should Read `{{TITLE}}`, and Who Should Skip It?

**Purpose:** Filter the audience perfectly so no one wastes money on a mismatched book. The #1 reason people regret purchases is *mismatch*, not quality.

**Instructions:**
1. Create two columns/sections: **✅ Read If You Are...** and **❌ Skip If You Are...**
2. Each entry links a target demographic to a *specific problem the book solves* (or doesn't)
3. Include at least 4 entries per column
4. Be specific — not "people who like business" but "B2C product managers designing for daily engagement"

**Template:**

| ✅ Read If You Are... | ❌ Skip If You Are... |
|---|---|
| [Specific role] seeking [specific outcome] | [Specific role] needing [different outcome] |
| [Another role] wanting [specific skill] | [Another role] looking for [alternative approach] |

---

### H2: Deep Summary: What Are the Core Concepts of `{{TITLE}}`?

**Purpose:** Serve the PRIMARY search intent — "summary." This must be the **longest and most detailed section** of the article. Without it, AI engines won't cite you for summary queries.

**Instructions:**
1. Start with a 2-sentence overview of the book's core thesis/framework
2. Break the core theme into **distinct phases/ideas/chapters**, each as an H3
3. Each H3 must be a **natural language question**

**For Non-Fiction (framework/concept books):**
- Create one H3 per major concept/step in the framework
- Include a direct quote from the book in each H3 section (blockquote + page reference if possible)
- Include a real-world example for each concept (preferably 1 B2C + 1 B2B example)

**For Fiction (novels/stories):**
- Create one H3 per story arc/major theme
- Cover: setup, conflict, climax, resolution
- Include a brief thematic analysis (what the story *means*, not just what *happens*)

**For Self-Help/Personal Development:**
- Create one H3 per major principle/habit
- Include practical application guidance for each

**H3 Template for Non-Fiction:**
```
### What Is [Concept/Step Name] in `{{TITLE}}`?

[2-sentence direct answer]

> "[Direct quote from the book]" — `{{AUTHOR}}`, `{{TITLE}}`, p. [XX]

[1-2 paragraph explanation]

[Real-world example — B2C]
[Real-world example — B2B or non-tech, if applicable]
```

**AEO impact:** Granular H3s matching specific queries ("What is variable reward in Hooked?") is the #1 driver of AI citation for long-tail queries.

---

### H2: Is Reading a Summary of `{{TITLE}}` Enough, or Do You Need the Full Book?

**Purpose:** Answer the reader's **silent #1 question**: *"Now that I know the concepts, do I still need to buy it?"* No existing article explicitly answers this — it's the single biggest gap across all book summaries online.

**Instructions:**
1. Give a direct YES/NO answer in the first sentence
2. List **what the full book gives you that summaries don't**:
   - Storytelling and narrative build-up
   - Detailed case studies with step-by-step analysis
   - Practical exercises and worksheets
   - Chapter-end action items
   - Nuanced arguments and counterarguments
3. List **what summaries capture adequately**:
   - The core framework/concept
   - Key definitions
   - Major examples
4. Final verdict: *"If you only want [X], a summary suffices. If you need [Y], buy the full book."*

**AEO impact:** This directly answers "Can I just read a summary of [book]?" — a high-volume long-tail query.

---

### H2: Is `{{TITLE}}` Well-Written or a Boring Read?

**Purpose:** Readers are buying a 3–5 hour *experience*. They need to know if it's a chore or a pleasure before committing. No existing article evaluates writing quality.

**Instructions:**
1. Evaluate the prose style in 2–3 sentences (e.g., "breezy but repetitive," "dense and academic," "conversational and fast-paced")
2. Include **2–3 short sample passages** as blockquotes (unedited, with page numbers) so the reader can judge for themselves
3. Rate readability: *"Accessible to [audience level]"* or *"Requires [background knowledge]"*
4. Comment on pacing: Does it drag in the middle? Is the ending rushed?

**AEO impact:** Answers "Is [book] an easy read?" — a common secondary query.

---

### H2: Is `{{TITLE}}` Outdated in `{{CURRENT_YEAR}}`?

**Purpose:** Address the relevance concern for any book published 2+ years ago. Readers need assurance their money buys current utility.

**Instructions:**
1. Assess based on `{{YEAR}}` of publication
2. For books with tech examples: Are the specific examples dated (e.g., FarmVille, early Twitter) but the underlying principles still valid?
3. For books with scientific claims: Has newer research confirmed or contradicted the findings?
4. For timeless/philosophical books: Does the core thesis endure regardless of era?
5. Cite **at least 1 external, authoritative source** proving or disproving ongoing validity (academic journal, modern data, author's updated edition, etc.)
6. Verdict: *"The examples feel dated, but the psychology is timeless"* OR *"This book's advice has been superseded by [newer work]"*

**AEO impact:** Directly answers "Is [book] still relevant?" — a growing query as AI engines emphasize recency.

---

### H2: How Does `{{TITLE}}` Compare to Similar Books?

**Purpose:** Gives readers clear lateral options in case the book isn't exactly what they need. Comparison tables are among the most-cited content formats by AI engines.

**Instructions:**
1. Select **2–3 direct category competitors** (books that serve the same audience/problem)
2. Create a **comparison table** with columns:

| Book | Core Focus | Best For | Limitation | Rating |
|---|---|---|---|---|
| `{{TITLE}}` | [1-line focus] | [1-line audience] | [1-line weakness] | `{{RATING_OUT_OF_5}}`/5 |
| [Alternative 1] | [1-line focus] | [1-line audience] | [1-line weakness] | [X]/5 |
| [Alternative 2] | [1-line focus] | [1-line audience] | [1-line weakness] | [X]/5 |

3. After the table, write **1 sentence per alternative** explaining when to choose it over `{{TITLE}}`

**AEO impact:** Comparison tables are extracted verbatim by AI engines for "Hooked vs Atomic Habits" style queries.

---

### H2: What Do Critics and Fans Say About `{{TITLE}}`?

**Purpose:** Remove reviewer bias by providing a holistic, trustworthy view. Readers trust articles that present both sides.

**Instructions:**
1. **What Fans Say (5-star perspective):** 3 bullets of the most common praises (from Goodreads/Amazon reviews)
2. **What Critics Say (1–2 star perspective):** 3 bullets of the most common criticisms
3. **The Ethical/Academic Debate** (if applicable): Address any major controversy, ethical concern, or academic criticism of the book
4. **Goodreads data:** "3.86/5 from 30,000+ ratings" — verifiable, schema-compatible statistic

**AEO impact:** "Is [book] worth reading?" queries are best answered by consensus, not single opinions.

---

### H2: Frequently Asked Questions About `{{TITLE}}`

**Purpose:** FAQ sections are the #1 rich result format for Google and are heavily cited by AI engines. Each Q&A pair is a standalone citable unit.

**Instructions:**
1. Write **exactly 8 questions** in natural language (matching how people actually ask)
2. Each answer: **2 sentences maximum** — concise, factual, high-information density
3. Questions must cover different query clusters:

**Required FAQ questions (adapt to book):**
1. *What is `{{TITLE}}` by `{{AUTHOR}}` about?* → One-sentence thesis
2. *How many pages is `{{TITLE}}`?* → Exact page count + reading time
3. *What is the main idea of `{{TITLE}}`?* → Core framework/concept name + one-line explanation
4. *Is `{{TITLE}}` worth reading in `{{CURRENT_YEAR}}`?* → Direct yes/no + one reason
5. *Who is `{{AUTHOR}}`?* → 1-sentence bio with key credential
6. *What books are similar to `{{TITLE}}`?* → Name 2–3 alternatives
7. *Can I just read a summary of `{{TITLE}}`?* → Direct answer + caveat
8. *Is `{{TITLE}}` an easy read?* → Reading level + approximate time

4. **Requires FAQPage JSON-LD schema** (see Schema section below)

**AEO impact:** FAQ rich results appear directly in Google SERPs and are the most frequently cited format by Perplexity.

---

### H2: Which Book Should You Actually Buy?

**Purpose:** Convert the analysis into immediate, confident action. Flowcharts/decision trees are highly extractable by AI.

**Instructions:**
1. Create a **text-based decision flowchart** (works for both humans and AI — visual flowcharts can't be scraped)
2. Format as conditional logic:
   ```
   IF you want to [specific goal] AND you are [specific audience] → BUY {{TITLE}}
   IF you want to [specific goal] BUT you need [deeper/different approach] → BUY [Alternative 1]
   IF you only want to [surface-level goal] → READ A SUMMARY (link to best free summary)
   IF you want to [different goal entirely] → BUY [Alternative 2]
   ```
3. Include buy links (Amazon, Flipkart, etc.) and a link to the best free summary
4. Add a 1-sentence **"My pick"** recommendation for the author's personal choice

**AEO impact:** Decision trees are extracted as structured recommendations by AI engines for "Which [genre] book should I buy?" queries.

---

## 🔧 JSON-LD Schema Instructions (For Developers/CMS)

Generate valid JSON-LD `<script type="application/ld+json">` blocks for **all 4 schemas**. Use individual script tags OR a single combined `@graph` block.

### 1. Review + Book Schema (Nested)

```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "name": "Should You Buy {{TITLE}} by {{AUTHOR}}? — Honest Review {{CURRENT_YEAR}}",
  "description": "Comprehensive buyer's guide and review of {{TITLE}} by {{AUTHOR}}. Covers core concepts, writing quality, alternatives, and whether the book is worth buying.",
  "url": "{{SITE_URL}}/{{SLUG}}",
  "datePublished": "{{PUBLISH_DATE}}",
  "dateModified": "{{MODIFY_DATE}}",
  "inLanguage": "en",
  "author": {
    "@id": "#article-author",
    "@type": "Person",
    "name": "{{AUTHOR_BIO_NAME}}",
    "url": "{{SITE_URL}}",
    "jobTitle": "{{AUTHOR_BIO_ROLE}}",
    "sameAs": ["{{SOCIAL_URL_1}}", "{{SOCIAL_URL_2}}"]
  },
  "publisher": {
    "@type": "Organization",
    "name": "{{SITE_NAME}}",
    "url": "{{SITE_URL}}",
    "logo": {
      "@type": "ImageObject",
      "url": "{{SITE_URL}}/favicon.svg"
    }
  },
  "itemReviewed": {
    "@id": "#reviewed-book",
    "@type": "Book",
    "name": "{{TITLE}}",
    "author": {
      "@id": "#book-author",
      "@type": "Person",
      "name": "{{AUTHOR}}",
      "url": "{{AUTHOR_WEBSITE}}"
    },
    "isbn": "{{ISBN}}",
    "bookFormat": "https://schema.org/Paperback",
    "numberOfPages": {{PAGES}},
    "datePublished": "{{YEAR}}",
    "publisher": {
      "@type": "Organization",
      "name": "{{PUBLISHER}}"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "{{GOODREADS_RATING}}",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": {{GOODREADS_RATING_COUNT}},
      "reviewCount": {{GOODREADS_REVIEW_COUNT}}
    },
    "offers": {
      "@type": "Offer",
      "url": "{{PURCHASE_URL}}",
      "priceCurrency": "{{CURRENCY}}",
      "price": "{{PRICE}}",
      "availability": "https://schema.org/InStock"
    }
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "{{RATING_OUT_OF_5}}",
    "bestRating": "5",
    "worstRating": "1",
    "description": "{{ONE_LINE_REVIEW_SUMMARY}}"
  },
  "reviewBody": "{{FULL_REVIEW_SUMMARY_200_WORDS}}"
}
```

**Rules:**
- Use **5-point rating scale** (Google renders review stars reliably only on 5-point)
- `ratingCount` and `reviewCount` must be **integers** (not strings)
- Use `@id` references for shared entities (book author, article author) to enable deduplication in `@graph`

### 2. FAQPage Schema

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "{{FAQ_Q1}}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{FAQ_A1}}"
      }
    }
    // ... repeat for all 8 questions
  ]
}
```

**Rules:**
- Questions and answers must **exactly match** the visible FAQ section text
- Answers must be plain text (no HTML, no unicode arrows — use ASCII only)
- Keep answers under 2 sentences for maximum AI extraction reliability

### 3. Article Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{{TITLE}} Summary and Review: Should You Buy It in {{CURRENT_YEAR}}?",
  "description": "{{ARTICLE_META_DESCRIPTION}}",
  "url": "{{SITE_URL}}/{{SLUG}}",
  "datePublished": "{{PUBLISH_DATE}}",
  "dateModified": "{{MODIFY_DATE}}",
  "inLanguage": "en",
  "author": { "@id": "#article-author" },
  "publisher": {
    "@type": "Organization",
    "name": "{{SITE_NAME}}",
    "url": "{{SITE_URL}}",
    "logo": { "@type": "ImageObject", "url": "{{SITE_URL}}/favicon.svg" }
  },
  "image": "{{SITE_URL}}/{{OG_IMAGE}}",
  "wordCount": {{WORD_COUNT}},
  "articleSection": "Book Review",
  "about": { "@id": "#reviewed-book" },
  "mentions": [
    { "@type": "Thing", "name": "{{CORE_THEME}}" },
    { "@type": "Thing", "name": "{{AUTHOR}}" }
  ],
  "citation": [
    { "@type": "CreativeWork", "name": "Goodreads", "url": "{{GOODREADS_URL}}" },
    { "@type": "CreativeWork", "name": "{{AUTHOR}} Official Site", "url": "{{AUTHOR_WEBSITE}}" },
    { "@type": "CreativeWork", "name": "Amazon", "url": "{{PURCHASE_URL}}" }
  ]
}
```

**Rules:**
- `citation` must use `CreativeWork` objects (not bare URLs)
- Use `mentions` (not `speaksAbout` — not a valid schema.org property)
- `wordCount` must be an integer, updated after the article is written

### 4. BreadcrumbList Schema

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "{{SITE_URL}}"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "{{GENRE}} Book Reviews",
      "item": "{{SITE_URL}}/{{GENRE_SLUG}}"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "{{TITLE}} by {{AUTHOR}} — Review",
      "item": "{{SITE_URL}}/{{SLUG}}"
    }
  ]
}
```

### Combined @Graph (Single Script Tag)

If using a single `<script>` tag instead of 4 separate ones:

```js
// Strip @context from each individual schema (top-level @context applies to all)
const { "@context": _r, ...reviewNoContext } = reviewSchema;
const { "@context": _f, ...faqNoContext } = faqSchema;
const { "@context": _a, ...articleNoContext } = articleSchema;
const { "@context": _b, ...breadcrumbNoContext } = breadcrumbSchema;

export const combinedSchema = {
  "@context": "https://schema.org",
  "@graph": [reviewNoContext, faqNoContext, articleNoContext, breadcrumbNoContext]
};
```

**Rules:**
- Remove redundant `@context` from each item in `@graph`
- Use `@id` on shared entities (book, author) and reference with `{ "@id": "#entity" }` to avoid duplication

---

## 🖼️ OG Image & Social Preview Design Spec

The Open Graph image is critical for CTR from social shares and AI engine previews. Design it as follows:

- **Dimensions:** 1200 × 630px (standard OG image ratio)
- **Layout:** Left 40% = book cover image; Right 60% = text overlay
- **Text overlay must include:**
  - Book title (large, bold)
  - Author name
  - Rating badge (e.g., "3.5/5")
  - "Summary & Review" label
  - Your site logo (small, bottom-right corner)
- **Style:** Clean, high-contrast background. Use the book's dominant color as accent.
- **Filename:** `{{OG_IMAGE}}` (e.g., `hooked-review-og.png`)
- **Format:** PNG or WebP, under 1MB for fast loading

> **Tip:** Create a reusable Canva/Figma template with variable slots so you can produce OG images quickly for each book.

---

## 🔄 Edge Cases & Adaptations

### Fiction vs. Non-Fiction

| Element | Non-Fiction | Fiction |
|---|---|---|
| Deep Summary H3s | One per framework step/concept | One per story arc/major theme |
| "Is the Summary Enough?" | Focus on exercises, case studies | Focus on prose quality, emotional arc, subtext |
| Writing Quality | Focus on clarity and depth | Focus on prose beauty, character development |
| "Is It Outdated?" | Focus on scientific accuracy, tech examples | Focus on cultural sensitivity, social norms |
| Alternatives | Books with same framework/goal | Books in same genre/theme |
| Core Takeaways | Actionable principles | Thematic insights |

### Single-Author vs. Multi-Author / Anthology
- For multi-author: List all authors in schema, but feature the primary/editor author in the headline
- For anthologies: H3 per major contributing author/essay

### Very Old Books (10+ years)
- Expand the "Is It Outdated?" section significantly
- Add an "Updated Editions" note if applicable
- Cite 2+ modern sources confirming or updating the book's claims

### Very New Books (< 1 year)
- Reduce the "Is It Outdated?" section — briefly state it's current
- Expand the "What Critics Say" section (fewer reviews exist yet)
- Note if it's a bestseller or award winner

### Academic / Textbook Books
- Add a "Prerequisites" note in the "Who Should Read" section
- Rate difficulty level explicitly
- Compare against standard curriculum alternatives

---

## ✅ Final AEO/GEO Validation Checklist

Before publishing, verify **every** item:

### Content & Structure
- [ ] H1 includes the word **"Summary"** (matches primary search intent)
- [ ] All H2/H3 headings are **natural language questions** (no clever metaphors)
- [ ] Primary intent (summary) is satisfied in the **top 30%** of the page (the Top 5 Takeaways + Deep Summary together fulfill this requirement)
- [ ] Deep Summary section is the **longest section** and appears before the halfway point
- [ ] Every heading's question is **answered in the first 1–2 sentences** beneath it (BLUF)
- [ ] Top 5 Takeaways bullet list exists near the top
- [ ] Deep Summary section has **granular H3s** for each major concept
- [ ] "Is the summary enough?" section exists and gives a direct answer
- [ ] Writing quality section includes **sample passages** (blockquotes)
- [ ] "Is it outdated?" section cites at least **1 external authoritative source**
- [ ] Comparison table exists with **2–3 alternatives**
- [ ] Critics vs. Fans section presents **both sides**
- [ ] FAQ has exactly **8 questions** with 2-sentence answers
- [ ] Decision flowchart/matrix exists at the bottom

### AEO/GEO Optimization
- [ ] All proprietary terms and framework names are **bolded**
- [ ] The exact phrase **"`{{TITLE}}` by `{{AUTHOR}}`"** is used consistently on first mention per section
- [ ] At least **3 verifiable statistics** are included with sources
- [ ] At least **2 direct quotes** from the book are included (blockquotes)
- [ ] At least **1 external expert quotation** is included
- [ ] At least **5 authoritative outbound links** exist
- [ ] E-E-A-T author byline with credentials is visible
- [ ] No unicode symbols in FAQ answers (ASCII-safe for maximum parser compatibility)

### Schema & Technical
- [ ] **Review + Book** JSON-LD schema is present (5-point rating scale)
- [ ] **FAQPage** JSON-LD schema matches visible FAQ text exactly
- [ ] **Article** JSON-LD schema is present with `mentions` and `citation` (CreativeWork objects)
- [ ] **BreadcrumbList** JSON-LD schema is present (3-level: Home → Category → Article)
- [ ] Combined `@graph` strips redundant `@context` from nested items
- [ ] Shared entities use `@id` references (book, author) for deduplication
- [ ] `ratingCount` and `reviewCount` are integers (not strings)
- [ ] All placeholder URLs and dates are updated (no TODOs remaining)
- [ ] Meta description is under 155 characters and includes "Summary" + "Review" + book title
- [ ] **llms.txt** file exists at site root listing key pages (helps AI crawlers discover your content)
- [ ] **OG image** is 1200x630px, includes book cover + title + rating badge + "Summary & Review" text overlay (maximizes CTR from social/AI previews)

### Post-Publish
- [ ] Test with **Google Rich Results Test** (rich-result-test.appspot.com)
- [ ] Test with **Google Search Console** for indexing
- [ ] Submit URL to **Google Indexing API** if available
- [ ] Verify FAQ rich results appear in SERP within 48 hours
- [ ] Check **Perplexity** citation by searching "[book title] summary" and looking for your domain
- [ ] Monitor **click-through rate** in Search Console after 2 weeks

---

## 📊 Scoring Guide

| Score | What It Means | Typical Article |
|---|---|---|
| 10/10 | Perfect AEO/GEO — maximum AI citation potential + best reader experience | This template fully executed |
| 8/10 | Strong content, minor AEO gaps (e.g., missing FAQ schema, clever headings) | Dan Silvestre's Hooked summary |
| 7/10 | Good substance but missing 2-3 key sections (no "is summary enough?", no alternatives) | MeaningfulHQ, Growthabit |
| 6/10 | Decent but surface-level or paywalled | GetStoryShots, Blinkist |
| 5/10 | Adequate intro but no decision-making value | Four Minute Books |
| 3/10 | Barely a summary — catalogue listing | Reversed Digital |
| 1/10 | Thin content, no structure, no insight | AI-generated spam summaries |

---

*Template version 1.0 — Based on analysis of 13 existing articles, Princeton GEO research, AEO best practices, and Gemini deep-thinking review.*
