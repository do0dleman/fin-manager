import React from "react";
import AppIcon from "../svg/AppIcon";

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
            <div className="inline-flex gap-2">
              <AppIcon />{" "}
              <span>
                <span className="text-primary">Fin</span>Man
              </span>
            </div>
          </>
        ) : (
          <div className="inline-flex items-center">
            <AppIcon />
          </div>
        )}
      </span>
    );
  },
);
export default WebsiteLogo;
