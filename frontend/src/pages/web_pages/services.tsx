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
  TestimonialsDesigns,
  ContactFormDesigns,
  PricingDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import TestimonialsSection from '../../components/WebPageComponents/TestimonialsComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

import PricingSection from '../../components/WebPageComponents/PricingComponent';

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
      name: 'Dynamic User Management',
      description:
        'Efficiently manage user roles and permissions with ease. Ensure secure access and streamline user interactions across your organization.',
      icon: 'mdiAccountGroup',
    },
    {
      name: 'Comprehensive Analytics',
      description:
        'Gain valuable insights with detailed analytics. Track performance metrics and make informed decisions to optimize your business operations.',
      icon: 'mdiChartBar',
    },
    {
      name: 'Customizable Course Management',
      description:
        'Create and manage courses tailored to your needs. Monitor progress and enhance learning experiences for better outcomes.',
      icon: 'mdiBookOpenVariant',
    },
  ];

  const testimonials = [
    {
      text: 'Using ${projectName} has transformed our business operations. The user management and analytics features are top-notch!',
      company: 'Tech Innovators Inc.',
      user_name: 'John Doe, CTO',
    },
    {
      text: 'The customizable course management has been a game-changer for our training programs. Highly recommend ${projectName}!',
      company: 'Learning Solutions Ltd.',
      user_name: 'Jane Smith, Training Manager',
    },
    {
      text: 'We have seen a significant improvement in productivity since implementing ${projectName}. The support team is fantastic!',
      company: 'Enterprise Solutions Co.',
      user_name: 'Michael Brown, Operations Director',
    },
    {
      text: '${projectName} offers incredible value with its comprehensive features. Our team loves the intuitive interface.',
      company: 'Innovative Tech Group',
      user_name: 'Emily White, Product Manager',
    },
    {
      text: 'The detailed analytics provided by ${projectName} have helped us make informed decisions and drive growth.',
      company: 'Data Insights Corp.',
      user_name: 'David Green, Data Analyst',
    },
    {
      text: "I appreciate the flexibility and ease of use that ${projectName} offers. It's a must-have for any business.",
      company: 'Business Solutions LLC',
      user_name: 'Sarah Johnson, CEO',
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

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Explore Our Services - ${projectName}`}</title>
        <meta
          name='description'
          content={`Discover the comprehensive services offered by ${projectName}, designed to enhance your business operations and drive success.`}
        />
      </Head>
      <WebSiteHeader projectName={'TutorsPlan.CRM'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'TutorsPlan.CRM'}
          image={['Business services overview image']}
          mainText={`Transform Your Business with ${projectName}`}
          subTitle={`Explore the diverse services offered by ${projectName} to streamline your operations and boost productivity. Discover how we can help you achieve your business goals.`}
          design={HeroDesigns.IMAGE_LEFT || ''}
          buttonText={`Learn More`}
        />

        <FeaturesSection
          projectName={'TutorsPlan.CRM'}
          image={['Features overview illustration']}
          withBg={0}
          features={features_points}
          mainText={`Discover Key Features of ${projectName}`}
          subTitle={`Unlock the full potential of your business with the powerful features offered by ${projectName}. Enhance efficiency and drive growth.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <TestimonialsSection
          projectName={'TutorsPlan.CRM'}
          design={TestimonialsDesigns.HORIZONTAL_CAROUSEL || ''}
          testimonials={testimonials}
          mainText={`What Our Clients Say About ${projectName} `}
        />

        <PricingSection
          projectName={'TutorsPlan.CRM'}
          withBg={0}
          features={pricing_features}
          description={description}
        />

        <ContactFormSection
          projectName={'TutorsPlan.CRM'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Contact support illustration']}
          mainText={`Connect with ${projectName} Support `}
          subTitle={`Reach out to us anytime for inquiries or assistance. Our team is ready to help you with any questions about ${projectName}.`}
        />
      </main>
      <WebSiteFooter projectName={'TutorsPlan.CRM'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
