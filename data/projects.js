/**
 * PORTFOLIO PROJECTS
 * Add a new project object to this array.
 * Categories: 'Business Solutions' | 'AI & Engineering' | 'Research & Scale'
 */
const projects = [
  {
    id: 'invoice-automation',
    category: 'Business Solutions',
    tools: ['Python', 'Pandas', 'Plotly', 'Streamlit'],
    title: 'Automated Invoice Processing System',
    problem: 'A contracting firm was spending 6+ hours weekly organizing PDF invoices manually.',
    result: 'Reduced processing time from 6 hours to under 10 minutes. Zero data entry errors.',
    slug: 'invoice-automation',
    featured: true,
  },
  {
    id: 'ai-data-agent',
    category: 'AI & Engineering',
    tools: ['Python', 'FastAPI', 'LangChain', 'PostgreSQL'],
    title: 'AI-Powered Data Q&A Agent',
    problem: 'Business team couldn\'t query their own database without involving a developer.',
    result: 'Non-technical staff can now ask plain English questions and get instant data answers.',
    slug: 'ai-data-agent',
    featured: true,
  },
  {
    id: 'kpi-dashboard',
    category: 'Business Solutions',
    tools: ['Python', 'Google Sheets API', 'Pandas'],
    title: 'Operations KPI Dashboard',
    problem: 'Management had no real-time visibility into project status or budget burn.',
    result: 'Live dashboard updated daily — decision time reduced from days to minutes.',
    slug: 'kpi-dashboard',
    featured: true,
  },
];

export const categories = ['All', 'Business Solutions', 'AI & Engineering', 'Research & Scale'];

export default projects;
