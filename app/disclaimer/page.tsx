import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Cookie, ArrowLeft, AlertTriangle } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

export default function DisclaimerPage() {
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

        <Card className="border-yellow-500/50">
          <CardHeader>
            <div className="flex items-center gap-2 md:gap-3">
              <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-500 md:h-8 md:w-8" />
              <CardTitle className="text-2xl md:text-3xl">Disclaimer</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert text-sm md:text-base">
            <p className="text-muted-foreground">Last updated: January 2024</p>

            <h2>Educational and Testing Purposes Only</h2>
            <p>
              CookieVault is designed and intended exclusively for educational purposes and testing
              in controlled development environments. This tool should only be used by developers
              and testers working on their own applications or applications they have explicit
              authorization to test.
            </p>

            <h2>User Responsibility</h2>
            <p>
              Users of CookieVault are solely responsible for:
            </p>
            <ul>
              <li>Ensuring they have proper authorization to access and use any cookies stored in this application</li>
              <li>Complying with all applicable laws and regulations regarding data privacy and security</li>
              <li>Understanding and accepting the risks associated with storing sensitive information</li>
              <li>Implementing appropriate security measures when deploying this application</li>
            </ul>

            <h2>No Liability</h2>
            <p>
              The creators and maintainers of CookieVault:
            </p>
            <ul>
              <li>Are not responsible for any misuse of this tool</li>
              <li>Do not endorse any unauthorized access to systems or data</li>
              <li>Are not liable for any damages, losses, or legal consequences arising from the use of this application</li>
              <li>Make no warranties about the security or reliability of this application</li>
            </ul>

            <h2>Security Considerations</h2>
            <p>
              While CookieVault implements authentication and basic security measures, users should:
            </p>
            <ul>
              <li>Never store production credentials or sensitive data without proper encryption</li>
              <li>Use strong, unique passwords for admin accounts</li>
              <li>Regularly update dependencies and security patches</li>
              <li>Deploy with proper SSL/TLS certificates in production</li>
              <li>Implement additional security layers as needed for their use case</li>
            </ul>

            <h2>Ethical Guidelines</h2>
            <p>
              Users must:
            </p>
            <ul>
              <li>Respect privacy laws and regulations (GDPR, CCPA, etc.)</li>
              <li>Only access cookies they are authorized to use</li>
              <li>Not use this tool for malicious purposes</li>
              <li>Follow ethical hacking and testing guidelines</li>
              <li>Obtain proper consent before accessing user data</li>
            </ul>

            <h2>Changes to This Disclaimer</h2>
            <p>
              We reserve the right to update this disclaimer at any time. Continued use of
              CookieVault after changes constitutes acceptance of the updated disclaimer.
            </p>

            <h2>Contact</h2>
            <p>
              If you have questions about this disclaimer or the appropriate use of CookieVault,
              please reach out through our GitHub repository.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
