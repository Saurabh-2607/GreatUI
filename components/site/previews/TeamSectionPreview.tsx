"use client";

import React from "react";
import TeamSection from "@/components/ui/TeamSection";

const mockSpeakers = [
  {
    name: "Elena Rostova",
    position: "Founder & CEO",
    company: "Aether Dynamics",
    image:
      "https://ik.imagekit.io/ybq4azred/speaker_avatar_1_1786228750081.png",
    social: "https://linkedin.com",
  },
  {
    name: "Marcus Vance",
    position: "Creative Director",
    company: "Synthetix Labs",
    image:
      "https://ik.imagekit.io/ybq4azred/speaker_avatar_2_1786228763110.png",
    social: "https://x.com/srbh_here",
  },
  {
    name: "Sarah Jenkins",
    position: "VP of Product",
    company: "Chronos AI",
    image:
      "https://ik.imagekit.io/ybq4azred/speaker_avatar_3_1786228776359.png",
    social: "https://github.com",
  },
  {
    name: "Rohan Mehta",
    position: "VP of Engineering",
    company: "Nexus Labs",
    image:
      "https://ik.imagekit.io/ybq4azred/speaker_avatar_4_1786230033482.png",
    social: "https://linkedin.com",
  },
  {
    name: "Clara Oswald",
    position: "Lead Engineer",
    company: "Cyberdyne Systems",
    image:
      "https://ik.imagekit.io/ybq4azred/speaker_avatar_5_1786230051383.png",
    social: "https://github.com",
  },
];

export default function TeamSectionPreview() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="h-full w-full max-w-5xl">
        <TeamSection speakers={mockSpeakers} />
      </div>
    </div>
  );
}
