import { useState } from 'preact/hooks'
import { Button } from './components/Button'
import { Card } from './components/Card'
import { Badge } from './components/Badge'
import { ProgressBar } from './components/ProgressBar'
import { Tabs } from './components/Tabs'
import { StatsCard } from './components/StatsCard'
import { Avatar, AvatarGroup } from './components/Avatar'
import { Modal } from './components/Modal'
import { Prompt } from './components/Prompt'
import { Input } from './components/Input'
import { Switch } from './components/Switch'
import { Table } from './components/Table'
import { Separator } from './components/Separator'
import { IconButton } from './components/IconButton'
import { Checkbox } from './components/Checkbox'
import { Slider } from './components/Slider'
import { Skeleton } from './components/Skeleton'
import { Spinner } from './components/Spinner'
import { Toaster, ALL_POSITIONS, toast, useToastStore } from './components/Toast'
import type { ToastPosition } from './components/Toast'
import { Stack } from './components/Stack'
import { StatNumber } from './components/StatNumber'
import { Activity, Trophy, Settings, User, Search, Bell, Layout, MousePointer2 } from 'lucide-preact'
import './app.css'

export function App() {
  const [activeTab, setActiveTab] = useState('race')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [switchState, setSwitchState] = useState(true)
  const [checkboxState, setCheckboxState] = useState(true)
  const [sliderValue, setSliderValue] = useState(75)
  const { toasts, remove } = useToastStore()

  const tabs = [
    { id: 'race',        label: 'RACE',   icon: Activity },
    { id: 'leaderboard', label: 'RANK',   icon: Trophy },
    { id: 'system',      label: 'SYSTEM', icon: Layout },
    { id: 'toast',       label: 'TOAST',  icon: Bell },
    { id: 'spacing',     label: 'SPACE',  icon: MousePointer2 },
    { id: 'settings',    label: 'OPTS',   icon: Settings },
  ]

  const leaderboardData = [
    { rank: 1, name: 'SPICEZ', vehicle: 'ANNIS ELEGY RH8', time: '01:12.45', status: 'live' },
    { rank: 2, name: 'SHADOW', vehicle: 'KARIN FUTO', time: '01:13.82', status: 'finished' },
    { rank: 3, name: 'GHOST', vehicle: 'BRAVADO GAUNTLET', time: '01:14.20', status: 'finished' },
  ]

  const leaderboardColumns = [
    { key: 'rank', header: '#', align: 'center' },
    { 
      key: 'name', 
      header: 'DRIVER', 
      render: (val: string) => (
        <div className="flex items-center gap-12">
          <Avatar name={val} size="sm" />
          <span className="font-semibold">{val}</span>
        </div>
      )
    },
    { key: 'vehicle', header: 'MODEL' },
    { 
      key: 'time', 
      header: 'LAP', 
      render: (val: string) => <span className="text-primary font-primary">{val}</span>
    },
  ]

  return (
    <main className="app-container p-lg flex flex-col gap-24">
      {/* Toasters for all 9 positions */}
      {ALL_POSITIONS.map(pos => (
        <Toaster key={pos} toasts={toasts} onClose={remove} position={pos} />
      ))}

      <header className="flex items-center justify-between border-subtle p-md rounded-lg bg-gray-950">
        <div className="flex items-center gap-16">
          <h1 className="text-h4 font-branding text-primary">SPZ CORE</h1>
          <div className="w-1 h-12 bg-gray-800" />
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="pills" />
        </div>
        <div className="flex items-center gap-12">
          <div className="text-right">
            <div className="font-semibold text-body-sm">SPICEZ</div>
            <div className="text-caption text-muted uppercase tracking-wider">ELITE RACER</div>
          </div>
          <Avatar name="SPICEZ" status="online" size="sm" />
        </div>
      </header>

      {activeTab === 'race' && (
        <div className="grid grid-cols-12 gap-16">
          <div className="col-span-8 flex flex-col gap-16">
            <section className="grid grid-cols-3 gap-16">
              <StatsCard title="SPEED" value="342" unit="KMH" trend="up" trendValue="12" icon={Activity} />
              <StatsCard title="WINS" value="128" icon={Trophy} />
              <StatsCard title="BANK" value="1.2M" unit="$" trend="up" trendValue="5" icon={Trophy} />
            </section>

            <Card title="ACTIVE TELEMETRY">
              <div className="grid grid-cols-2 gap-32">
                <div className="flex flex-col gap-12">
                  <ProgressBar value={75} label="NITROUS" variant="primary" />
                  <ProgressBar value={40} label="FUEL" variant="warning" />
                  <ProgressBar value={92} label="ENGINE" variant="error" />
                </div>
                <div className="flex flex-col gap-16">
                  <Prompt label="BOOST" keys={['SHIFT']} className="w-full" />
                  <Prompt label="DRIFT" keys={['SPACE']} className="w-full" />
                </div>
              </div>
            </Card>
          </div>

          <div className="col-span-4 flex flex-col gap-16">
            <Card title="GARAGE">
              <div className="flex flex-col gap-16">
                <Input placeholder="SEARCH MODEL..." icon={Search} />
                <div className="flex flex-col gap-12">
                  <Switch checked={switchState} onChange={setSwitchState} label="AUTO REPAIR" />
                  <Switch checked={false} onChange={() => {}} label="DATA LOGS" />
                </div>
                <Separator />
                <Button onClick={() => setIsModalOpen(true)} className="w-full" variant="secondary">VEHICLE STATS</Button>
                <Button className="w-full" onClick={() => toast({ type: 'success', title: 'System update', message: 'Engine maps successfully updated.', position: 'top-right' })}>TRIGGER TOAST</Button>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <Card title="GLOBAL RANKINGS" variant="glass">
          <Table 
            columns={leaderboardColumns} 
            data={leaderboardData} 
            onRowClick={(row) => console.log('Clicked row', row)} 
          />
        </Card>
      )}

      {activeTab === 'system' && (
        <div className="grid grid-cols-12 gap-16">
          {/* Column 1: Buttons & Inputs */}
          <div className="col-span-4 flex flex-col gap-16">
            <Card title="ACTIONS">
              <Stack gap={12}>
                <Button className="w-full">PRIMARY ACTION</Button>
                <Button className="w-full" variant="secondary">SECONDARY ACTION</Button>
                <Button className="w-full" variant="outline">OUTLINE ACTION</Button>
                <Button className="w-full" variant="danger">DANGER ACTION</Button>
                <div className="flex gap-8">
                  <IconButton icon={Activity} variant="primary" size="sm" />
                  <IconButton icon={Settings} variant="secondary" size="sm" />
                  <IconButton icon={Bell} variant="outline" size="sm" />
                  <IconButton icon={User} variant="ghost" size="sm" />
                </div>
              </Stack>
            </Card>

            <Card title="FORM ELEMENTS">
              <Stack gap={16}>
                <Input label="TEXT INPUT" placeholder="Enter text..." />
                <Input label="WITH ICON" placeholder="Search..." icon={Search} />
                <Switch checked={switchState} onChange={setSwitchState} label="TOGGLE SWITCH" />
                <Checkbox checked={checkboxState} onChange={setCheckboxState} label="CHECKBOX OPTION" />
                <Slider value={sliderValue} onChange={setSliderValue} label="SLIDER RANGE" />
              </Stack>
            </Card>
          </div>

          {/* Column 2: Feedback & Data */}
          <div className="col-span-4 flex flex-col gap-16">
            <Card title="FEEDBACK">
              <Stack gap={16}>
                <div className="flex gap-8">
                  <Badge variant="primary">PRIMARY</Badge>
                  <Badge variant="success">SUCCESS</Badge>
                  <Badge variant="warning">WARNING</Badge>
                  <Badge variant="error">ERROR</Badge>
                </div>
                <Separator />
                <ProgressBar value={65} label="PROGRESS BAR" variant="primary" />
                <div className="flex items-center gap-16">
                  <Spinner size="md" />
                  <span className="text-caption text-gray-500 uppercase">System Loading...</span>
                </div>
                <Separator />
                <Stack gap={8}>
                  <Skeleton width="100%" height={20} variant="text" />
                  <Skeleton width="80%" height={40} variant="rect" />
                  <div className="flex gap-8">
                    <Skeleton width={32} height={32} variant="circle" />
                    <Skeleton width={120} height={32} variant="rect" />
                  </div>
                </Stack>
              </Stack>
            </Card>

            <Card title="AVATARS & STATUS">
              <div className="flex flex-col" style={{ gap: '20px' }}>
                <div>
                  <div className="text-caption text-muted" style={{ marginBottom: '12px' }}>INDIVIDUAL</div>
                  <div className="flex items-center gap-12">
                    <Avatar name="John Doe" size="xl" status="online" />
                    <Avatar name="Jane Smith" size="lg" status="away" />
                    <Avatar name="Admin" size="md" status="busy" />
                    <Avatar name="Guest" size="sm" status="offline" />
                    <Avatar name="RK" size="xs" />
                  </div>
                </div>
                <div className="h-px" style={{ background: 'var(--gray-800)' }} />
                <div>
                  <div className="text-caption text-muted" style={{ marginBottom: '12px' }}>GROUPED / STACKED</div>
                  <div className="flex flex-col" style={{ gap: '16px' }}>
                    <AvatarGroup
                      size="sm"
                      avatars={[
                        { name: 'SPICEZ' },
                        { name: 'Shadow' },
                        { name: 'Ghost' },
                      ]}
                    />
                    <AvatarGroup
                      size="md"
                      max={3}
                      avatars={[
                        { name: 'SPICEZ' },
                        { name: 'Shadow' },
                        { name: 'Ghost' },
                        { name: 'Drift King' },
                        { name: 'Racer X' },
                        { name: 'Night Wolf' },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Column 3: Game HUD & Stats */}
          <div className="col-span-4 flex flex-col gap-16">
            <Card title="GAME HUD PROMPTS">
              <Stack gap={16}>
                <Prompt label="ENTER GARAGE" keys={['E']} />
                <Prompt label="BOOST NITRO"  keys={['SHIFT', 'SPACE']} />
                <Prompt label="COMMAND"      keys={['CMD', 'SHIFT', 'P']} />
                <Prompt label="SWITCH VIEW"  keys={['CTRL', 'B']} />
                <Prompt label="HANDBRAKE"    keys={['ALT', 'ENTER']} />
                <Prompt label="LOOK BACK"    keys={['TAB']} />
              </Stack>
            </Card>

            <Card title="STAT VARIATIONS">
              <Stack gap={16}>
                <StatNumber value="01:12.45" label="BEST LAP" size="md" />
                <Separator />
                <StatNumber value="24" label="POSITION" unit="/32" size="lg" />
                <Separator />
                <StatNumber value="185" label="TELEMETRY" unit="KM/H" trend="up" trendValue="12" size="sm" />
              </Stack>
            </Card>

            <Card title="OVERLAYS">
              <Stack gap={12}>
                <Button variant="outline" className="w-full" onClick={() => setIsModalOpen(true)}>OPEN MODAL</Button>
                <Button variant="outline" className="w-full" onClick={() => setShowToast(true)}>TRIGGER TOAST</Button>
              </Stack>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'spacing' && (
        <Card title="DESIGN SYSTEM SPACING SCALE">
          <div className="flex flex-col" style={{ gap: '32px' }}>
            <div className="text-body-sm text-gray-400 mb-8" style={{ maxWidth: '600px' }}>
              Consistent spacing is critical for the 70/20/10 Shadcn aesthetic. 
              The scale follows a structured progression to ensure perfect vertical and horizontal rhythm.
            </div>
            
            <div className="flex flex-col" style={{ gap: '16px' }}>
              {[
                { size: 4, token: '--spacing-4', rem: '0.25rem' },
                { size: 8, token: '--spacing-8', rem: '0.5rem' },
                { size: 12, token: '--spacing-12', rem: '0.75rem' },
                { size: 16, token: '--spacing-16', rem: '1rem' },
                { size: 20, token: '--spacing-20', rem: '1.25rem' },
                { size: 24, token: '--spacing-24', rem: '1.5rem' },
                { size: 32, token: '--spacing-32', rem: '2rem' },
                { size: 40, token: '--spacing-40', rem: '2.5rem' },
                { size: 48, token: '--spacing-48', rem: '3rem' },
                { size: 64, token: '--spacing-64', rem: '4rem' },
              ].map(space => (
                <div key={space.size} className="flex items-center border-subtle p-md rounded-md bg-gray-950">
                  <div className="font-mono text-body-sm text-gray-500" style={{ width: '80px' }}>
                    {space.size}px
                  </div>
                  <div className="font-mono text-body-sm text-gray-300" style={{ width: '140px' }}>
                    {space.rem}
                  </div>
                  <div className="font-mono text-body-sm text-gray-400" style={{ width: '180px' }}>
                    {space.token}
                  </div>
                  <div className="flex-1 flex items-center">
                    <div 
                      className="rounded-sm" 
                      style={{ 
                        width: `${space.size}px`, 
                        height: '32px',
                        backgroundColor: 'var(--color-primary)'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
      {activeTab === 'toast' && (() => {
        const TYPES: Array<{ type: 'success'|'error'|'warning'|'info', label: string, title: string, msg: string }> = [
          { type: 'success', label: 'Success', title: 'Race completed!',       msg: 'You finished 1st in the race.' },
          { type: 'error',   label: 'Error',   title: 'Connection lost',        msg: 'Unable to reach the race server.' },
          { type: 'warning', label: 'Warning', title: 'Low fuel detected',      msg: 'Pit stop recommended within 2 laps.' },
          { type: 'info',    label: 'Info',    title: 'Lobby updated',           msg: '3 new players joined the session.' },
        ]

        const POSITIONS: ToastPosition[] = [
          'top-left','top-center','top-right',
          'center-left','center','center-right',
          'bottom-left','bottom-center','bottom-right',
        ]

        return (
          <div className="flex flex-col" style={{ gap: '24px' }}>
            {/* Type variants */}
            <Card title="TOAST VARIANTS">
              <div className="grid grid-cols-2" style={{ gap: '12px' }}>
                {TYPES.map(t => (
                  <Button
                    key={t.type}
                    variant="outline"
                    className="w-full"
                    onClick={() => toast({ type: t.type, title: t.title, message: t.msg, position: 'top-right' })}
                  >
                    {t.label}
                  </Button>
                ))}
              </div>
            </Card>

            {/* Position grid */}
            <Card title="TOAST POSITIONS">
              <div className="grid grid-cols-3" style={{ gap: '8px' }}>
                {POSITIONS.map(pos => (
                  <Button
                    key={pos}
                    variant="secondary"
                    className="w-full"
                    onClick={() => toast({ type: 'info', title: pos, message: 'Fired from ' + pos, position: pos })}
                  >
                    {pos}
                  </Button>
                ))}
              </div>
            </Card>

            {/* Duration demo */}
            <Card title="STICKY TOAST">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => toast({ type: 'warning', title: 'Sticky toast', message: 'This will not auto-dismiss.', position: 'bottom-right', duration: 0 })}
              >
                Fire sticky (manual dismiss only)
              </Button>
            </Card>
          </div>
        )
      })()}


      <Modal
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="VEHICLE STATISTICS"
        size="lg"
      >
        <div className="grid grid-cols-2 gap-24">
          <div className="flex flex-col gap-16">
            <img src="https://images.unsplash.com/photo-1544636331-e268592033c2?q=80&w=400&auto=format&fit=crop" className="rounded-md" alt="Car" />
            <h3 className="text-h3">ANNIS ELEGY RH8</h3>
          </div>
          <div className="flex flex-col gap-12">
            <ProgressBar value={85} label="ACCELERATION" />
            <ProgressBar value={92} label="TOP SPEED" />
            <ProgressBar value={65} label="HANDLING" />
            <ProgressBar value={70} label="BRAKING" />
            <div className="mt-16 flex gap-12">
              <Button className="flex-1">UPGRADE</Button>
              <Button variant="secondary" className="flex-1">CUSTOMIZE</Button>
            </div>
          </div>
        </div>
      </Modal>
    </main>
  )
}
