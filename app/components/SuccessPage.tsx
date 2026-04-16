'use client';

import { motion } from 'framer-motion';

export function SuccessPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="success-page"
    >
      {/* Animated heart icon */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="success-icon"
      >
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="28" cy="28" r="28" fill="#f0ebe6" />
          <motion.path
            d="M28 40s-11-7.2-11-14a6.04 6.04 0 0 1 6-6.1c2.08 0 3.91 1.06 5 2.68A6.01 6.01 0 0 1 33 19.9a6.04 6.04 0 0 1 6 6.1c0 6.8-11 14-11 14z"
            fill="none"
            stroke="#c4a07c"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: 'easeInOut' }}
          />
          <motion.path
            d="M28 40s-11-7.2-11-14a6.04 6.04 0 0 1 6-6.1c2.08 0 3.91 1.06 5 2.68A6.01 6.01 0 0 1 33 19.9a6.04 6.04 0 0 1 6 6.1c0 6.8-11 14-11 14z"
            fill="#c4a07c"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.18 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          />
        </svg>
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="success-heading"
      >
        It&apos;s a date!
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="success-subtext"
      >
        Your picks have been saved. I can&apos;t wait to see you!
      </motion.p>

      {/* Decorative divider */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="success-divider"
      />

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="success-footer"
      >
        See you soon ✨
      </motion.p>
    </motion.div>
  );
}
