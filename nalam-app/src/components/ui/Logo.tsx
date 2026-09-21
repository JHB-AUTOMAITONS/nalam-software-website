import Image from "next/image";

interface LogoProps {
  className?: string;
  priority?: boolean;
}

export function Logo({ className = "h-8 w-auto", priority = false }: LogoProps) {
  return (
    <Image
      src="/images/nalam-logo.png"
      alt="Nalam — Healthcare Simplified"
      width={0}
      height={0}
      sizes="200px"
      priority={priority}
      className={className}
    />
  );
}
