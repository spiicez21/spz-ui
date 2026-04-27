import { useState } from 'preact/hooks'
import { Button } from './components/Button'
import { Card } from './components/Card'
import { Badge } from './components/Badge'
import { ProgressBar } from './components/ProgressBar'
import './app.css'

export function App() {
  const [loading, setLoading] = useState(false)

  const simulateLoading = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <main className="app-container p-lg">
      <header className="mb-64">
        <h1 className="text-hero mb-8">SPZ CORE UI</h1>
        <p className="text-gray-400">PREMIUM MOTORSPORT DESIGN SYSTEM</p>
      </header>

      <section className="grid-2 gap-32 mb-64">
        <Card title="BUTTON SYSTEM" subtitle="Interactive Elements" variant="glass">
          <div className="flex flex-col gap-16">
            <div className="flex gap-12">
              <Button onClick={() => alert('Primary Clicked')}>PRIMARY ACTION</Button>
              <Button variant="secondary">SECONDARY</Button>
            </div>
            <div className="flex gap-12">
              <Button variant="outline" size="sm">OUTLINE SM</Button>
              <Button variant="ghost" size="sm">GHOST SM</Button>
              <Button variant="danger" size="sm">DANGER</Button>
            </div>
            <div className="flex gap-12">
              <Button loading={loading} onClick={simulateLoading} className="w-full">
                {loading ? 'LOADING...' : 'TEST LOADING STATE'}
              </Button>
            </div>
          </div>
        </Card>

        <Card title="STATUS INDICATORS" subtitle="Real-time Feedback" variant="default">
          <div className="flex flex-col gap-16">
            <div className="flex items-center gap-12">
              <span className="text-body-sm text-gray-400 w-24">RACE</span>
              <Badge variant="primary" size="md">LIVE</Badge>
              <Badge variant="success" size="md">COMPLETED</Badge>
              <Badge variant="error" size="md">ABORTED</Badge>
            </div>
            <div className="flex items-center gap-12">
              <span className="text-body-sm text-gray-400 w-24">USER</span>
              <Badge variant="secondary" size="sm">ADMIN</Badge>
              <Badge variant="warning" size="sm">PROVISIONAL</Badge>
              <Badge variant="outline" size="sm">OFFLINE</Badge>
            </div>
            <div className="flex flex-col gap-8 mt-8">
              <ProgressBar value={75} label="NOS LEVEL" variant="primary" showValue />
              <ProgressBar value={40} label="FUEL" variant="warning" showValue />
              <ProgressBar value={92} label="ENGINE TEMP" variant="error" showValue />
            </div>
          </div>
        </Card>
      </section>

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
