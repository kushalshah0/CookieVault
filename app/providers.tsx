"use client"

import { SessionProvider } from "next-auth/react"
import { SessionContextProvider } from "@/contexts/session-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider 
      refetchInterval={10 * 60} // Refetch session every 10 minutes
      refetchOnWindowFocus={false} // Disable refetch on focus
    >
      <SessionContextProvider>
        {children}
      </SessionContextProvider>
    </SessionProvider>
  )
}
