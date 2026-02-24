import React from "react";

interface CustomScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const CustomScrollArea: React.FC<CustomScrollAreaProps> = ({ 
  children, 
  className = "", 
  ...props 
}) => {
  return (
    <div
      className={`
        overflow-y-auto
        [&::-webkit-scrollbar]:w-1.5
        pr-3        
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default CustomScrollArea;