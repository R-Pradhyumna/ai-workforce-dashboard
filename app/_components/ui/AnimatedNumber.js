"use client";

import { useEffect, useState } from "react";

function formatValue(value, type) {
  if (type === "compact") {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  }

  if (type === "currency") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(value);
  }

  return new Intl.NumberFormat("en-US").format(value);
}

export default function AnimatedNumber({
  value,
  duration = 800,
  type = "standard",
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = Number(value);

    if (isNaN(end)) return;

    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        start = end;
        clearInterval(timer);
      }

      setDisplay(start);
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{formatValue(display, type)}</span>;
}
