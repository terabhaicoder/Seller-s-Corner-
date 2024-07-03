'use client';
import AdForm from "@/components/AdForm";

const locationDefault = {
  lat: 28.644800,
  lng: 77.216721,
}

export default function NewAdPage() {
  return (
    <AdForm defaultLocation={locationDefault} />
  );
}