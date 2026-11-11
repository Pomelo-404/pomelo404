import type { ReactNode } from "react";
import WhatsAppIcon from "@/components/WhatsAppIcon";

/** Un único estilo de WhatsApp para cotizador, servicios y contacto. */
export default function WhatsAppButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      className={`button button-light button-whatsapp ${className}`.trim()}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <span aria-hidden="true"><WhatsAppIcon /></span>
    </a>
  );
}
