"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Copy, ExternalLink, Mail, Key, Shield, Cookie as CookieIcon, Globe, Calendar, Eye, EyeOff, RefreshCw } from 'lucide-react'

interface Cookie {
  _id: string
  websiteName: string
  websiteUrl?: string
  slug: string
  description?: string
  email?: string
  password?: string
  otpWebpage?: string
  cookies: string
  isPublic: boolean
  createdAt: string
  updatedAt: string
}

interface CookieDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  cookie: Cookie | null
  isAdmin?: boolean
}

export function CookieDetailsDialog({ open, onOpenChange, cookie, isAdmin = false }: CookieDetailsDialogProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showOtpViewer, setShowOtpViewer] = useState(false)
  const [iframeKey, setIframeKey] = useState(0)

  // Reset OTP viewer state when modal closes or cookie changes
  useEffect(() => {
    if (!open) {
      setShowOtpViewer(false)
      setShowPassword(false)
    }
  }, [open])

  useEffect(() => {
    setShowOtpViewer(false)
    setShowPassword(false)
  }, [cookie?._id])

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success(`${type} copied to clipboard!`)
    } catch (error) {
      toast.error(`Failed to copy ${type.toLowerCase()}`)
    }
  }

  const handleToggleOtpViewer = () => {
    setShowOtpViewer(!showOtpViewer)
    if (!showOtpViewer) {
      setIframeKey(prev => prev + 1)
    }
  }

  const handleRefreshOtp = () => {
    setIframeKey(prev => prev + 1)
  }

  if (!cookie) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] sm:w-full sm:max-w-[650px] max-h-[90vh] overflow-hidden p-0">
        {/* Header Section */}
        <div className="px-6 pt-6 pb-4 border-b bg-gradient-to-br from-primary/5 via-background to-background">
          <DialogHeader>
            <div className="flex flex-col gap-2">
              <DialogTitle className="text-2xl font-bold tracking-tight flex items-center gap-3">
                <span className="truncate">{cookie.websiteName}</span>
                {cookie.isPublic && (
                  <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-600 dark:text-green-400 whitespace-nowrap border border-green-500/20">
                    Public
                  </span>
                )}
              </DialogTitle>
              {cookie.websiteUrl && (
                <DialogDescription className="flex items-center gap-2">
                  <Globe className="h-3 w-3 flex-shrink-0" />
                  <a 
                    href={cookie.websiteUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-1 truncate"
                  >
                    {cookie.websiteUrl}
                    <ExternalLink className="h-3 w-3 flex-shrink-0" />
                  </a>
                </DialogDescription>
              )}
            </div>
          </DialogHeader>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-180px)] px-6 py-4">
          <div className="space-y-4">
            {/* Description */}
            {cookie.description && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-xl border bg-muted/30 p-4 backdrop-blur-sm"
              >
                <p className="text-sm leading-relaxed text-muted-foreground">{cookie.description}</p>
              </motion.div>
            )}

            {/* Email */}
            {cookie.email && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="space-y-2"
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <div className="rounded-md bg-blue-500/10 p-1.5">
                    <Mail className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span>Email Address</span>
                </div>
                <div className="group relative flex items-center gap-2 rounded-xl border-2 bg-background p-4 transition-all hover:border-primary/50 hover:bg-primary/5">
                  <span className="flex-1 text-sm font-mono truncate">{cookie.email}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleCopy(cookie.email!, 'Email')}
                    className="flex-shrink-0 hover:bg-primary/10"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Password */}
            {cookie.password && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-2"
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <div className="rounded-md bg-amber-500/10 p-1.5">
                    <Key className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <span>Password</span>
                </div>
                <div className="group relative flex items-center gap-2 rounded-xl border-2 bg-background p-4 transition-all hover:border-primary/50 hover:bg-primary/5">
                  <span className="flex-1 text-sm font-mono">
                    {showPassword ? cookie.password : '••••••••••••'}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowPassword(!showPassword)}
                    className="flex-shrink-0 hover:bg-primary/10"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleCopy(cookie.password!, 'Password')}
                    className="flex-shrink-0 hover:bg-primary/10"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* OTP */}
            {cookie.otpWebpage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <div className="rounded-md bg-purple-500/10 p-1.5">
                      <Shield className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <span>OTP</span>
                  </div>
                  {showOtpViewer && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleRefreshOtp}
                      className="h-8 hover:bg-purple-500/10"
                      title="Refresh OTP page"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
                
                {!showOtpViewer ? (
                  <Button
                    onClick={handleToggleOtpViewer}
                    className="w-full h-12 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 transition-all"
                    size="lg"
                  >
                    <Shield className="h-5 w-5 mr-2" />
                    View OTP
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <div className="rounded-xl border-2 overflow-hidden bg-background" style={{ height: '500px' }}>
                      <iframe
                        key={iframeKey}
                        src={cookie.otpWebpage}
                        className="w-full h-full border-0"
                        title="OTP Webpage"
                        sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                        allow="clipboard-read; clipboard-write"
                      />
                    </div>
                    <Button
                      onClick={handleToggleOtpViewer}
                      variant="outline"
                      className="w-full h-10 border-2 hover:bg-purple-500/5 hover:border-purple-500/50"
                    >
                      Hide OTP Viewer
                    </Button>
                  </div>
                )}
              </motion.div>
            )}

            {/* Cookies */}
            {cookie.cookies && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <div className="rounded-md bg-orange-500/10 p-1.5">
                    <CookieIcon className="h-3.5 w-3.5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <span>Cookie Data</span>
                </div>
                <div className="group relative rounded-xl border-2 bg-muted/50 p-4 transition-all hover:border-primary/50">
                  <pre className="text-xs font-mono whitespace-pre-wrap break-all max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
{cookie.cookies}
                  </pre>
                </div>
                <Button
                  variant="outline"
                  onClick={() => handleCopy(cookie.cookies, 'Cookie')}
                  className="w-full h-10 border-2 hover:bg-primary/5 hover:border-primary/50 transition-all"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Cookie Data
                </Button>
              </motion.div>
            )}

            {/* Metadata */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="space-y-2 pt-4 border-t"
            >
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5" />
                  Created
                </span>
                <span className="font-medium text-xs">{new Date(cookie.createdAt).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5" />
                  Updated
                </span>
                <span className="font-medium text-xs">{new Date(cookie.updatedAt).toLocaleString()}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
