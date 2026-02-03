"use client"

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Spinner } from '@/components/ui/spinner'
import { Eye, EyeOff, Mail, Cookie as CookieIcon } from 'lucide-react'

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
}

interface CookieDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  cookie?: Cookie | null
  onSuccess: () => void
}

export function CookieDialog({ open, onOpenChange, cookie, onSuccess }: CookieDialogProps) {
  const [websiteName, setWebsiteName] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otpWebpage, setOtpWebpage] = useState('')
  const [cookies, setCookies] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [credentialType, setCredentialType] = useState<'both' | 'credentials' | 'cookies'>('both')

  useEffect(() => {
    if (cookie) {
      setWebsiteName(cookie.websiteName)
      setWebsiteUrl(cookie.websiteUrl || '')
      setSlug(cookie.slug)
      setDescription(cookie.description || '')
      setEmail(cookie.email || '')
      setPassword(cookie.password || '')
      setOtpWebpage(cookie.otpWebpage || '')
      setCookies(cookie.cookies)
      setIsPublic(cookie.isPublic)
    } else {
      resetForm()
    }
  }, [cookie, open])

  const resetForm = () => {
    setWebsiteName('')
    setWebsiteUrl('')
    setSlug('')
    setDescription('')
    setEmail('')
    setPassword('')
    setOtpWebpage('')
    setCookies('')
    setIsPublic(false)
    setShowPassword(false)
    setCredentialType('both')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!websiteName.trim() || !slug.trim()) {
      toast.error('Website name and slug are required')
      return
    }

    // Validate based on credential type
    if (credentialType === 'both') {
      if (!email.trim() && !password.trim() && !cookies.trim()) {
        toast.error('Please provide at least one: email, password, or cookies')
        return
      }
    } else if (credentialType === 'credentials') {
      if (!email.trim() && !password.trim()) {
        toast.error('Please provide at least email or password')
        return
      }
    } else if (credentialType === 'cookies') {
      if (!cookies.trim()) {
        toast.error('Please provide cookie data')
        return
      }
    }

    setIsLoading(true)

    const data = {
      websiteName,
      websiteUrl,
      slug,
      description,
      email: credentialType === 'cookies' ? '' : email,
      password: credentialType === 'cookies' ? '' : password,
      otpWebpage,
      cookies: credentialType === 'credentials' ? '' : cookies,
      isPublic,
    }

    try {
      const url = cookie ? `/api/cookies/${cookie._id}` : '/api/cookies'
      const method = cookie ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success(cookie ? 'Cookie updated successfully' : 'Cookie created successfully')
        onSuccess()
        resetForm()
      } else {
        toast.error(result.error || 'Something went wrong')
      }
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const generateSlug = () => {
    const generated = websiteName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    setSlug(generated)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{cookie ? 'Edit Cookie' : 'Add New Cookie'}</DialogTitle>
          <DialogDescription>
            {cookie
              ? 'Update the cookie information below'
              : 'Fill in the details to create a new cookie entry'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="websiteName">Website Name *</Label>
            <Input
              id="websiteName"
              placeholder="e.g., Example Website"
              value={websiteName}
              onChange={(e) => setWebsiteName(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="websiteUrl">Website URL</Label>
            <Input
              id="websiteUrl"
              type="url"
              placeholder="e.g., https://example.com"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">
              Optional: Add URL for quick navigation
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug *</Label>
            <div className="flex gap-2">
              <Input
                id="slug"
                placeholder="e.g., example-website"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="outline"
                onClick={generateSlug}
                disabled={!websiteName || isLoading}
              >
                Generate
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Optional description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isLoading}
              rows={3}
            />
          </div>

          {/* Credential Type Selector */}
          <div className="space-y-3 border-t pt-4">
            <Label>Credential Type *</Label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setCredentialType('both')}
                disabled={isLoading}
                className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all ${
                  credentialType === 'both'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex gap-1">
                  <Mail className="h-4 w-4" />
                  <CookieIcon className="h-4 w-4" />
                </div>
                <span className="text-xs font-medium">Both</span>
              </button>
              <button
                type="button"
                onClick={() => setCredentialType('credentials')}
                disabled={isLoading}
                className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all ${
                  credentialType === 'credentials'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <Mail className="h-4 w-4" />
                <span className="text-xs font-medium">Email/Pass</span>
              </button>
              <button
                type="button"
                onClick={() => setCredentialType('cookies')}
                disabled={isLoading}
                className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all ${
                  credentialType === 'cookies'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <CookieIcon className="h-4 w-4" />
                <span className="text-xs font-medium">Cookies</span>
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              Select what type of credentials you want to store for this website
            </p>
          </div>

          {/* Email/Password Section */}
          {(credentialType === 'both' || credentialType === 'credentials') && (
            <>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email for this website"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password for this website"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              
              {/* OTP Webpage Field */}
              <div className="space-y-2">
                <Label htmlFor="otpWebpage">OTP Webpage (Optional)</Label>
                <Input
                  id="otpWebpage"
                  type="url"
                  placeholder="https://example.com/otp-page"
                  value={otpWebpage}
                  onChange={(e) => setOtpWebpage(e.target.value)}
                  disabled={isLoading}
                />
                <p className="text-xs text-muted-foreground">
                  URL to webpage where OTP codes arrive (will be viewable in app)
                </p>
              </div>
            </>
          )}

          {/* Cookie Data Section */}
          {(credentialType === 'both' || credentialType === 'cookies') && (
            <div className="space-y-2">
              <Label htmlFor="cookies">Cookie Data</Label>
              <Textarea
                id="cookies"
                placeholder="Paste your cookie data here..."
                value={cookies}
                onChange={(e) => setCookies(e.target.value)}
                disabled={isLoading}
                rows={6}
                className="font-mono text-xs"
              />
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Switch
              id="isPublic"
              checked={isPublic}
              onCheckedChange={setIsPublic}
              disabled={isLoading}
            />
            <Label htmlFor="isPublic" className="cursor-pointer">
              Make this cookie public
            </Label>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Spinner size="sm" className="border-primary-foreground border-t-transparent" />
                  Saving...
                </span>
              ) : (
                cookie ? 'Update' : 'Create'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
