"use client";

import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  vehicleId: string;
  stockNumber: string;
  make: string;
  model: string;
  year: number;
}

const WhatsAppButton = ({ vehicleId, stockNumber, make, model, year }: WhatsAppButtonProps) => {
  const message = encodeURIComponent(
    `Habari! Nina nia na ${year} ${make} ${model} — Stock #${stockNumber}. Tafadhali nipe maelezo zaidi.`
  );

  const whatsappUrl = `https://wa.me/255711398600?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target='_blank'
      rel='noopener noreferrer'
      className='whatsapp-btn'
      aria-label={`Inquire about ${year} ${make} ${model} on WhatsApp`}
    >
      <MessageCircle size={20} />
      Inquire on WhatsApp
    </a>
  );
};

export default WhatsAppButton;
