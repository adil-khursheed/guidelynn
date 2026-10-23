import { cn } from "@/lib/utils";

const StudyIllustration = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 400 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={cn("h-auto w-full select-none", className)}>
      <ellipse cx="200" cy="300" rx="132" ry="14" fill="#000" opacity="0.07" />

      <g
        strokeLinejoin="round"
        strokeLinecap="round"
        className="stroke-border">
        <path
          d="M40 182.5 213 282.5V295.5L40 195.5Z"
          className="fill-accent"
          strokeWidth="2"
        />
        <path
          d="M213 282.5 360 197.5V210.5L213 295.5Z"
          className="fill-accent"
          strokeWidth="2"
        />
        <path
          d="M187 97.5 360 197.5 213 282.5 40 182.5Z"
          className="fill-accent"
          strokeWidth="2"
        />

        <g className="stroke-border" strokeWidth="0.75" opacity="0.55">
          <path d="M42 186.5 211 285.8" />
          <path d="M42 190.5 211 289.8" />
          <path d="M215 286.3 358 202" />
          <path d="M215 290.3 358 206" />
        </g>

        <path
          d="M192 103 352 199 284 236 118 143Z"
          className="fill-card stroke-border dark:fill-popover"
          strokeWidth="1.5"
        />
        <path
          d="M118 143 284 236 206 276 48 185Z"
          className="fill-card stroke-border dark:fill-popover"
          strokeWidth="1.5"
        />
        <path
          d="M118 143 284 236 206 276 48 185Z"
          fill="#000"
          opacity="0.025"
        />

        <g className="stroke-border" strokeWidth="1" opacity="0.75">
          <path d="M181.1 178.3 255.1 138.3" />
          <path d="M111.1 220.3 181.1 178.3" />
          <path d="M230.9 206.2 304.9 166.2" />
          <path d="M160.9 248.2 230.9 206.2" />
        </g>

        <path
          d="M118 143 284 236"
          className="stroke-input"
          strokeWidth="2"
          opacity="0.8"
        />

        <path
          d="M95 224C137 209 159 202 195 186S261 160 298 150"
          className="stroke-primary"
          strokeWidth="3.5"
          strokeDasharray="0 8"
        />

        <circle
          cx="155"
          cy="210"
          r="3.5"
          className="fill-card stroke-primary dark:fill-popover"
          strokeWidth="2"
        />
        <circle
          cx="246"
          cy="169"
          r="3.5"
          className="fill-card stroke-primary dark:fill-popover"
          strokeWidth="2"
        />

        <path
          d="M298 150V116"
          className="stroke-primary"
          strokeWidth="2.5"
        />
        <path
          d="M298 116 324 123 298 132Z"
          className="fill-primary stroke-primary"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  );
};

export default StudyIllustration;
