"use client"

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { AlertTriangle, X } from 'lucide-react'

const SESSION_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds
const WARNING_TIME = 5 * 60 * 1000 // Show warning 5 minutes before expiry

export function SessionTimeoutWarning() {
  const { data: session } = useSession()
  const [showWarning, setShowWarning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)

  useEffect(() => {
    if (!session) {
      setShowWarning(false)
      return
    }

    // Calculate when to show warning
    const warningTimeout = setTimeout(() => {
      setShowWarning(true)
    }, SESSION_DURATION - WARNING_TIME)

    // Update countdown every second
    const countdownInterval = setInterval(() => {
      const now = Date.now()
      const sessionStart = session ? new Date(session.expires).getTime() - SESSION_DURATION : 0
      const remaining = sessionStart + SESSION_DURATION - now

      if (remaining <= WARNING_TIME && remaining > 0) {
        setTimeLeft(Math.floor(remaining / 1000)) // Convert to seconds
      } else if (remaining <= 0) {
        setShowWarning(false)
      }
    }, 1000)

    return () => {
      clearTimeout(warningTimeout)
      clearInterval(countdownInterval)
    }
  }, [session])

  const handleDismiss = () => {
    setShowWarning(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!showWarning || !session) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md"
      >
        <div className="bg-amber-500/90 backdrop-blur-sm text-white rounded-lg shadow-lg border-2 border-amber-600 p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-white/20 p-2 flex-shrink-0">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-base mb-1">Session Expiring Soon</h4>
              <p className="text-sm text-white/90 mb-2">
                Your session will expire in <span className="font-bold">{formatTime(timeLeft)}</span>
              </p>
              <p className="text-xs text-white/80">
                Please save your work. You'll need to login again.
              </p>
            </div>
            <button
              onClick={handleDismiss}
              className="flex-shrink-0 rounded-full p-1 hover:bg-white/20 transition-colors"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
