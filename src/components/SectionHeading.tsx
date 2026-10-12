import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  label?: string;
  title: string;
  description?: string;
  aside?: ReactNode;
  as?: "h2" | "h3";
};

export function SectionHeading({
  label,
  title,
  description,
  aside,
  as: Heading = "h2"
}: SectionHeadingProps) {
  return (
    <Reveal className="section-heading">
      <div>
        {label ? <p className="section-label">{label}</p> : null}
        <Heading>{title}</Heading>
        {description ? <p>{description}</p> : null}
      </div>
      {aside}
    </Reveal>
  );
}
