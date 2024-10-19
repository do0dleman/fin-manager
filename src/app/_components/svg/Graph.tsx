import React from "react";

function Graph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="284"
      height="259"
      viewBox="0 0 284 259"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 227.5C1 227.5 10 141 40 128C70 115 89.5 175.5 117.5 160C145.5 144.5 137.5 92.5 161 84.5C184.5 76.5 207.5 121.5 236.5 114C265.5 106.5 278 9.5 278 9.5"
        stroke="#EA580C"
      />
      <path
        d="M40 129C10 142 1 228.5 1 228.5V259H278V10.5C278 10.5 265.5 107.5 236.5 115C207.5 122.5 184.5 77.5 161 85.5C137.5 93.5 145.5 145.5 117.5 161C89.5 176.5 70 116 40 129Z"
        fill="url(#paint0_linear_34_52)"
      />
      <circle cx="278.5" cy="5" r="5" fill="#EA580C" />
      <defs>
        <linearGradient
          id="paint0_linear_34_52"
          x1="74.5"
          y1="19"
          x2="153"
          y2="225.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#EA580C" />
          <stop offset="1" stop-color="#0C0A09" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default Graph;
