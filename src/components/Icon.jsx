const P = {
  arrow: "M5 12h14M13 6l6 6-6 6",
  "arrow-ur": "M7 17L17 7M8 7h9v9",
  down: "M12 5v14M6 13l6 6 6-6",
  close: "M6 6l12 12M18 6L6 18",
  menu: "M4 9h16M4 15h16",
  sun: "M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4M12 8a4 4 0 100 8 4 4 0 000-8z",
  moon: "M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z",
  copy: "M9 9h10v10H9zM5 15V5h10",
  check: "M5 12.5l4.5 4.5L19 7.5",
  mail: "M3 6h18v12H3zM3 7l9 6 9-6",
  github:
    "M12 3a9 9 0 00-2.8 17.5c.45.08.6-.2.6-.43v-1.5c-2.5.55-3-1.2-3-1.2-.4-1-1-1.3-1-1.3-.8-.55.06-.54.06-.54.9.06 1.4.93 1.4.93.8 1.4 2.1 1 2.6.76.08-.58.3-1 .57-1.2-2-.23-4.1-1-4.1-4.5 0-1 .35-1.8.93-2.4-.1-.23-.4-1.15.1-2.4 0 0 .77-.25 2.5.93a8.6 8.6 0 014.6 0c1.7-1.2 2.5-.93 2.5-.93.5 1.25.2 2.2.1 2.4.6.6.93 1.4.93 2.4 0 3.5-2.1 4.3-4.1 4.5.3.28.6.83.6 1.7v2.5c0 .24.15.52.6.43A9 9 0 0012 3z",
  chevl: "M15 5l-7 7 7 7",
  chevr: "M9 5l7 7-7 7",
  search: "M11 4a7 7 0 100 14 7 7 0 000-14zM20 20l-4-4",
  star: "M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z",
};
export default function Icon({ n, size = 20, stroke = 1.8, className = "" }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={n === "github" ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true">
      <path d={P[n]} />
    </svg>
  );
}
