"use client"

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Copy, Pencil, Trash2, Search, ExternalLink, Mail, Key, Users, Cookie as CookieIcon, Shield, X } from 'lucide-react'
import { CookieDialog } from '@/components/cookie-dialog'
import { DeleteDialog } from '@/components/delete-dialog'
import { Navbar } from '@/components/navbar'
import { LoadingSpinner } from '@/components/ui/spinner'
import { UserDialog } from '@/components/user-dialog'
import { UsersListDialog } from '@/components/users-list-dialog'
import { CookieDetailsDialog } from '@/components/cookie-details-dialog'

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

export default function DashboardPage() {
  const { data: session } = useSession()
  const [cookies, setCookies] = useState<Cookie[]>([])
  const [filteredCookies, setFilteredCookies] = useState<Cookie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editingCookie, setEditingCookie] = useState<Cookie | null>(null)
  const [deletingCookie, setDeletingCookie] = useState<Cookie | null>(null)
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false)
  const [isUsersListDialogOpen, setIsUsersListDialogOpen] = useState(false)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [viewingCookie, setViewingCookie] = useState<Cookie | null>(null)
  
  // Check if user is admin
  const isAdmin = session?.user?.role === 'admin' || session?.user?.role === 'superadmin'

  useEffect(() => {
    if (session) {
      fetchCookies()
    }
  }, [session])

  useEffect(() => {
    if (searchQuery) {
      const filtered = cookies.filter(
        (cookie) =>
          cookie.websiteName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cookie.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (cookie.description && cookie.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      setFilteredCookies(filtered)
    } else {
      setFilteredCookies(cookies)
    }
  }, [searchQuery, cookies])

  const fetchCookies = async () => {
    try {
      const response = await fetch('/api/cookies')
      if (response.ok) {
        const data = await response.json()
        // Filter cookies based on user role
        const allCookies = data.cookies
        const userIsAdmin = session?.user?.role === 'admin' || session?.user?.role === 'superadmin'
        const visibleCookies = userIsAdmin ? allCookies : allCookies.filter((c: Cookie) => c.isPublic)
        setCookies(visibleCookies)
        setFilteredCookies(visibleCookies)
      } else {
        toast.error('Failed to fetch cookies')
      }
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async (text: string, type: string = 'Cookie') => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success(`${type} copied to clipboard!`)
    } catch (error) {
      toast.error(`Failed to copy ${type.toLowerCase()}`)
    }
  }

  const handleEdit = (cookie: Cookie) => {
    setEditingCookie(cookie)
    setIsDialogOpen(true)
  }

  const handleDelete = (cookie: Cookie) => {
    setDeletingCookie(cookie)
    setIsDeleteDialogOpen(true)
  }

  const handleViewDetails = (cookie: Cookie) => {
    setViewingCookie(cookie)
    setIsDetailsDialogOpen(true)
  }

  const handleDetailsDialogClose = () => {
    setIsDetailsDialogOpen(false)
    setTimeout(() => setViewingCookie(null), 300)
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setEditingCookie(null)
  }

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false)
    setDeletingCookie(null)
  }

  const handleSaveSuccess = () => {
    fetchCookies()
    handleDialogClose()
  }

  const handleDeleteSuccess = () => {
    fetchCookies()
    handleDeleteDialogClose()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner message="Loading your cookies..." size="xl" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className={`container flex-1 px-4 ${isAdmin ? 'py-6 md:py-6' : 'py-6 md:py-4'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Action Buttons */}
        {isAdmin && (
          <div className="mb-6 grid grid-cols-3 gap-2 sm:flex sm:items-center sm:justify-between">
            <p className="hidden sm:block text-base font-semibold text-foreground">
              Manage users and cookies for your vault
            </p>
            <div className="col-span-3 grid grid-cols-3 gap-2 sm:col-span-auto sm:flex">
              <Button
                variant="outline"
                onClick={() => setIsUsersListDialogOpen(true)}
                className="flex items-center justify-center gap-2"
              >
                <Users className="h-4 w-4 hidden sm:inline" />
                <span className="text-xs sm:text-sm">View Users</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsUserDialogOpen(true)}
                className="flex items-center justify-center gap-2"
              >
                <Users className="h-4 w-4 hidden sm:inline" />
                <span className="text-xs sm:text-sm">Add User</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(true)}
                className="flex items-center justify-center gap-2"
              >
                <Copy className="h-4 w-4 hidden sm:inline" />
                <span className="text-xs sm:text-sm">Add Cookie</span>
              </Button>
            </div>
          </div>
        )}
        
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by website name, slug, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 text-sm md:text-base"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Cookie Cards */}
        {filteredCookies.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 md:py-16">
              <p className="text-sm text-muted-foreground md:text-base">
                {searchQuery
                  ? 'No cookies found matching your search'
                  : 'No cookies yet. Add your first one!'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 md:gap-6">
            {filteredCookies.map((cookie, index) => (
              <motion.div
                key={cookie._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card 
                  className="h-full cursor-pointer hover:shadow-lg transition-all duration-300 hover:border-primary/50"
                  onClick={() => handleViewDetails(cookie)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-base md:text-lg truncate">{cookie.websiteName}</CardTitle>
                          {cookie.websiteUrl && (
                            <a
                              href={cookie.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="flex-shrink-0 text-primary hover:text-primary/80 transition-colors"
                              title="Open website"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                        <CardDescription className="mt-1">
                          <code className="text-xs break-all">{cookie.slug}</code>
                        </CardDescription>
                      </div>
                      {isAdmin && (
                        cookie.isPublic ? (
                          <span className="flex-shrink-0 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
                            Public
                          </span>
                        ) : (
                          <span className="flex-shrink-0 rounded-full bg-red-500/10 px-2 py-1 text-xs font-semibold text-red-600 dark:text-red-400 border border-red-500/20">
                            Private
                          </span>
                        )
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 md:space-y-4">
                    {cookie.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2 md:text-sm">
                        {cookie.description}
                      </p>
                    )}

                    {/* Credentials Section */}
                    {(cookie.email || cookie.password || cookie.cookies) && (
                      <div className="space-y-2">
                        {cookie.email && (
                          <div className="flex items-center gap-2 text-xs">
                            <Mail className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                            <span className="text-muted-foreground truncate flex-1">{cookie.email}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleCopy(cookie.email!, 'Email')
                              }}
                              className="h-6 w-6 p-0 flex-shrink-0"
                              title="Copy email"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                        {cookie.password && (
                          <div className="flex items-center gap-2 text-xs">
                            <Key className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                            <span className="text-muted-foreground flex-1">••••••••</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleCopy(cookie.password!, 'Password')
                              }}
                              className="h-6 w-6 p-0 flex-shrink-0"
                              title="Copy password"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                        {cookie.cookies && (
                          <div className="flex items-center gap-2 text-xs">
                            <CookieIcon className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                            <span className="text-muted-foreground text-[10px] font-mono truncate flex-1">
                              {cookie.cookies.substring(0, 50)}...
                            </span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleCopy(cookie.cookies, 'Cookie')
                              }}
                              className="h-6 w-6 p-0 flex-shrink-0"
                              title="Copy cookies"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                        {cookie.otpWebpage && (
                          <div className="flex items-center gap-2 text-xs">
                            <Shield className="h-3 w-3 text-purple-500 flex-shrink-0" />
                            <span className="text-purple-600 dark:text-purple-400 font-medium flex-1">Has OTP Access</span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Updated: {new Date(cookie.updatedAt).toLocaleDateString()}</span>
                      {isAdmin && (
                        <div className="flex gap-1.5">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEdit(cookie)
                            }}
                            className="h-7 w-7 p-0"
                            title="Edit"
                          >
                            <Pencil className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDelete(cookie)
                            }}
                            className="h-7 w-7 p-0"
                            title="Delete"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      <CookieDialog
        open={isDialogOpen}
        onOpenChange={handleDialogClose}
        cookie={editingCookie}
        onSuccess={handleSaveSuccess}
      />

      <DeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={handleDeleteDialogClose}
        cookie={deletingCookie}
        onSuccess={handleDeleteSuccess}
      />

      {isAdmin && (
        <>
          <UserDialog
            open={isUserDialogOpen}
            onOpenChange={setIsUserDialogOpen}
            onSuccess={() => {
              toast.success('User created successfully!')
            }}
          />

          <UsersListDialog
            open={isUsersListDialogOpen}
            onOpenChange={setIsUsersListDialogOpen}
          />
        </>
      )}

      <CookieDetailsDialog
        open={isDetailsDialogOpen}
        onOpenChange={handleDetailsDialogClose}
        cookie={viewingCookie}
        isAdmin={isAdmin}
      />
      </div>
      
      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container px-4">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} CookieVault. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
