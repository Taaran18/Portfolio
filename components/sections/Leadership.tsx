'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Trophy, Star } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

interface LeadershipRole {
  id: string
  title: string
  organisation: string
  period: string
  description: string
  impact: string[]
  icon: 'users' | 'trophy' | 'star'
}

const ROLES: LeadershipRole[] = [
  {
    id: '1',
    title: 'AI/ML Lead',
    organisation: 'GDSC Poornima',
    period: 'Sep 2023 – Aug 2024',
    description: 'Owned the AI/ML vertical at GDSC Poornima for a full year — setting the technical direction, building the team\'s capabilities, and making machine learning genuinely accessible to the wider student body.',
    impact: [
      'Turned abstract AI/ML research into hands-on projects that students could build, ship, and learn from.',
      'Ran workshops that went beyond slides — giving peers practical exposure to tools and workflows used in industry.',
      'Became the go-to mentor for students navigating ML projects and coursework, accelerating their learning curve.',
      'Kept the AI/ML stream tightly integrated with GDSC\'s broader mission, ensuring every initiative moved the needle.',
    ],
    icon: 'users',
  },
  {
    id: '2',
    title: 'Student Ambassador — IDEA Lab',
    organisation: 'AICTE',
    period: 'Sep 2022 – Jul 2023',
    description: 'Represented AICTE\'s IDEA Lab on campus — connecting students with cutting-edge hardware like IoT, 3D printers, 3D scanners, and laser cutters, and turning raw curiosity into finished projects.',
    impact: [
      'Ran workshops and hackathons that got school and college students building with real tools, not just reading about them.',
      'Mentored students from first idea to working prototype — bridging the gap between imagination and execution.',
      'Partnered with faculty to keep lab activities academically grounded while still pushing the boundaries of what students attempted.',
    ],
    icon: 'star',
  },
  {
    id: '3',
    title: 'Campus Ambassador',
    organisation: 'HackerEarth',
    period: 'Mar 2023 – Mar 2024',
    description: 'Was the face of HackerEarth on campus for a year — turning a platform into a movement by getting students to compete, collaborate, and grow as developers.',
    impact: [
      'Built a thriving coding culture on campus through competitions and hackathons that pushed students beyond their comfort zone.',
      'Forged partnerships with college clubs to extend HackerEarth\'s reach far beyond a single department.',
      'Acted as the feedback loop between students and the platform — surfacing real insights that shaped better events.',
    ],
    icon: 'trophy',
  },
  {
    id: '4',
    title: 'Captain — Gaming & Development Club',
    organisation: 'Students\' Council PIET',
    period: 'Oct 2022 – Sep 2023',
    description: 'Captained the Gaming and Development Club for a full academic year — shaping it into an active space where students built real skills in game development, not just played games.',
    impact: [
      'Brought industry partnerships to life — collaborated with GoodGameNation to deliver events that went beyond what the college could offer alone.',
      'Ran Blender and Unity workshops that gave students direct, tool-level exposure to the game development pipeline.',
      'Created a club culture where members felt invested — turning casual interest into serious skill-building and collaboration.',
    ],
    icon: 'trophy',
  },
  {
    id: '5',
    title: 'Event Lead — Poornima Hackathon 2023',
    organisation: 'Poornima Institute of Engineering & Technology',
    period: 'Nov 2022 – Mar 2023',
    description: 'Drove the full lifecycle of Poornima Hackathon 2023 — from blank slate to a fully executed event — owning strategy, logistics, sponsors, and participant experience simultaneously.',
    impact: [
      'Coordinated volunteers, sponsors, and stakeholders across every dimension of the event without letting anything slip.',
      'Ran pre-hackathon workshops that raised the skill floor, so participants arrived ready to build rather than just learn.',
      'Managed the budget and resource allocation end-to-end, keeping the event financially sound and operationally tight.',
    ],
    icon: 'star',
  },
  {
    id: '6',
    title: 'Event Lead — Rebel Yell 2.0',
    organisation: 'Hack Club Poornima',
    period: 'Dec 2023 – Jan 2024',
    description: 'Took full ownership of Rebel Yell 2.0 — from zero to a live college tech event — steering the team, the programme, the promotions, and the budget all at once.',
    impact: [
      'Orchestrated a multi-track programme of speaker sessions, workshops, and activities that kept energy high throughout.',
      'Led a team of volunteers with clear ownership and tight coordination, ensuring nothing fell through the cracks.',
      'Built buzz through targeted promotions that drew a diverse, enthusiastic crowd well beyond the usual tech circle.',
    ],
    icon: 'star',
  },
  {
    id: '7',
    title: 'Vice Captain — Science & Technology Club',
    organisation: 'Students\' Council PIET',
    period: 'Dec 2021 – Oct 2022',
    description: 'Helped steer the Science and Technology Club through a formative period — keeping operations tight, members engaged, and the club\'s vision pointed toward what students actually needed.',
    impact: [
      'Co-led workshops, seminars, and competitions that made STEM feel relevant and exciting rather than academic.',
      'Mentored students through projects end-to-end — from initial idea to showcase-ready outcomes.',
      'Introduced new programmes that kept the club ahead of emerging trends and prevented it from going stale.',
    ],
    icon: 'users',
  },
  {
    id: '8',
    title: 'Student Coordinator — IDEA Lab',
    organisation: 'AICTE',
    period: 'Dec 2021 – Aug 2022',
    description: 'Stepped into a lab coordination role in the very first year of college — keeping resources running, students engaged, and IoT projects moving forward before most peers had found their footing.',
    impact: [
      'Organised workshops and seminars that made hands-on innovation a normal part of campus life, not a one-off event.',
      'Kept lab resources available and well-managed, so students never lost momentum waiting for tools or materials.',
      'Supported peers through IoT projects from scratch — providing early guidance that helped ideas survive contact with reality.',
    ],
    icon: 'users',
  },
  {
    id: '9',
    title: 'Technical Team Core Member — Aarohan 2022',
    organisation: 'Poornima Institute of Engineering & Technology',
    period: 'Jan 2022 – Feb 2022',
    description: 'Served as a core technical backbone for Aarohan 2022 — keeping AV, software, and networking running flawlessly so the event could focus on what mattered: the participants.',
    impact: [
      'Delivered real-time technical support across workshops and competitions, resolving issues before they became disruptions.',
      'Introduced new technologies and tooling that tangibly improved the participant experience.',
      'Documented technical procedures post-event, building a knowledge base that future teams could actually use.',
    ],
    icon: 'trophy',
  },
  {
    id: '10',
    title: 'Volunteer — Admin Team',
    organisation: 'Invest Rajasthan',
    period: 'Oct 2022',
    description: 'Contributed as a student volunteer to one of Rajasthan\'s flagship investment summits — supporting the administrative machinery that kept a large-scale government event running smoothly.',
    impact: [
      'Managed logistics, scheduling, and resource coordination across a fast-moving multi-stakeholder event.',
      'Handled stakeholder communication, ensuring information reached the right people without delay.',
      'Supported outreach efforts that drove participant and investor engagement to the summit.',
    ],
    icon: 'users',
  },
]

const ICON_MAP = {
  users:  Users,
  trophy: Trophy,
  star:   Star,
}

export default function Leadership() {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? ROLES : ROLES.slice(0, 6)

  return (
    <section id="leadership" className="section-padding max-w-screen-2xl mx-auto">
      <SectionHeader
        label="03 / Leadership"
        title="College Leadership"
        subtitle="Roles where I led people, ran initiatives, and created impact beyond the classroom."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {visible.map((role, i) => {
          const Icon = ICON_MAP[role.icon]
          return (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, scale: 0.88, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: (i % 6) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group glass rounded-2xl p-6 border border-black/5 dark:border-white/5
                hover:border-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/10
                hover:scale-[1.03] transition-all duration-300"
            >
              {/* Icon badge */}
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-500/20 flex items-center justify-center mb-5">
                <Icon size={20} className="text-cyan-500" />
              </div>

              {/* Title & org */}
              <h3 className="text-slate-900 dark:text-white font-bold text-base mb-0.5 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                {role.title}
              </h3>
              <p className="text-cyan-600 dark:text-cyan-400 text-sm font-semibold mb-1">
                {role.organisation}
              </p>
              <p className="text-slate-400 text-xs font-mono mb-4">{role.period}</p>

              {/* Description */}
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4 text-justify">
                {role.description}
              </p>

              {/* Impact bullets */}
              <ul className="space-y-1.5">
                {role.impact.map((point, j) => (
                  <li key={j} className="flex gap-2 text-slate-500 dark:text-slate-400 text-sm">
                    <span className="text-cyan-500 mt-0.5 shrink-0">▸</span>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          )
        })}
      </div>

      {ROLES.length > 6 && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setShowAll((v) => !v)}
            className="px-6 py-2.5 rounded-xl glass border border-black/5 dark:border-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-cyan-500/30 text-sm font-medium transition-all hover:scale-105"
          >
            {showAll ? 'Show Less' : `Show More (${ROLES.length - 6} more)`}
          </button>
        </div>
      )}
    </section>
  )
}
