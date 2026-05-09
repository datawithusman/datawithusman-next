/**
 * BLOG POSTS
 * published: true  → full post page accessible at /blog/[slug]
 * Categories: 'Automation' | 'AI Engineering' | 'Career' | 'Data'
 */
const posts = [
  {
    slug: 'how-i-automated-invoice-work',
    title: 'How I Automated 6 Hours of Invoice Work in a Weekend',
    excerpt: 'A contractor was manually sorting PDFs every Monday morning. Here\'s exactly what I built and how long it took.',
    category: 'Automation',
    readTime: '4 min read',
    date: 'May 2026',
    published: true,
    content: `<p>A friend of mine runs a small construction business. Every Monday morning, he would sit down with a stack of PDF invoices and manually type the details into a spreadsheet. Vendor name, invoice number, date, amount, category. Over and over. It took him about 6 hours every week. Sometimes more.</p>

<p>He told me about this casually over lunch. I told him I could probably fix it over the weekend. He laughed. I built it anyway.</p>

<h2>The Problem</h2>
<p>His vendors sent invoices as PDFs. Some were scanned. Some were digital. All different formats. He had about 40 invoices a week and was copying each field by hand into Google Sheets. One typo meant his accountant would catch it weeks later and the whole reconciliation process would stall.</p>

<p>The real cost was not the 6 hours. It was the errors, the delays, and the fact that he was doing data entry instead of running his business.</p>

<h2>What I Built</h2>
<p>I used Python with PyPDF2 for digital PDFs and Tesseract OCR for scanned ones. The pipeline looked like this:</p>

<ul>
<li>Drop all PDFs into a Google Drive folder</li>
<li>A script watches the folder every 10 minutes</li>
<li>It extracts text from each PDF using OCR when needed</li>
<li>Regex patterns pull out invoice number, date, vendor, and total amount</li>
<li>Everything gets written to a Google Sheet automatically</li>
<li>He gets a Slack message summarizing what was processed</li>
</ul>

<p>The whole thing is about 200 lines of Python. Nothing fancy. No machine learning, no AI. Just solid scripting with good error handling.</p>

<h2>How Long It Took</h2>
<p>Saturday afternoon I started. Saturday night I had a working prototype. Sunday I added the OCR layer and the Slack notification. Sunday evening I deployed it on a $5/month DigitalOcean droplet.</p>

<p>Total time: about 10 hours including testing. Total cost: $5/month for the server plus a few dollars in API calls.</p>

<h2>The Result</h2>
<p>Those 6 hours of Monday morning work became 15 minutes of reviewing the spreadsheet for any edge cases. His error rate dropped to nearly zero. His accountant started getting clean data every week without follow ups.</p>

<p>The biggest surprise was how much mental bandwidth he got back. He told me he actually started looking forward to Mondays again. That sounded dramatic but I understood what he meant.</p>

<h2>What I Learned</h2>
<p>You do not need cutting edge tools to solve most business problems. A well written script that handles 90% of cases reliably is worth more than a perfect system that never ships. Start simple, deploy fast, and iterate based on real usage.</p>

<p>If you are sitting on a repetitive task that eats hours every week, there is almost certainly a straightforward automation that can handle it. The ROI is usually obvious within the first week.</p>`,
  },
  {
    slug: 'qa-agent-business-database',
    title: 'Building a Q&A Agent on Top of a Business Database',
    excerpt: 'Non-technical teams should be able to ask their own data questions. Here\'s the architecture I used.',
    category: 'AI Engineering',
    readTime: '6 min read',
    date: 'May 2026',
    published: true,
    content: `<p>Most businesses have a database full of answers that nobody can access without filing a ticket or bothering the one person who knows SQL. That is a broken system. The data is there. The questions are simple. The bottleneck is the interface.</p>

<p>I built a Q&A agent that lets non-technical team members ask questions in plain English and get answers directly from the database. No SQL knowledge required. No waiting for someone else to write a query.</p>

<h2>Why This Matters</h2>
<p>Picture a sales manager who wants to know which product category grew the most last quarter. Or an operations lead who needs to see average delivery times by region. These are straightforward questions. But in most companies, they become emails, Slack messages, and eventually a Jira ticket that sits in a backlog for two weeks.</p>

<p>By the time the answer arrives, the decision has already been made without it. That is the real cost.</p>

<h2>The Architecture</h2>
<p>I kept it simple and robust. Here is the stack:</p>

<ul>
<li><strong>Database:</strong> PostgreSQL with a clean schema and proper foreign keys</li>
<li><strong>Schema Layer:</strong> I wrote a detailed schema description that maps table names, column names, and relationships into plain language the LLM can understand</li>
<li><strong>LLM:</strong> GPT-4 for query generation, with function calling to structure the output</li>
<li><strong>Validation:</strong> Every generated SQL query goes through a validation layer that checks for destructive operations (no DROP, DELETE, UPDATE) and enforces row limits</li>
<li><strong>Execution:</strong> Read-only database user with strict permissions. The agent can only SELECT</li>
<li><strong>Response:</strong> Results come back as a formatted table plus a natural language summary</li>
</ul>

<p>The whole pipeline runs in under 3 seconds for most queries.</p>

<h2>The Schema Layer</h2>
<p>This is the part most people get wrong. You cannot just throw a database schema at an LLM and expect good results. The model needs context. What does each table represent in business terms? Which columns are commonly queried together? What are the typical units and formats?</p>

<p>I spent about 60% of the total project time on the schema description. It is a single YAML file that describes every table, every column, and every relationship in plain English. It also includes example questions and the queries they map to.</p>

<p>This file is the real product. The LLM is just the engine.</p>

<h2>Safety Guardrails</h2>
<p>Letting an LLM write SQL against your database sounds risky. It can be, if you do not build proper guardrails. Here is what I put in place:</p>

<ul>
<li>Read-only database user. The agent literally cannot modify data</li>
<li>Query validation that rejects anything outside a whitelist of SELECT statements</li>
<li>Row limits enforced at the connection level (max 1000 rows returned)</li>
<li>Query timeout of 10 seconds to prevent runaway queries</li>
<li>Full logging of every question asked and every query generated</li>
</ul>

<p>The worst case scenario is the agent returns wrong data, which is why every response includes the actual SQL query so a technical person can verify it if needed.</p>

<h2>Results After 2 Months</h2>
<p>The team went from asking 2 to 3 data questions per week to asking 15 to 20. The data team went from spending 40% of their time on ad hoc queries to almost zero. Decision making got faster because people could get answers in real time.</p>

<p>The biggest win was cultural. Teams stopped treating data as something they had to request and started treating it as something they could explore.</p>

<h2>What I Would Do Differently</h2>
<p>I would add a feedback loop earlier. Letting users rate whether the answer was correct or not would help improve the schema descriptions over time. I would also add support for follow up questions so users could refine their queries conversationally instead of starting from scratch each time.</p>

<p>If you are thinking about building something like this, start with the schema layer. Invest time in describing your data in plain language. The LLM part is straightforward. The real work is making your database understandable to a language model.</p>`,
  },
  {
    slug: 'consultancy-while-targeting-faang',
    title: 'Why I\'m Building a Consultancy While Targeting FAANG',
    excerpt: 'Both goals sound contradictory. They\'re not. Here\'s the logic.',
    category: 'Career',
    readTime: '3 min read',
    date: 'May 2026',
    published: true,
    content: `<p>People ask me this a lot. If you want to work at Google or Amazon, why are you spending time building a consultancy? Should you not be grinding LeetCode and preparing for system design interviews instead?</p>

<p>I understand the question. It assumes that consultancy and FAANG are two different paths that pull you in opposite directions. But in my experience, they are complementary. One accelerates the other.</p>

<h2>What Consultancy Actually Teaches You</h2>
<p>Working with real clients on real problems teaches you things that no online course or practice problem can. You learn how to scope a project. You learn how to communicate technical concepts to non-technical stakeholders. You learn how to ship under constraints, deal with messy data, and handle ambiguity.</p>

<p>These are the exact skills that FAANG interviews test for in their behavioral and system design rounds. They want to see that you have operated in real environments, not just theoretical ones.</p>

<p>Every project I deliver is a story I can tell in an interview. A real problem, a real solution, a real impact. That is worth more than any number of mock interviews.</p>

<h2>The Skills Compound</h2>
<p>When I build an automation pipeline for a client, I am writing production Python code. When I design a database schema for a Q&A agent, I am doing real system design. When I optimize a slow query, I am doing performance engineering. These are not side projects. They are professional engagements with real users and real consequences.</p>

<p>The depth of learning that comes from production work is different from studying. You encounter edge cases that no tutorial covers. You make architectural decisions that have real tradeoffs. You learn what good enough looks like, which is something FAANG engineers deal with every day.</p>

<h2>Building a Track Record</h2>
<p>FAANG companies look for impact. They want to see that you have done meaningful work, not that you have spent months preparing for their interview process. A consultancy gives you a portfolio of real projects with measurable outcomes.</p>

<p>When I walk into an interview and can talk about how I reduced a client's manual work by 90%, or how I built a system that handles thousands of queries a day, that carries weight. It demonstrates ownership, initiative, and execution. Those are the traits that hiring managers are actually looking for.</p>

<h2>The Financial Safety Net</h2>
<p>There is also a practical side. Job hunting at the FAANG level takes time. Months, sometimes. Having consultancy income means I can be patient. I do not have to accept the first offer that comes along because rent is due. I can wait for the right role at the right company.</p>

<p>This changes the entire dynamic of the job search. When you are not desperate, you negotiate better. You interview better. You make better decisions about which teams and which offers are actually a good fit.</p>

<h2>The Long Game</h2>
<p>My goal is not just to get into FAANG. It is to become the kind of engineer who thrives there. That means building real things, solving real problems, and developing real expertise. Consultancy forces me to do all of that at a pace that no study plan can match.</p>

<p>So no, I am not choosing between consultancy and FAANG. I am using one to earn the other. And honestly, I think that is the smarter play.</p>`,
  },
];

export const postCategories = ['All', 'Automation', 'AI Engineering', 'Career', 'Data'];

export default posts;