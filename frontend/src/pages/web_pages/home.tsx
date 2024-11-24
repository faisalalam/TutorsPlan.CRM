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
  FeaturesDesigns,
  PricingDesigns,
  FaqDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import PricingSection from '../../components/WebPageComponents/PricingComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

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

  const features_points = [
    {
      name: 'Comprehensive User Management',
      description:
        'Manage all user roles and permissions effortlessly. Ensure secure access and streamline user interactions across the platform.',
      icon: 'mdiAccountCircle',
    },
    {
      name: 'Advanced Analytics \u0026 Reporting',
      description:
        'Gain insights with detailed analytics and reports. Track performance metrics and make data-driven decisions to boost efficiency.',
      icon: 'mdiChartLine',
    },
    {
      name: 'Seamless Course Management',
      description:
        'Create and manage courses with ease. Monitor student progress and optimize learning experiences for better outcomes.',
      icon: 'mdiBookOpenPageVariant',
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

  const faqs = [
    {
      question: 'What is ${projectName} and how can it help my business?',
      answer:
        '${projectName} is a comprehensive CRM Admin Panel designed to streamline your business operations, manage user roles, and enhance productivity through advanced analytics and reporting.',
    },
    {
      question: 'What features are included in the Standard plan?',
      answer:
        'The Standard plan includes basic CRM access, user management, and course enrollment features, suitable for individuals or freelancers.',
    },
    {
      question: 'How does the Premium plan differ from the Standard plan?',
      answer:
        'The Premium plan offers advanced CRM access, enhanced user management, detailed analytics, and priority support, ideal for small startups or agencies.',
    },
    {
      question: 'Is there a dedicated support team for the Business plan?',
      answer:
        'Yes, the Business plan includes a dedicated account manager and enterprise-level support to ensure seamless CRM operations for large enterprises.',
    },
    {
      question: 'Can I customize the dashboard in ${projectName}?',
      answer:
        'Yes, the Premium and Business plans offer customizable dashboards to tailor the CRM experience to your specific business needs.',
    },
    {
      question: 'What kind of analytics does ${projectName} provide?',
      answer:
        '${projectName} provides detailed analytics and reporting features, allowing you to track performance metrics and make data-driven decisions.',
    },
    {
      question: 'Is there a free trial available for ${projectName}?',
      answer:
        'Yes, we offer a free trial period for you to explore the features and benefits of ${projectName} before committing to a plan.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`CRM Admin Panel - Home`}</title>
        <meta
          name='description'
          content={`Welcome to the CRM Admin Panel. Explore our features, pricing, and get in touch with us for more information.`}
        />
      </Head>
      <WebSiteHeader projectName={'TutorsPlan.CRM'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'TutorsPlan.CRM'}
          image={['CRM dashboard overview image']}
          mainText={`Empower Your Business with ${projectName}`}
          subTitle={`Discover the ultimate CRM Admin Panel to streamline your operations and enhance productivity. Experience seamless management with ${projectName}.`}
          design={HeroDesigns.IMAGE_RIGHT || ''}
          buttonText={`Get Started Now`}
        />

        <FeaturesSection
          projectName={'TutorsPlan.CRM'}
          image={['CRM features illustration']}
          withBg={1}
          features={features_points}
          mainText={`Unlock Powerful Features with ${projectName}`}
          subTitle={`Explore the robust features of ${projectName} designed to enhance your CRM experience and drive business success.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <PricingSection
          projectName={'TutorsPlan.CRM'}
          withBg={1}
          features={pricing_features}
          description={description}
        />

        <FaqSection
          projectName={'TutorsPlan.CRM'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions about ${projectName} `}
        />

        <ContactFormSection
          projectName={'TutorsPlan.CRM'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Contact form illustration']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`Reach out to us anytime for inquiries or support. Our team is here to assist you with ${projectName} related questions.`}
        />
      </main>
      <WebSiteFooter projectName={'TutorsPlan.CRM'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
