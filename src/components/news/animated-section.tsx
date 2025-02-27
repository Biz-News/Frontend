'use client';

import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

interface AnimatedSectionProps extends PropsWithChildren {
  delay: number;
}

export function AnimatedSection({ children, delay }: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: delay * 0.25,
        ease: [0.4, 0, 0.2, 1]
      }}
    >
      {children}
    </motion.div>
  );
} 