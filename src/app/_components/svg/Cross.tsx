import React from "react";

function Cross(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="39"
      height="39"
      viewBox="0 0 39 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line
        x1="19.5"
        y1="15"
        x2="19.5"
        y2="6.55671e-08"
        stroke="#A8A29E"
        stroke-width="3"
      />
      <line
        x1="24"
        y1="19.5"
        x2="39"
        y2="19.5"
        stroke="#A8A29E"
        stroke-width="3"
      />
      <line
        x1="19.5"
        y1="24"
        x2="19.5"
        y2="39"
        stroke="#A8A29E"
        stroke-width="3"
      />
      <line
        x1="15"
        y1="19.5"
        x2="-1.31134e-07"
        y2="19.5"
        stroke="#A8A29E"
        stroke-width="3"
      />
    </svg>
  );
}

export default Cross;
