'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { PasswordPage } from './components/PasswordPage';
import { DateMenu } from './components/DateMenu';
import { SuccessPage } from './components/SuccessPage';

export default function Page() {
  const [step, setStep] = useState<'password' | 'menu' | 'success'>('password');

  const handleSubmit = async (
    selections: Record<number, number>,
    suggestions: Record<number, string>,
  ) => {
    const res = await fetch('/api/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ selections, suggestions }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error ?? 'Something went wrong');
    }

    setStep('success');
  };

  return (
    <div className={step === 'password' ? 'page-centered' : 'page-timeline'}>
      <AnimatePresence mode="wait">
        {step === 'password' && (
          <PasswordPage key="password" onSuccess={() => setStep('menu')} />
        )}
        {step === 'menu' && (
          <DateMenu key="menu" onSubmit={handleSubmit} />
        )}
        {step === 'success' && (
          <SuccessPage key="success" />
        )}
      </AnimatePresence>
    </div>
  );
}
