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
  FaqDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

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

  const faqs = [
    {
      question: 'What is ${projectName} and how does it work?',
      answer:
        '${projectName} is a CRM Admin Panel designed to streamline business operations. It offers features like user management, analytics, and customizable dashboards to enhance productivity.',
    },
    {
      question: 'How can I sign up for ${projectName}?',
      answer:
        'You can sign up for ${projectName} by visiting our website and selecting the plan that best suits your needs. A free trial is available to explore the features.',
    },
    {
      question: 'What support options are available with ${projectName}?',
      answer:
        'We offer various support options including email support, live chat, and a dedicated account manager for Business plan users to ensure you get the help you need.',
    },
    {
      question: 'Can I customize the features in ${projectName}?',
      answer:
        'Yes, ${projectName} offers customizable dashboards and features, especially in the Premium and Business plans, to tailor the CRM experience to your specific business needs.',
    },
    {
      question: 'Is my data secure with ${projectName}?',
      answer:
        'Absolutely. We prioritize data security and employ industry-standard encryption and security measures to protect your information.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept various payment methods including credit cards, PayPal, and bank transfers for your convenience.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Frequently Asked Questions - ${projectName}`}</title>
        <meta
          name='description'
          content={`Find answers to common questions about ${projectName}. Learn more about our features, pricing, and support options.`}
        />
      </Head>
      <WebSiteHeader projectName={'TutorsPlan.CRM'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'TutorsPlan.CRM'}
          image={['FAQ section illustration']}
          mainText={`Your Questions Answered with ${projectName}`}
          subTitle={`Explore our comprehensive FAQ section to find answers to common questions about ${projectName}. Get the information you need to make the most of our services.`}
          design={HeroDesigns.TEXT_CENTER || ''}
          buttonText={`Learn More`}
        />

        <FaqSection
          projectName={'TutorsPlan.CRM'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Common Questions About ${projectName} `}
        />

        <ContactFormSection
          projectName={'TutorsPlan.CRM'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Customer support illustration']}
          mainText={`Reach Out to ${projectName} Support `}
          subTitle={`Have more questions? Contact us anytime for assistance. Our team at ${projectName} is here to help you with any inquiries or support needs.`}
        />
      </main>
      <WebSiteFooter projectName={'TutorsPlan.CRM'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
