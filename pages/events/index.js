import { useRouter } from 'next/router'
import EventList from '../../components/events/event-list'
import EventsSearch from '../../components/events/events-search'
import { getAllEvents } from '../../helpers/api-util'

function EventsIndex(props) {
	const { events } = props
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

export async function getStaticProps() {
	const events = await getAllEvents()
	return {
		props: {
			events
		},
		revalidate: 60
	}
}
