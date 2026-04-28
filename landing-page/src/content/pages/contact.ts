/**
 * Contact Page Content
 * Contact information and form content
 */

export const contactContent = {
  meta: {
    title: 'Contact NEXUS | Enterprise Digital Solutions',
    description: 'Get in touch with NEXUS. Schedule a consultation with our digital transformation experts.',
    keywords: ['contact us', 'consultation', 'digital transformation consulting', 'enterprise solutions'],
    canonical: 'https://nexus.agency/contact',
  },

  hero: {
    headline: 'Let\'s Transform Your Enterprise',
    subheadline: 'Schedule a consultation with our digital transformation experts.',
  },

  form: {
    headline: 'Get in Touch',
    description: 'Tell us about your enterprise and transformation goals. We\'ll have a conversation about how we can help.',
    fields: [
      { name: 'fullName', label: 'Full Name', type: 'text', required: true },
      { name: 'email', label: 'Email Address', type: 'email', required: true },
      { name: 'company', label: 'Company Name', type: 'text', required: true },
      { name: 'industry', label: 'Industry', type: 'select', required: true },
      { name: 'employees', label: 'Company Size', type: 'select', required: true },
      { name: 'challenge', label: 'What\'s Your Primary Challenge?', type: 'textarea', required: true },
      { name: 'budget', label: 'Budget Range', type: 'select', required: false },
      { name: 'timeline', label: 'Project Timeline', type: 'select', required: false },
    ],
    submitButton: 'Schedule Consultation',
    successMessage: 'Thank you! We\'ll be in touch within 24 hours.',
  },

  contactInfo: {
    headline: 'Other Ways to Reach Us',
    methods: [
      {
        type: 'phone',
        label: 'Phone',
        value: '+1 (555) 123-4567',
        description: 'Mon-Fri, 9am-6pm EST',
      },
      {
        type: 'email',
        label: 'Email',
        value: 'hello@nexus.agency',
        description: 'Response within 24 hours',
      },
      {
        type: 'address',
        label: 'Headquarters',
        value: '123 Innovation Drive, San Francisco, CA 94105',
        description: 'Visit us at our office',
      },
    ],
  },

  offices: {
    headline: 'Global Offices',
    locations: [
      {
        name: 'San Francisco',
        country: 'United States',
        timezone: 'PST',
      },
      {
        name: 'New York',
        country: 'United States',
        timezone: 'EST',
      },
      {
        name: 'London',
        country: 'United Kingdom',
        timezone: 'GMT',
      },
      {
        name: 'Singapore',
        country: 'Singapore',
        timezone: 'SGT',
      },
      {
        name: 'Sydney',
        country: 'Australia',
        timezone: 'AEST',
      },
      {
        name: 'São Paulo',
        country: 'Brazil',
        timezone: 'BRT',
      },
    ],
  },

  faq: {
    headline: 'Frequently Asked Questions',
    items: [
      {
        question: 'How quickly can we start?',
        answer: 'After an initial consultation and agreement, we typically begin within 2-4 weeks. Urgent engagements can start immediately.',
      },
      {
        question: 'What\'s the minimum project size?',
        answer: 'We work with enterprises of all sizes. Minimum engagements typically start at $50K, but we\'re flexible based on scope.',
      },
      {
        question: 'Do you offer retainer arrangements?',
        answer: 'Yes, we offer flexible engagement models including project-based, retainer, and hybrid arrangements.',
      },
      {
        question: 'How do you handle NDAs and confidentiality?',
        answer: 'We take confidentiality seriously. We sign NDAs and comply with all industry-standard security and compliance requirements.',
      },
    ],
  },

  cta: {
    headline: 'Ready to Get Started?',
    description: 'Fill out the form above or call us directly.',
    buttonText: 'Contact Us',
  },
}
