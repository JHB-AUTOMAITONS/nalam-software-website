import { type ElementType, type ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

export function Container({ children, className = "", as: Tag = "div" }: ContainerProps) {
  return (
    <Tag className={`mx-auto w-full max-w-7xl px-4 xs:px-5 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </Tag>
  );
}
