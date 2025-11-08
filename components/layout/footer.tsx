import Link from "next/link"
import { Twitter, Linkedin, Github } from "lucide-react"
import { FOOTER } from "@/lib/constants"

export function Footer() {
  const socialIcons = {
    Twitter,
    Linkedin,
    Github,
  }

  return (
    <footer className="w-full border-t bg-muted/30">
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Section */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                AI
              </div>
              <span>AI Detector</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {FOOTER.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="flex flex-col gap-2">
              {FOOTER.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Support */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">Legal</h3>
            <ul className="flex flex-col gap-2">
              {FOOTER.legal.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-semibold mt-2">Support</h3>
            <ul className="flex flex-col gap-2">
              {FOOTER.support.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">Follow Us</h3>
            <div className="flex gap-4">
              {FOOTER.social.map((social, index) => {
                const Icon = socialIcons[social.icon as keyof typeof socialIcons]
                return (
                  <Link
                    key={index}
                    href={social.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon className="size-5" />
                    <span className="sr-only">{social.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-12 pt-8 border-t">
          <p className="text-sm text-muted-foreground">{FOOTER.copyright}</p>
          <p className="text-sm text-muted-foreground">
            {FOOTER.tagline}
          </p>
        </div>
      </div>
    </footer>
  )
}
