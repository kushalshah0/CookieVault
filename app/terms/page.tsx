import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Cookie, ArrowLeft } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-2">
            <Cookie className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="text-lg font-bold sm:text-xl">CookieVault</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <div className="container px-4 py-6 md:py-10">
        <Link href="/">
          <Button variant="ghost" className="mb-4 md:mb-6" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert text-sm md:text-base">
            <p className="text-muted-foreground">Last updated: January 2024</p>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using CookieVault, you accept and agree to be bound by the terms
              and provision of this agreement.
            </p>

            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily use CookieVault for personal, non-commercial
              transitory viewing only. This is the grant of a license, not a transfer of title.
            </p>

            <h2>3. Disclaimer</h2>
            <p>
              The materials on CookieVault are provided on an 'as is' basis. CookieVault makes no
              warranties, expressed or implied, and hereby disclaims and negates all other
              warranties including, without limitation, implied warranties or conditions of
              merchantability, fitness for a particular purpose, or non-infringement of
              intellectual property or other violation of rights.
            </p>

            <h2>4. Limitations</h2>
            <p>
              In no event shall CookieVault or its suppliers be liable for any damages (including,
              without limitation, damages for loss of data or profit, or due to business
              interruption) arising out of the use or inability to use CookieVault.
            </p>

            <h2>5. Accuracy of Materials</h2>
            <p>
              The materials appearing on CookieVault could include technical, typographical, or
              photographic errors. CookieVault does not warrant that any of the materials on its
              website are accurate, complete or current.
            </p>

            <h2>6. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us through our GitHub
              repository.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
