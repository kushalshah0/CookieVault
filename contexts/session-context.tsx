"use client"

import { createContext, useContext, ReactNode, useMemo } from 'react'
import { useSession as useNextAuthSession } from 'next-auth/react'
import type { Session } from 'next-auth'

interface SessionContextType {
  session: Session | null
  status: 'loading' | 'authenticated' | 'unauthenticated'
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

export function SessionContextProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useNextAuthSession()

  // Memoize the value to prevent unnecessary re-renders
  const value = useMemo(() => ({ session, status }), [session, status])

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSessionContext() {
  const context = useContext(SessionContext)
  if (context === undefined) {
    throw new Error('useSessionContext must be used within SessionContextProvider')
  }
  return context
}
