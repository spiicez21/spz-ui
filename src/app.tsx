import { useState } from 'preact/hooks'
import { Button } from './components/Button'
import { Card } from './components/Card'
import { Badge } from './components/Badge'
import { ProgressBar } from './components/ProgressBar'
import { Tabs } from './components/Tabs'
import { StatsCard } from './components/StatsCard'
import { Avatar } from './components/Avatar'
import { Modal } from './components/Modal'
import { Prompt } from './components/Prompt'
import { Input } from './components/Input'
import { Switch } from './components/Switch'
import { Table } from './components/Table'
import { Badge } from './components/Badge'
import { Activity, Trophy, Settings, User, Mail, Search, Clock } from 'lucide-preact'
import './app.css'

export function App() {
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('race')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [switchState, setSwitchState] = useState(true)

  const tabs = [
    { id: 'race', label: 'RACING', icon: Activity },
    { id: 'leaderboard', label: 'LEADERBOARD', icon: Trophy },
    { id: 'profile', label: 'PROFILE', icon: User },
    { id: 'settings', label: 'SETTINGS', icon: Settings },
  ]

  const leaderboardData = [
    { rank: 1, name: 'SPICEZ', vehicle: 'Annis Elegy RH8', time: '01:12.450', status: 'live' },
    { rank: 2, name: 'SHADOW_RACER', vehicle: 'Karin Futo', time: '01:13.820', status: 'finished' },
    { rank: 3, name: 'GHOST_RIDER', vehicle: 'Bravado Gauntlet', time: '01:14.200', status: 'finished' },
    { rank: 4, name: 'DRIFT_KING', vehicle: 'Dinka Jester', time: '01:15.110', status: 'finished' },
    { rank: 5, name: 'TURBO_TOM', vehicle: 'Pegassi Zentorno', time: '01:16.340', status: 'finished' },
  ]

  const leaderboardColumns = [
    { key: 'rank', header: '#', align: 'center' },
    { 
      key: 'name', 
      header: 'RACER', 
      render: (val: string) => (
        <div className="flex items-center gap-12">
          <Avatar name={val} size="sm" />
          <span className="font-semibold">{val}</span>
        </div>
      )
    },
    { key: 'vehicle', header: 'VEHICLE' },
    { 
      key: 'time', 
      header: 'BEST LAP', 
      render: (val: string) => (
        <div className="flex items-center gap-8 text-primary font-primary">
          <Clock size={14} />
          {val}
        </div>
      )
    },
    { 
      key: 'status', 
      header: 'STATUS',
      render: (val: string) => (
        <Badge variant={val === 'live' ? 'primary' : 'success'} size="sm">
          {val}
        </Badge>
      )
    },
  ]

  const simulateLoading = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <main className="app-container p-lg">
      <header className="mb-32 flex items-center justify-between">
        <div>
          <h1 className="text-hero mb-8">SPZ CORE UI</h1>
          <p className="text-gray-400">PREMIUM MOTORSPORT DESIGN SYSTEM</p>
        </div>
        <div className="flex items-center gap-16">
          <Avatar name="John Doe" status="online" size="md" />
          <div className="text-right">
            <div className="font-primary text-body">SPICEZ</div>
            <div className="text-caption text-primary">ELITE RACER</div>
          </div>
        </div>
      </header>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-32" />

      {activeTab === 'race' && (
        <div className="flex flex-col gap-32">
          <section className="grid-3 gap-16">
            <StatsCard title="TOP SPEED" value="342" unit="KM/H" trend="up" trendValue="12%" icon={Activity} />
            <StatsCard title="RACES WON" value="128" trend="neutral" trendValue="--" icon={Trophy} />
            <StatsCard title="TOTAL EARNINGS" value="1.2M" unit="$" trend="up" trendValue="5%" icon={Trophy} />
          </section>

          <section className="grid-2 gap-32">
            <Card title="RACING HUD" subtitle="Active Modules" variant="glass">
              <div className="flex flex-col gap-24">
                <ProgressBar value={75} label="NOS LEVEL" variant="primary" showValue />
                <ProgressBar value={40} label="FUEL" variant="warning" showValue />
                <div className="flex gap-16 mt-8">
                  <Prompt label="BOOST" keys={['SHIFT']} />
                  <Prompt label="DRIFT" keys={['SPACE']} />
                  <Prompt label="MAP" button="SELECT" />
                </div>
              </div>
            </Card>

            <Card title="GARAGE CONTROLS" subtitle="Vehicle Management" variant="default">
              <div className="flex flex-col gap-16">
                <Input label="SEARCH VEHICLE" placeholder="Enter name..." icon={Search} />
                <div className="flex flex-col gap-12 mt-8">
                  <Switch checked={switchState} onChange={setSwitchState} label="AUTO-REPAIR ENGINE" />
                  <Switch checked={false} onChange={() => {}} label="ENABLE TELEMETRY LOGS" />
                </div>
                <Button onClick={() => setIsModalOpen(true)} className="mt-16">OPEN VEHICLE STATS</Button>
              </div>
            </Card>
          </section>
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <Card title="GLOBAL LEADERBOARD" subtitle="S1 Race Season" variant="glass">
          <Table 
            columns={leaderboardColumns} 
            data={leaderboardData} 
            onRowClick={(row) => console.log('Clicked row', row)} 
          />
        </Card>
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="VEHICLE STATISTICS"
        size="lg"
      >
        <div className="grid-2 gap-24">
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

      <section className="mb-64">
        <Card title="TYPOGRAPHY SCALE" subtitle="Panchang & Poppins" variant="outline">
          <div className="flex flex-col gap-24">
            <div>
              <h1 className="text-h1">Heading 1 - 36px</h1>
              <p className="text-caption text-gray-500 uppercase">Primary Font: Panchang Bold</p>
            </div>
            <div>
              <h2 className="text-h2">Heading 2 - 30px</h2>
            </div>
            <div>
              <h3 className="text-h3">Heading 3 - 24px</h3>
            </div>
            <div>
              <p className="text-body-lg">Body Large - 18px. The quick brown fox jumps over the lazy dog.</p>
              <p className="text-caption text-gray-500 uppercase">Secondary Font: Poppins Regular</p>
            </div>
            <div>
              <p className="text-body">Body Regular - 16px. Modern automotive UI requires clean typography and generous spacing.</p>
            </div>
          </div>
        </Card>
      </section>

      <section className="grid-3 gap-16">
        <Card title="DRIFT" subtitle="Current Score" variant="glass" className="text-center">
          <div className="text-hero text-primary">12,450</div>
          <div className="text-caption text-gray-400 mt-8">MULTIPLIER X2.5</div>
        </Card>
        <Card title="POSITION" subtitle="Live Standings" variant="glass" className="text-center">
          <div className="text-hero">04<span className="text-h3 text-gray-500">/24</span></div>
          <div className="text-caption text-gray-400 mt-8">LAP 2/5</div>
        </Card>
        <Card title="ENGINE" subtitle="Telemetry" variant="glass" className="text-center">
          <div className="text-hero">185<span className="text-h3 text-gray-500">KMH</span></div>
          <div className="text-caption text-gray-400 mt-8">RPM 7,200</div>
        </Card>
      </section>
    </main>
  )
}
