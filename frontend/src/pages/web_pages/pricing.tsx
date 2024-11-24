import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../../stores/hooks';
import LayoutGuest from '../../layouts/Guest';
import WebSiteHeader from '../../components/WebPageComponents/Header';
import WebSiteFooter from '../../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  PricingDesigns,
  FeaturesDesigns,
  TestimonialsDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import PricingSection from '../../components/WebPageComponents/PricingComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import TestimonialsSection from '../../components/WebPageComponents/TestimonialsComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

export default function WebSite() {
  const cardsStyle = useAppSelector((state) => state.style.cardsStyle);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  const projectName = 'TutorsPlan.CRM';

  useEffect(() => {
    const darkElement = document.querySelector('body .dark');
    if (darkElement) {
      darkElement.classList.remove('dark');
    }
  }, []);
  const pages = [
    {
      href: '/home',
      label: 'home',
    },

    {
      href: '/services',
      label: 'services',
    },

    {
      href: '/contact',
      label: 'contact',
    },

    {
      href: '/pricing',
      label: 'pricing',
    },

    {
      href: '/faq',
      label: 'FAQ',
    },
  ];

  const pricing_features = {
    standard: {
      features: ['Basic CRM access', 'User management', 'Course enrollment'],
      limited_features: ['Limited analytics', 'Basic support'],
    },
    premium: {
      features: [
        'Advanced CRM access',
        'Enhanced user management',
        'Comprehensive course management',
      ],
      also_included: [
        'Detailed analytics',
        'Priority support',
        'Customizable dashboards',
      ],
    },
    business: {
      features: [
        'Full CRM access',
        'Enterprise-level user management',
        'Complete course and data management',
        'Advanced analytics and reporting',
        'Dedicated account manager',
      ],
    },
  };

  const description = {
    standard:
      'Ideal for individuals or freelancers looking to manage basic CRM tasks and access essential features.',
    premium:
      'Perfect for small startups or agencies needing advanced CRM capabilities and enhanced support.',
    business:
      'Designed for enterprises requiring comprehensive CRM solutions with full access to all features and dedicated support.',
  };

  const features_points = [
    {
      name: 'Intuitive User Management',
      description:
        'Easily manage user roles and permissions with a user-friendly interface. Ensure secure access and streamline interactions across your organization.',
      icon: 'mdiAccountCircle',
    },
    {
      name: 'Advanced Analytics',
      description:
        'Gain insights with comprehensive analytics. Track performance metrics and make data-driven decisions to optimize your business operations.',
      icon: 'mdiChartLine',
    },
    {
      name: 'Customizable Dashboards',
      description:
        'Tailor your CRM experience with customizable dashboards. Organize and display data in a way that suits your business needs.',
      icon: 'mdiViewDashboard',
    },
  ];

  const testimonials = [
    {
      text: '${projectName} has revolutionized our workflow. The intuitive user management and advanced analytics are invaluable.',
      company: 'Tech Pioneers Ltd.',
      user_name: 'Alice Johnson, CTO',
    },
    {
      text: 'We love the customizable dashboards. ${projectName} allows us to tailor our CRM experience perfectly.',
      company: 'Creative Solutions Inc.',
      user_name: 'Bob Smith, Product Manager',
    },
    {
      text: 'The support team at ${projectName} is fantastic. They helped us get up and running in no time.',
      company: 'Innovative Enterprises',
      user_name: 'Carol White, Operations Director',
    },
    {
      text: 'Our team has become more efficient thanks to ${projectName}. The features are exactly what we needed.',
      company: 'Future Tech Co.',
      user_name: 'David Brown, CEO',
    },
    {
      text: 'The detailed analytics provided by ${projectName} have been a game-changer for our decision-making process.',
      company: 'Data Driven Corp.',
      user_name: 'Eve Green, Data Analyst',
    },
    {
      text: 'I highly recommend ${projectName} for any business looking to enhance their CRM capabilities.',
      company: 'Business Innovators',
      user_name: 'Frank Black, Marketing Director',
    },
  ];

  const faqs = [
    {
      question: 'What is included in the Standard plan?',
      answer:
        'The Standard plan includes basic CRM access, user management, and course enrollment features, ideal for individuals or freelancers.',
    },
    {
      question: 'How does the Premium plan differ from the Standard plan?',
      answer:
        'The Premium plan offers advanced CRM access, enhanced user management, detailed analytics, and priority support, suitable for small startups or agencies.',
    },
    {
      question: 'Is there a free trial available for ${projectName}?',
      answer:
        'Yes, we offer a free trial period for you to explore the features and benefits of ${projectName} before committing to a plan.',
    },
    {
      question: 'Can I upgrade my plan at any time?',
      answer:
        'Absolutely. You can upgrade your plan at any time to access more features and better support as your business grows.',
    },
    {
      question: 'What payment methods are accepted?',
      answer:
        'We accept various payment methods including credit cards, PayPal, and bank transfers for your convenience.',
    },
    {
      question: 'Is my data secure with ${projectName}?',
      answer:
        'Yes, we prioritize data security and use industry-standard encryption and security measures to protect your information.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Pricing Plans - ${projectName}`}</title>
        <meta
          name='description'
          content={`Explore the flexible pricing plans of ${projectName} designed to meet the needs of individuals, startups, and enterprises. Choose the plan that suits you best.`}
        />
      </Head>
      <WebSiteHeader projectName={'TutorsPlan.CRM'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'TutorsPlan.CRM'}
          image={['Pricing plans overview image']}
          mainText={`Choose Your Perfect ${projectName} Plan`}
          subTitle={`Explore our flexible pricing options tailored to fit the needs of individuals, startups, and enterprises. Find the right plan for your business with ${projectName}.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`View Plans`}
        />

        <PricingSection
          projectName={'TutorsPlan.CRM'}
          withBg={1}
          features={pricing_features}
          description={description}
        />

        <FeaturesSection
          projectName={'TutorsPlan.CRM'}
          image={['Feature highlights illustration']}
          withBg={1}
          features={features_points}
          mainText={`Explore ${projectName} Features`}
          subTitle={`Discover the powerful features of ${projectName} designed to enhance your business operations and drive success.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <TestimonialsSection
          projectName={'TutorsPlan.CRM'}
          design={TestimonialsDesigns.MULTI_CARD_DISPLAY || ''}
          testimonials={testimonials}
          mainText={`What Our Clients Say About ${projectName} `}
        />

        <FaqSection
          projectName={'TutorsPlan.CRM'}
          design={FaqDesigns.TWO_COLUMN || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions about ${projectName} `}
        />
      </main>
      <WebSiteFooter projectName={'TutorsPlan.CRM'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
