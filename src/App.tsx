import { useEffect, useState } from 'react'
import './App.css'

const TIME_FORMAT: Intl.DateTimeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
}

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

const HOUR_TICKS = Array.from({ length: 12 }, (_, index) => index)

export default function App() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const time = now.toLocaleTimeString('vi-VN', { hour12: false, ...TIME_FORMAT })
  const date = now.toLocaleDateString('vi-VN', DATE_FORMAT)

  const seconds = now.getSeconds()
  const minutes = now.getMinutes()
  const hours = now.getHours() % 12

  const secondAngle = seconds * 6
  const minuteAngle = (minutes + seconds / 60) * 6
  const hourAngle = (hours + minutes / 60 + seconds / 3600) * 30

  return (
    <main className="app">
      <section className="clock">
        <p className="label">Dong ho hien tai</p>

        <div className="analog-clock" aria-label="Analog clock">
          <div className="dial">
            {HOUR_TICKS.map((tick) => (
              <span className="tick" style={{ transform: `rotate(${tick * 30}deg)` }} key={tick} />
            ))}
            <span className="hand hour" style={{ transform: `translate(-50%, 0) rotate(${hourAngle}deg)` }} />
            <span className="hand minute" style={{ transform: `translate(-50%, 0) rotate(${minuteAngle}deg)` }} />
            <span className="hand second" style={{ transform: `translate(-50%, 0) rotate(${secondAngle}deg)` }} />
            <span className="center-dot" />
          </div>
        </div>

        <div className="digital">
          <p className="time">{time}</p>
          <p className="date">{date}</p>
        </div>
      </section>
    </main>
  )
}
