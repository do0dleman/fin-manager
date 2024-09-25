import React from "react";

interface LogoProps extends React.HTMLProps<HTMLSpanElement> {
  showText?: boolean;
}
const WebsiteLogo = React.forwardRef<HTMLSpanElement, LogoProps>(
  ({ className, showText, ...rest }, ref) => {
    if (showText == undefined) {
      showText = true;
    }

    return (
      <span className={`select-none text-4xl ${className}`} ref={ref} {...rest}>
        {showText ? (
          <>
            <span className="text-primary">Fin</span>Man
          </>
        ) : (
          <span className="text-primary">F</span>
        )}
      </span>
    );
  },
);
export default WebsiteLogo;
