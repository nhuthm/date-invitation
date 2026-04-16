'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface PasswordPageProps {
  onSuccess: () => void;
}

export function PasswordPage({ onSuccess }: PasswordPageProps) {
  const [pin, setPin] = useState(['', '', '', '']);
  const [isError, setIsError] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    setIsError(false);

    const newPin = [...pin];

    // Handle paste of multiple digits
    if (value.length > 1) {
      const pasted = value.slice(0, 4).split('');
      for (let i = 0; i < pasted.length; i++) {
        if (index + i < 4) newPin[index + i] = pasted[i];
      }
      setPin(newPin);
      const nextIndex = Math.min(index + pasted.length, 3);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    newPin[index] = value;
    setPin(newPin);

    if (value !== '' && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Backspace' && pin[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const enteredPin = pin.join('');
    if (enteredPin === '0106') {
      onSuccess();
    } else {
      setIsError(true);
      setPin(['', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <h1>Hello Em B&#xE9; <span className="heading-hearts">&#x1F9E1;</span></h1>
      <p>I made something for you. Enter our special day to peek inside.</p>

      <motion.div
        animate={isError ? { x: [-2, 4, -6, 6, -4, 2, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="pin-section"
      >
        <div className="pin-inputs">
          {pin.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={4}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`pin-input ${isError ? 'pin-error' : ''}`}
            />
          ))}
        </div>

        {isError && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="error"
          >
            That&apos;s not it, love. Think about us.
          </motion.p>
        )}

        <button onClick={handleSubmit} className="unlock-btn">
          Unlock
        </button>
      </motion.div>
    </motion.main>
  );
}
