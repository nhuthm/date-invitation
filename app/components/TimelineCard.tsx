'use client';

/**Test **/

import { motion } from 'framer-motion';

interface TimelineCardProps {
  emoji: string;
  title: string;
  description: string;
  imageUrl: string;
  isSelected: boolean;
  onClick: () => void;
}

export function TimelineCard({
  emoji,
  title,
  description,
  imageUrl,
  isSelected,
  onClick,
}: TimelineCardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`timeline-card ${isSelected ? 'timeline-card-selected' : ''}`}
    >
      {isSelected && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="timeline-card-check"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </motion.div>
      )}

      <div className="timeline-card-image">
        <img src={imageUrl} alt={title} />
        <div
          className="timeline-card-overlay"
          style={{ opacity: isSelected ? 0 : 0.25 }}
        />
      </div>

      <div className="timeline-card-content">
        <span className="timeline-card-emoji">{emoji}</span>
        <div>
          <h4 className="timeline-card-title">{title}</h4>
          <p className="timeline-card-desc">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}
