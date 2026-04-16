'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { PasswordPage } from './components/PasswordPage';
import { DateMenu } from './components/DateMenu';

export default function Page() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className={unlocked ? 'page-timeline' : 'page-centered'}>
      <AnimatePresence mode="wait">
        {!unlocked ? (
          <PasswordPage key="password" onSuccess={() => setUnlocked(true)} />
        ) : (
          <DateMenu key="menu" />
        )}
      </AnimatePresence>
    </div>
  );
}
