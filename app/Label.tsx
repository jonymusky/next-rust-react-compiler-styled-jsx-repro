'use client';

import { useState } from 'react';

// Mirrors the real-world component shape: state + handlers + a conditional
// element carrying the scoped class (like a hover-expanded sidebar label).
export default function Label() {
  const [expanded, setExpanded] = useState(true);
  const [count, setCount] = useState(0);

  return (
    <div
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        clicks: {count}
      </button>
      {expanded && <span className="fade-label">styled label</span>}
      <style jsx>{`
        .fade-label {
          color: rgb(1, 2, 3);
        }
      `}</style>
    </div>
  );
}
