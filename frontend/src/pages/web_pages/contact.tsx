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
  ContactFormDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

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

  const faqs = [
    {
      question: 'What is ${projectName} and how can it benefit my business?',
      answer:
        '${projectName} is a comprehensive CRM Admin Panel designed to streamline business operations, manage user roles, and enhance productivity through advanced analytics and reporting.',
    },
    {
      question: 'How do I get started with ${projectName}?',
      answer:
        'To get started, sign up for a free trial on our website. Once registered, you can explore the features and choose a plan that suits your needs.',
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
        <title>{`Contact Us - ${projectName}`}</title>
        <meta
          name='description'
          content={`Get in touch with the ${projectName} team for any inquiries or support. We're here to help you with all your needs.`}
        />
      </Head>
      <WebSiteHeader projectName={'TutorsPlan.CRM'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'TutorsPlan.CRM'}
          image={['Customer support team image']}
          mainText={`Reach Out to ${projectName} Today`}
          subTitle={`We're here to assist you with any questions or support you need. Contact the ${projectName} team and let us help you succeed.`}
          design={HeroDesigns.TEXT_CENTER || ''}
          buttonText={`Contact Us`}
        />

        <FaqSection
          projectName={'TutorsPlan.CRM'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions about ${projectName} `}
        />

        <ContactFormSection
          projectName={'TutorsPlan.CRM'}
          design={ContactFormDesigns.HIGHLIGHTED || ''}
          image={['Email communication illustration']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`Feel free to reach out to us anytime. Our team at ${projectName} is ready to assist you with any inquiries or support needs.`}
        />
      </main>
      <WebSiteFooter projectName={'TutorsPlan.CRM'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
