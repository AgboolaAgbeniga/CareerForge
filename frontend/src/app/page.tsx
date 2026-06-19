"use client";

import React from 'react';
import Hero from '@/components/sections/Hero';
import ValueProposition from '@/components/sections/ValueProposition';
import FeaturesGrid from '@/components/sections/FeaturesGrid';
import Testimonials from '@/components/sections/Testimonials';
import CallToAction from '@/components/sections/CallToAction';

export default function Home() {
  return (
    <div>
      <Hero />
      <ValueProposition />
      <FeaturesGrid />
      <Testimonials />
      <CallToAction />
    </div>
  );
}
