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
import { Separator } from './components/Separator'
import { Activity, Trophy, Settings, User, Mail, Search, Clock } from 'lucide-preact'
import './app.css'

export function App() {
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('race')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [switchState, setSwitchState] = useState(true)

  const tabs = [
    { id: 'race', label: 'RACE', icon: Activity },
    { id: 'leaderboard', label: 'RANK', icon: Trophy },
    { id: 'profile', label: 'USER', icon: User },
    { id: 'settings', label: 'OPTS', icon: Settings },
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

  const simulateLoading = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <main className="app-container p-lg flex flex-col gap-24">
      <header className="flex items-center justify-between border-subtle p-md rounded-sm bg-gray-900">
        <div className="flex items-center gap-16">
          <h1 className="text-h4 font-primary text-primary">SPZ CORE</h1>
          <div className="w-1 h-12 bg-gray-700" />
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="pills" />
        </div>
        <div className="flex items-center gap-12">
          <div className="text-right">
            <div className="font-primary text-body-sm">SPICEZ</div>
            <div className="text-caption text-gray-500">ELITE RACER</div>
          </div>
          <Avatar name="John Doe" status="online" size="sm" />
        </div>
      </header>

      {activeTab === 'race' && (
        <div className="grid grid-cols-12 gap-16">
          <div className="col-span-8 flex flex-col gap-16">
            <section className="grid grid-cols-3 gap-8">
              <StatsCard title="SPEED" value="342" unit="KMH" trend="up" trendValue="12" icon={Activity} />
              <StatsCard title="WINS" value="128" icon={Trophy} />
              <StatsCard title="BANK" value="1.2M" unit="$" trend="up" trendValue="5" icon={Trophy} />
            </section>

            <Card title="TELEMETRY" variant="default">
              <div className="grid grid-cols-2 gap-32">
                <div className="flex flex-col gap-12">
                  <ProgressBar value={75} label="NITROUS" variant="primary" />
                  <ProgressBar value={40} label="FUEL" variant="warning" />
                  <ProgressBar value={92} label="ENGINE" variant="error" />
                </div>
                <div className="flex flex-col gap-8">
                  <Prompt label="BOOST" keys={['SHIFT']} className="w-full" />
                  <Prompt label="DRIFT" keys={['SPACE']} className="w-full" />
                </div>
              </div>
            </Card>
          </div>

          <div className="col-span-4 flex flex-col gap-16">
            <Card title="GARAGE">
              <div className="flex flex-col gap-12">
                <Input placeholder="SEARCH MODEL..." icon={Search} />
                <div className="flex flex-col gap-8">
                  <Switch checked={switchState} onChange={setSwitchState} label="AUTO REPAIR" />
                  <Switch checked={false} onChange={() => {}} label="DATA LOGS" />
                </div>
                <div className="h-1 bg-gray-800 my-4" />
                <Button onClick={() => setIsModalOpen(true)} className="w-full" variant="secondary">VEHICLE STATS</Button>
                <Button className="w-full">START RACE</Button>
              </div>
            </Card>
          </div>
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
