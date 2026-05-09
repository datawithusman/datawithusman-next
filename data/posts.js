/**
 * BLOG POSTS
 * published: false → shows as "Coming Soon" card, never 404
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
    date: 'Coming Soon',
    published: false,
    content: '',
  },
  {
    slug: 'qa-agent-business-database',
    title: 'Building a Q&A Agent on Top of a Business Database',
    excerpt: 'Non-technical teams should be able to ask their own data questions. Here\'s the architecture I used.',
    category: 'AI Engineering',
    readTime: '6 min read',
    date: 'Coming Soon',
    published: false,
    content: '',
  },
  {
    slug: 'consultancy-while-targeting-faang',
    title: 'Why I\'m Building a Consultancy While Targeting FAANG',
    excerpt: 'Both goals sound contradictory. They\'re not. Here\'s the logic.',
    category: 'Career',
    readTime: '3 min read',
    date: 'Coming Soon',
    published: false,
    content: '',
  },
];

export const postCategories = ['All', 'Automation', 'AI Engineering', 'Career', 'Data'];

export default posts;
