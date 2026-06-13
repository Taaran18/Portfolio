import { Github, Linkedin, Twitter, Mail } from 'lucide-react'

const socialLinks = [
  { icon: Github, href: 'https://github.com/Taaran18', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/taaran-jain/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:taaranjain16@gmail.com', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-black/5 dark:border-white/5">
      <div className="container-wide grid gap-6 md:grid-cols-3 items-center text-center">
        {/* Left — brand */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <a href="#" className="text-lg font-bold font-mono text-gradient hover:opacity-80 transition-opacity">
            &lt;TJ /&gt;
          </a>
          <p className="text-slate-400 dark:text-slate-500 text-xs">
            AI Engineer · Jaipur, India
          </p>
        </div>

        {/* Center — copyright */}
        <p className="text-slate-400 dark:text-slate-500 text-sm font-mono">
          &copy; {new Date().getFullYear()} Taaran Jain. All rights reserved.
        </p>

        {/* Right — socials */}
        <div className="flex items-center justify-center md:justify-end gap-5">
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
