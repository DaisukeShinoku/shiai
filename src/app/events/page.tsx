import { Event, eventsSchema } from '../types/event'

const EVENTS_API = `${process.env.NEXT_PUBLIC_API_URL}/events`

// サーバーコンポーネントとしてデータを取得
async function fetchEvents(): Promise<Event[]> {
  const res = await fetch(EVENTS_API, { cache: 'no-store' }) // no-store で最新データを取得
  if (!res.ok) {
    console.error('Failed to fetch events')
    return []
  }

  // `unknown` にキャストし、`zod` で型をチェックする
  const json = (await res.json()) as unknown

  try {
    const events = eventsSchema.parse(json) // バリデーション
    return events
  } catch (error) {
    console.error('Invalid events data:', error)
    return []
  }
}

export default async function EventsPage() {
  const events = await fetchEvents()

  return (
    <div>
      <h1>Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <h2>{event.name}</h2>
            <p>createdAt: {event.createdAt}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
