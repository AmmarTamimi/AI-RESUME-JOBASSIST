export const NAV_ITEMS = [
  { label: 'Features', href: '#features' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export const FEATURES = [
  {
    icon: '📊',
    title: 'Smart Resume Analysis',
    description: 'Get detailed AI-powered feedback on your resume\'s strengths, weaknesses, and ATS compatibility.',
  },
  {
    icon: '🎯',
    title: 'ATS Optimization',
    description: 'Optimize your resume to pass through Applicant Tracking Systems with keyword matching.',
  },
  {
    icon: '✨',
    title: 'Professional Rewriting',
    description: 'Transform your resume with AI-powered suggestions to make it more compelling and professional.',
  },
  {
    icon: '🔍',
    title: 'Job Matching',
    description: 'Find the most relevant job openings based on your skills, experience, and preferences.',
  },
  {
    icon: '🤖',
    title: 'Auto-Application',
    description: 'Automatically apply to jobs with tailored resumes and cover letters (coming soon).',
  },
  {
    icon: '📈',
    title: 'Real-time Analytics',
    description: 'Track your application success rates and get insights to improve your job search strategy.',
  },
];

export const PRICING_PLANS = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for trying out the service',
    features: [
      'Basic resume analysis',
      '1 resume per month',
      'ATS compatibility check',
      'Basic feedback',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$19',
    description: 'For serious job seekers',
    features: [
      'Advanced AI analysis',
      'Unlimited resumes',
      'Professional rewriting',
      'Job matching',
      'Priority support',
      'Export to PDF',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '$49',
    description: 'For teams and recruiters',
    features: [
      'Everything in Pro',
      'Team collaboration',
      'API access',
      'Custom branding',
      'Dedicated support',
      'Advanced analytics',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];