"use client"

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ExternalLink, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'

function OtpViewerContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const url = searchParams.get('url')
  const websiteName = searchParams.get('name')
  const [iframeKey, setIframeKey] = useState(0)

  useEffect(() => {
    if (!url) {
      router.push('/dashboard')
    }
  }, [url, router])

  const handleRefresh = () => {
    setIframeKey(prev => prev + 1)
  }

  const handleOpenInNewTab = () => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  if (!url) {
    return null
  }

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b bg-background"
      >
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              title="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold">OTP Viewer</h1>
              {websiteName && (
                <p className="text-sm text-muted-foreground">{websiteName}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              title="Refresh page"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenInNewTab}
              title="Open in new tab"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open
            </Button>
          </div>
        </div>
      </motion.header>

      {/* URL Bar */}
      <div className="border-b bg-muted/50 px-4 py-2">
        <div className="container flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium">URL:</span>
          <span className="text-xs font-mono truncate flex-1">{url}</span>
        </div>
      </div>

      {/* Iframe Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex-1 relative"
      >
        <iframe
          key={iframeKey}
          src={url}
          className="w-full h-full border-0"
          title="OTP Webpage"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
          allow="clipboard-read; clipboard-write"
        />
      </motion.div>
    </div>
  )
}

export default function OtpViewerPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading OTP viewer...</p>
        </div>
      </div>
    }>
      <OtpViewerContent />
    </Suspense>
  )
}
