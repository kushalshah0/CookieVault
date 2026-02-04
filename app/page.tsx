"use client"

import { useSessionContext } from '@/contexts/session-context'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Navbar } from '@/components/navbar'
import { 
  Shield, 
  Copy, 
  Lock, 
  Palette, 
  Zap,
  Cookie,
  AlertTriangle
} from 'lucide-react'

export default function Home() {
  const { session, status } = useSessionContext()
  
  const features = [
    {
      icon: Copy,
      title: 'One-Click Cookie Copying',
      description: 'Copy cookies instantly with a single click for quick testing and development.',
    },
    {
      icon: Shield,
      title: 'Centralized Management',
      description: 'Store and organize all your website cookies in one secure location.',
    },
    {
      icon: Lock,
      title: 'Secure Admin Access',
      description: 'Protected admin-only dashboard with robust authentication.',
    },
    {
      icon: Palette,
      title: 'Dark & Light Theme',
      description: 'Choose between dark and light modes or let it follow your system preference.',
    },
    {
      icon: Zap,
      title: 'Modern, Fast UI',
      description: 'Built with Next.js and React for blazing-fast performance.',
    },
    {
      icon: Cookie,
      title: 'Organized Storage',
      description: 'Tag and categorize cookies for easy retrieval and management.',
    },
  ]

  const steps = [
    {
      number: '01',
      title: 'Get Access',
      description: 'Login with credentials provided by your admin to access the cookie vault.',
    },
    {
      number: '02',
      title: 'Browse Cookies',
      description: 'View public cookies shared by admins. Admins have full access to manage all cookies.',
    },
    {
      number: '03',
      title: 'Copy Instantly',
      description: 'Access and copy stored cookies, emails, and passwords whenever you need them.',
    },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="container px-4 py-16 md:py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="mb-6 flex justify-center md:mb-8">
            <Cookie className="h-16 w-16 text-primary md:h-20 md:w-20" />
          </div>
          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl md:mb-6">
            A Secure Vault for Managing Website Cookies
          </h1>
          <p className="mb-6 text-base text-muted-foreground sm:text-lg md:text-xl md:mb-8">
            CookieVault is a modern, secure application for developers and testers to manage,
            store, and quickly copy website cookies for testing purposes.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
            {status === 'loading' ? (
              <Button size="lg" className="w-full sm:w-auto" disabled>
                Loading...
              </Button>
            ) : status === 'authenticated' ? (
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button size="lg" className="w-full">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/login" className="w-full sm:w-auto">
                <Button size="lg" className="w-full">
                  Login to Dashboard
                </Button>
              </Link>
            )}
            <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
              <a href="#features">Learn More</a>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-t bg-muted/50 py-16 md:py-24">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center md:mb-16"
          >
            <h2 className="mb-3 text-2xl font-bold sm:text-3xl md:text-4xl md:mb-4">Features</h2>
            <p className="text-base text-muted-foreground sm:text-lg">
              Everything you need to manage cookies efficiently
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <feature.icon className="mb-2 h-8 w-8 text-primary md:h-10 md:w-10" />
                    <CardTitle className="text-lg md:text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm md:text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center md:mb-16"
          >
            <h2 className="mb-3 text-2xl font-bold sm:text-3xl md:text-4xl md:mb-4">How It Works</h2>
            <p className="text-base text-muted-foreground sm:text-lg">
              Get started in three simple steps
            </p>
          </motion.div>

          <div className="mx-auto max-w-4xl space-y-8 md:space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex flex-col gap-4 sm:flex-row sm:gap-6 md:gap-8"
              >
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground sm:h-14 sm:w-14 md:h-16 md:w-16 md:text-2xl">
                    {step.number}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-bold sm:text-2xl">{step.title}</h3>
                  <p className="text-base text-muted-foreground sm:text-lg">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 md:py-12">
        <div className="container px-4">
          <div className="flex items-center justify-center">
            <p className="text-sm text-foreground/70 sm:text-base">
              © 2024 CookieVault. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
