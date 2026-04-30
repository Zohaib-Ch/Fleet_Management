import React from 'react';

export default function HolographicCard({ children, className = "", glowColor = "gold" }) {
  const glowStyles = {
    gold: "shadow-[0_20px_50px_rgba(212,175,55,0.1)]",
    blue: "shadow-[0_20px_50px_rgba(59,130,246,0.1)]",
    emerald: "shadow-[0_20px_50px_rgba(16,185,129,0.1)]",
    purple: "shadow-[0_20px_50px_rgba(168,85,247,0.1)]",
  };

  return (
    <div
      className={`glass-obsidian border border-[var(--border-primary)] ${glowStyles[glowColor] || glowStyles.gold} ${className}`}
    >
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}



