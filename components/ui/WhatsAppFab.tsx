'use client'

import { motion } from 'framer-motion'
import { WhatsApp } from '@/components/ui/icons'
import { whatsappUrl } from '@/lib/site'

const HREF = whatsappUrl()

export default function WhatsAppFab() {
  if (!HREF) return null

  return (
    <motion.a
      href={HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.3 }}
      whileTap={{ scale: 0.92 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366]
        flex items-center justify-center shadow-lg shadow-[#25D366]/30
        hover:scale-105 transition-transform
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
    >
      <WhatsApp size={26} className="text-white" />
    </motion.a>
  )
}
