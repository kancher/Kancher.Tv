'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

// Динамический импорт компонентов для избегания проблем с SSR
const HeroSection = dynamic(() => import('@/components/HeroSection'), { ssr: false });
const TimelineSection = dynamic(() => import('@/components/TimelineSection'), { ssr: false });
const ProjectsSection = dynamic(() => import('@/components/ProjectsSection'), { ssr: false });
const EducationSection = dynamic(() => import('@/components/EducationSection'), { ssr: false });
const SkillsSection = dynamic(() => import('@/components/SkillsSection'), { ssr: false });
const AboutSection = dynamic(() => import('@/components/AboutSection'), { ssr: false });
const ContactSection = dynamic(() => import('@/components/ContactSection'), { ssr: false });
const AIAssistant = dynamic(() => import('@/components/AIAssistant'), { ssr: false });

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-screen">
      <Head>
        <title>Kancher.Tv - Интерактивное портфолио</title>
        <meta name="description" content="Персональное интерактивное портфолио Сергея Канчера - медиа-профессионала с 15+ летним опытом" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <main>
        <HeroSection />
        <TimelineSection />
        <ProjectsSection />
        <EducationSection />
        <SkillsSection />
        <AboutSection />
        <ContactSection />
        {isMounted && <AIAssistant />}
      </main>
    </div>
  );
}