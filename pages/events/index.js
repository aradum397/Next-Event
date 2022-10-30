import { useRouter } from 'next/router'
import { getAllEvents } from '../../dummy-data'
import EventList from '../../components/events/event-list'
import EventsSearch from '../../components/events/events-search'

function EventsIndex() {
	const events = getAllEvents()
	const router = useRouter()
	function searchHandler(year, month) {
		router.push(`/events/${year}/${month}`)
	}
	return (
		<>
			<EventsSearch onSearch={searchHandler} />
			<EventList items={events} />
		</>
	)
}

export default EventsIndex
