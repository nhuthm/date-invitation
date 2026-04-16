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
        id: 'coffee',
        emoji: '☕',
        title: 'The Roastery',
        description: 'Coffee and people-watching',
        imageUrl:
          'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop',
      },
      {
        id: 'garden',
        emoji: '🌿',
        title: 'Botanical Garden',
        description: 'A quiet walk together',
        imageUrl:
          'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop',
      },
    ],
  },
  {
    time: '6:00 PM',
    description: 'Dinner, somewhere special',
    options: [
      {
        id: 'french',
        emoji: '🍷',
        title: 'La Petite',
        description: 'Candlelight and French cuisine',
        imageUrl:
          'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
      },
      {
        id: 'italian',
        emoji: '🍝',
        title: 'Trattoria Mia',
        description: 'Homestyle Italian, warm and cozy',
        imageUrl:
          'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=400&h=300&fit=crop',
      },
    ],
  },
  {
    time: '8:30 PM',
    description: 'End the night with something sweet',
    options: [
      {
        id: 'gelato',
        emoji: '🍦',
        title: 'Gelato Lab',
        description: 'Handmade gelato, endless flavors',
        imageUrl:
          'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&h=300&fit=crop',
      },
      {
        id: 'cinema',
        emoji: '🎬',
        title: 'Cinema Paradiso',
        description: 'A good film to wrap the night',
        imageUrl:
          'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=300&fit=crop',
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
