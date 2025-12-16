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

export default function App() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const time = now.toLocaleTimeString('vi-VN', { hour12: false, ...TIME_FORMAT })
  const date = now.toLocaleDateString('vi-VN', DATE_FORMAT)

  return (
    <main className="app">
      <section className="clock">
        <p className="label">Đồng hồ hiện tại</p>
        <p className="time">{time}</p>
        <p className="date">{date}</p>
      </section>
    </main>
  )
}
