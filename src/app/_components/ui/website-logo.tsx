import React from "react";

const WebsiteLogo = React.forwardRef<
  HTMLSpanElement,
  React.HTMLProps<HTMLSpanElement>
>(({ className, ...rest }, ref) => {
  return (
    <span className={`select-none text-4xl ${className}`} ref={ref} {...rest}>
      <span className="text-primary">Fin</span>Man
    </span>
  );
});
export default WebsiteLogo;
