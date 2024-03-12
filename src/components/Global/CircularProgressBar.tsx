'use client';
import React, { useEffect, useRef } from 'react';

interface CircularProgressBarProps {
  percentage?: number;
  w: string;
  h: string;
  wLine: string;
  fonte_size: string;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  percentage,
  w,
  h,
  wLine,
  fonte_size,
}) => {
  const progressBarRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (progressBarRef.current) {
      const radius = progressBarRef.current.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
      const offset = percentage && circumference - (percentage / 100) * circumference;

      progressBarRef.current.style.strokeDasharray = `${circumference} ${circumference}`;
      progressBarRef.current.style.strokeDashoffset = `${offset}`;
    }
  }, [percentage, w, h]);

  return (
    <svg style={{ width: w, height: h }}>
      <circle
        className="stroke-current text-white-50"
        cx="50%"
        cy="50%"
        r="40%"
        fill="transparent"
        strokeWidth={`${wLine}`}
      />
      <circle
        ref={progressBarRef}
        className="stroke-current text-green-50 transition-all ease-in-out duration-500"
        cx="50%"
        cy="50%"
        r="40%"
        fill="transparent"
        strokeWidth={`${wLine}`}
        strokeDasharray="0 1000"
        strokeDashoffset="0"
      />
      <text
        x="50%"
        y="50%"
        className="text-center text-lg font-semibold"
        dominantBaseline="middle"
        textAnchor="middle"
        style={{ fill: 'white', fontSize: fonte_size }}
      >
        {percentage}%
      </text>
    </svg>
  );
};

export default CircularProgressBar;