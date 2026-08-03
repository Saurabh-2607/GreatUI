"use client";

import React from "react";
import { Card } from "@/components/ui/Card";

export default function CardPreview() {
  const cardData = {
    title: "Scenic Valley",
    src: "https://ik.imagekit.io/ybq4azred/valley_aerial_1784924609773.png?updatedAt=1784924724373",
    date: "Aug 04, 2026",
  };

  return (
    <div className="mx-auto flex w-full max-w-xl items-center justify-center p-8 select-none">
      <Card title={cardData.title} src={cardData.src} date={cardData.date} />
    </div>
  );
}
