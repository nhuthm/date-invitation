'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TimelineCard } from './TimelineCard';

export const TIMELINE_DATA = [
  {
    time: '12:30 PM',
    description: "First, let's grab lunch",
    options: [
      {
        id: 'fuji',
        emoji: '🍱',
        title: 'Fuji Kitchen',
        description: '10 Trần Hữu Trang, quận Phú Nhuận',
        imageUrl: '/images/fuji-kitchen.png',
      },
      {
        id: 'the-b6',
        emoji: '🍙',
        title: 'The B6',
        description: '157/28D Nguyễn Gia Trí, Bình Thạnh',
        imageUrl: '/images/the-b6.png',
      },
    ],
  },
  {
    time: '2:30 PM',
    description: 'Then, a little adventure',
    options: [
      {
        id: 'to-tuong',
        emoji: '📚',
        title: 'Đi Tô Tượng',
        description: 'Nhà sách Hải An',
        imageUrl: '/images/to-tuong.png',
      },
      {
        id: 've-tranh',
        emoji: '🎨',
        title: 'Đi Vẽ Tranh',
        description: 'Workshop Ngồi Vẽ Giữa Đời - 91 Lý Tự Trọng, Quận 1',
        imageUrl: '/images/ve-tranh.png',
      },
    ],
  },
  {
    time: '4:30 PM',
    description: 'Getting some sweet',
    options: [
      {
        id: 'bingsu',
        emoji: '🍧',
        title: 'Bingsu',
        description: 'Boulevard - 25 Hồ Tùng Mậu, Quận 1',
        imageUrl: '/images/bingsu.png',
      },
      {
        id: 'another-bake-shop',
        emoji: '🍰',
        title: 'Another Bake Shop',
        description: '25/25 Nguyễn Bỉnh Khiêm, Quận 1',
        imageUrl: '/images/another-bake-shop.png',
      },
    ],
  },
  {
    time: '6:00 PM',
    description: 'Night activities',
    options: [
      {
        id: 'dinner-movie',
        emoji: '🎬',
        title: 'Dinner + Movie',
        description: 'Couple dinner and movies night for chilling?',
        imageUrl: '/images/dinner-movie.svg',
      },
      {
        id: 'night-walk',
        emoji: '🌙',
        title: 'Ăn vặt + Dạo đêm???',
        description: 'Bất kì hoạt động nào 😊',
        imageUrl: '/images/night-walk.svg',
      },
    ],
  },
];

interface DateMenuProps {
  onSubmit: (selections: Record<number, number>, suggestions: Record<number, string>) => void;
}

export function DateMenu({ onSubmit }: DateMenuProps) {
  const [selections, setSelections] = useState<Record<number, number>>({});
  const [suggestions, setSuggestions] = useState<Record<number, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSelect = (blockIndex: number, optionIndex: number) => {
    setSelections((prev) => {
      const next = { ...prev };
      if (next[blockIndex] === optionIndex) {
        delete next[blockIndex];
      } else {
        next[blockIndex] = optionIndex;
      }
      return next;
    });
    // Clear suggestion when picking a card
    setSuggestions((prev) => {
      const next = { ...prev };
      delete next[blockIndex];
      return next;
    });
  };

  const handleSuggestion = (blockIndex: number, value: string) => {
    setSuggestions((prev) => ({ ...prev, [blockIndex]: value }));
    // Deselect card when typing a suggestion
    if (value.trim()) {
      setSelections((prev) => {
        const next = { ...prev };
        delete next[blockIndex];
        return next;
      });
    }
  };

  const hasAllChoices = TIMELINE_DATA.every((_, i) => {
    return selections[i] !== undefined || (suggestions[i] ?? '').trim().length > 0;
  });

  const handleSubmit = async () => {
    if (!hasAllChoices || submitting) return;
    setSubmitting(true);
    try {
      await onSubmit(selections, suggestions);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
      className="timeline-page"
    >
      <header className="timeline-header">
        <h1>Here&apos;s the plan</h1>
        <p>Pick what sounds good to you</p>
      </header>

      <div className="timeline">
        <div className="timeline-line" />

        {TIMELINE_DATA.map((block, blockIndex) => (
          <motion.div
            key={blockIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + blockIndex * 0.15 }}
            className="timeline-block"
          >
            <div className="timeline-dot" />

            <div className="timeline-block-header">
              <h2 className="timeline-time">{block.time}</h2>
              <p className="timeline-desc">{block.description}</p>
            </div>

            <div className="timeline-options">
              {block.options.map((option, optionIndex) => (
                <TimelineCard
                  key={option.id}
                  emoji={option.emoji}
                  title={option.title}
                  description={option.description}
                  imageUrl={option.imageUrl}
                  isSelected={selections[blockIndex] === optionIndex}
                  onClick={() => handleSelect(blockIndex, optionIndex)}
                />
              ))}
            </div>

            <input
              type="text"
              className="timeline-suggestion"
              placeholder="Or suggest something else..."
              value={suggestions[blockIndex] ?? ''}
              onChange={(e) => handleSuggestion(blockIndex, e.target.value)}
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {hasAllChoices && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="timeline-sticky-btn"
          >
            <button
              className="confirm-btn"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? 'Sending...' : 'Sounds perfect'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
