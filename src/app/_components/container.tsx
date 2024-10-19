import React from "react";

function Container(props: React.ComponentProps<"div">) {
  const { className, children, ...rest } = props;
  return (
    <div className={`m-auto w-[52rem] ${className}`} {...rest}>
      {children}
    </div>
  );
}

export default Container;
