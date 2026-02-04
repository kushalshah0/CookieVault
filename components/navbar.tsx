"use client"

import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { useSessionContext } from '@/contexts/session-context'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { Cookie, LogOut, User } from 'lucide-react'

export function Navbar() {
  const { session } = useSessionContext()

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Cookie className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="text-lg font-bold sm:text-xl">CookieVault</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          {session ? (
            <>
              {session.user?.name && (
                <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  {session.user.role === 'user' ? (
                    <span>{session.user.name}</span>
                  ) : (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      {session.user.role}
                    </span>
                  )}
                </div>
              )}
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut({ callbackUrl: '/' })}
                className="hidden sm:flex"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => signOut({ callbackUrl: '/' })}
                className="sm:hidden"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <ThemeToggle />
              <Link href="/login" className="hidden sm:block">
                <Button>Login to Dashboard</Button>
              </Link>
              <Link href="/login" className="sm:hidden">
                <Button size="sm">Login</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
