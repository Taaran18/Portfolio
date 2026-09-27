'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  AlertTriangle,
  Eye,
  ExternalLink,
  Globe,
  LogOut,
  MousePointerClick,
  RefreshCw,
  Trash2,
  Users,
} from 'lucide-react'
import toast from 'react-hot-toast'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import type { AnalyticsSummary, CountRow } from '@/lib/analytics/types'

const RANGES = [7, 30, 90] as const

const card = 'surface rounded-3xl p-5'
const heading = 'text-[11px] font-mono uppercase tracking-widest text-slate-500 mb-4'

function StatTile({ icon: Icon, label, value, sub }: { icon: typeof Eye; label: string; value: number; sub?: string }) {
  return (
    <div className={card}>
      <div className="flex items-center gap-2 mb-3">
        <Icon size={15} className="text-brand-700 dark:text-brand-400" />
        <p className="text-xs text-slate-600 dark:text-slate-400">{label}</p>
      </div>
      <p className="text-3xl font-bold text-slate-900 dark:text-white leading-none">{value.toLocaleString()}</p>
      {sub && <p className="text-xs text-slate-500 mt-2">{sub}</p>}
    </div>
  )
}

function BarList({ title, rows, empty }: { title: string; rows: CountRow[]; empty: string }) {
  const max = Math.max(1, ...rows.map((r) => r.count))
  return (
    <div className={card}>
      <p className={heading}>{title}</p>
      {rows.length === 0 ? (
        <p className="text-sm text-slate-500">{empty}</p>
      ) : (
        <ul className="space-y-2.5">
          {rows.map((row) => (
            <li key={row.key}>
              <div className="flex items-center justify-between gap-3 mb-1">
                <span className="text-sm text-slate-700 dark:text-slate-300 truncate">{row.key}</span>
                <span className="text-xs font-mono text-slate-500 shrink-0">{row.count}</span>
              </div>
              <div className="h-1.5 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-brand-500"
                  style={{ width: `${Math.round((row.count / max) * 100)}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function Sparkline({ series }: { series: AnalyticsSummary['series'] }) {
  const max = Math.max(1, ...series.map((d) => d.views))
  return (
    <div className={card}>
      <p className={heading}>Views over time</p>
      <div className="flex items-end gap-[3px] h-28">
        {series.map((day) => (
          <div
            key={day.date}
            title={`${day.date}: ${day.views} views · ${day.visitors} visitors`}
            className="flex-1 min-w-[2px] rounded-t bg-brand-500/70 hover:bg-brand-500 transition-colors"
            style={{ height: `${Math.max(2, Math.round((day.views / max) * 100))}%` }}
          />
        ))}
      </div>
      <div className="flex justify-between text-[11px] text-slate-500 mt-2 font-mono">
        <span>{series[0]?.date}</span>
        <span>{series[series.length - 1]?.date}</span>
      </div>
    </div>
  )
}

export default function AdminDashboard({ email }: { email: string }) {
  const router = useRouter()
  const [days, setDays] = useState<number>(30)
  const [data, setData] = useState<AnalyticsSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [loggingOut, setLoggingOut] = useState(false)
  const [confirmClear, setConfirmClear] = useState(false)
  const [clearing, setClearing] = useState(false)

  const load = useCallback(async (range: number) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/analytics/summary?days=${range}`, { cache: 'no-store' })
      setData(res.ok ? await res.json() : null)
    } catch {
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load(days)
  }, [days, load])

  async function clearData() {
    setClearing(true)
    try {
      const res = await fetch('/api/analytics/summary', { method: 'DELETE' })
      if (res.status === 401) {
        toast.error('Your session has expired. Sign in again to clear data.')
        router.replace('/admin/login')
        return
      }
      if (!res.ok) throw new Error(String(res.status))
      toast.success('Analytics data deleted. Counting starts again from zero.')
      setConfirmClear(false)
      await load(days)
    } catch {
      toast.error("Couldn't delete the data. Check your connection and try again.")
    } finally {
      setClearing(false)
    }
  }

  async function logout() {
    setLoggingOut(true)
    await fetch('/api/admin/logout', { method: 'POST' }).catch(() => {})
    router.replace('/admin/login')
    router.refresh()
  }

  return (
    <main className="min-h-screen px-6 md:px-10 py-12">
      <div className="max-w-[1400px] mx-auto">
        <header className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Analytics</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">{email}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 p-1 rounded-full surface">
              {RANGES.map((r) => (
                <button
                  key={r}
                  onClick={() => setDays(r)}
                  aria-pressed={days === r}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    days === r
                      ? 'bg-brand-700 text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {r}d
                </button>
              ))}
            </div>

            <button
              onClick={() => load(days)}
              aria-label="Refresh"
              className="w-9 h-9 rounded-full surface flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-brand-700 dark:hover:text-brand-400 transition-colors"
            >
              <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            </button>

            <button
              onClick={() => setConfirmClear(true)}
              disabled={!data}
              aria-label="Clear data"
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full surface text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-red-500 hover:border-red-500/40 transition-colors disabled:opacity-50 disabled:pointer-events-none"
            >
              <Trash2 size={15} />
              <span className="hidden sm:inline">Clear Data</span>
            </button>

            <button
              onClick={logout}
              disabled={loggingOut}
              aria-label="Sign out"
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full surface text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-red-500 hover:border-red-500/40 transition-colors disabled:opacity-50"
            >
              <LogOut size={15} />
              <span className="hidden sm:inline">{loggingOut ? 'Signing out…' : 'Sign Out'}</span>
            </button>
          </div>
        </header>

        <ConfirmDialog
          open={confirmClear}
          tone="danger"
          title="Delete All Analytics Data?"
          description={
            <p>
              This permanently deletes every recorded page view and link click — all time, not just the last {days}{' '}
              days. The dashboard will start counting again from zero. This can&apos;t be undone.
            </p>
          }
          confirmLabel="Delete All Data"
          pendingLabel="Deleting…"
          pending={clearing}
          onConfirm={clearData}
          onCancel={() => setConfirmClear(false)}
        />

        {data?.storage && !data.storage.durable && (
          <div className="flex items-start gap-3 rounded-3xl border border-amber-500/40 bg-amber-500/10 px-5 py-4 mb-6">
            <AlertTriangle size={16} className="text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 dark:text-amber-300">{data.storage.note}</p>
          </div>
        )}

        {!data && !loading && (
          <div className={card}>
            <p className="text-sm text-slate-600 dark:text-slate-400">Could not load analytics. Try refreshing.</p>
          </div>
        )}

        {data && (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <StatTile
                icon={Eye}
                label="Page views"
                value={data.totals.views}
                sub={`${data.totals.viewsToday} today`}
              />
              <StatTile
                icon={Users}
                label="Unique visitors"
                value={data.totals.visitors}
                sub={`${data.totals.visitorsToday} today`}
              />
              <StatTile icon={MousePointerClick} label="Link clicks" value={data.totals.clicks} />
              <StatTile icon={Globe} label="Referrer sources" value={data.referrers.length} />
            </div>

            <div className="mb-4">
              <Sparkline series={data.series} />
            </div>

            <div className="grid lg:grid-cols-2 gap-4 mb-4">
              <BarList title="Top pages" rows={data.topPages} empty="No page views yet." />
              <BarList title="Most clicked links" rows={data.topLinks} empty="No link clicks yet." />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <BarList title="Referrers" rows={data.referrers} empty="All traffic is direct so far." />
              <BarList title="Devices" rows={data.devices} empty="No data yet." />
              <BarList title="Countries" rows={data.countries} empty="Available once deployed." />
            </div>

            <div className={card}>
              <p className={heading}>Recent activity</p>
              {data.recent.length === 0 ? (
                <p className="text-sm text-slate-500">Nothing recorded yet.</p>
              ) : (
                <ul className="divide-y divide-[var(--surface-border)]">
                  {data.recent.map((event) => (
                    <li key={event.id} className="flex items-center gap-3 py-2.5 text-sm">
                      {event.type === 'page_view' ? (
                        <Eye size={14} className="text-brand-600 shrink-0" />
                      ) : (
                        <ExternalLink size={14} className="text-accent-600 shrink-0" />
                      )}
                      <span className="text-slate-700 dark:text-slate-300 truncate">
                        {event.type === 'page_view' ? event.path : `${event.label} — from ${event.path}`}
                      </span>
                      <span className="ml-auto text-xs font-mono text-slate-500 shrink-0">
                        {new Date(event.at).toLocaleString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  )
}
