'use client'
import React from 'react'
import { motion } from "framer-motion";
export default function LandingText({ children }: { children: string }) {
  return (
    <div className='text-black text-3xl max-w-xs mx-auto
    '>


        {
          children.split(" ").map((word, idx) => {
            return <motion.span
              key={idx}
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.1 * idx }}
            >
              {word}{" "}
            </motion.span>
          })
        }
    </div>
  )
}
