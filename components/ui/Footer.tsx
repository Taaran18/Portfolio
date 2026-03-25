import { Github, Linkedin, Twitter, Mail } from 'lucide-react'

const socialLinks = [
  { icon: Github, href: 'https://github.com/Taaran18', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/taaran-jain/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:taaranjain16@gmail.com', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-slate-400 dark:text-slate-500 text-sm font-mono">
          &copy; {new Date().getFullYear()} Taaran Jain. Built with Next.js &amp; Three.js
        </p>
        <div className="flex items-center gap-5">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-slate-400 hover:text-cyan-500 transition-colors"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
