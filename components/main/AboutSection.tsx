"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Section } from "./section";

export function AboutSection() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Section title="About">
      <div>
        <motion.div
          initial={{ opacity: 0, x: -70 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="mb-4">
            I’m a developer passionate about creating websites and mobile apps,
            driven by a love for coding since high school. I focus on continuous
            learning, helping others, and building features that make a
            difference—all while enjoying life, faith, and the occasional
            adventure.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
