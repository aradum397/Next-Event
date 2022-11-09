import { getEventById, getFeaturedEvents } from '../../helpers/api-util'
import EventSummary from '../../components/event-detail/event-summary'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventContent from '../../components/event-detail/event-content'
import ErrorAlert from '../../components/ui/error-alert'

function EventShow(props) {
	const { event } = props
	if (!event) {
		return (
			<div className='center'>
				<p>Event not found</p>
			</div>
		)
	}
	return (
		<>
			<EventSummary title={event.title} />
			<EventLogistics
				date={event.date}
				address={event.location}
				image={event.image}
				imageAlt={event.title}
			/>
			<EventContent>
				<p>{event.description}</p>
			</EventContent>
		</>
	)
}

export default EventShow

export async function getStaticProps(contex) {
	const { id } = contex.params
	const event = await getEventById(id)
	return {
		props: {
			event
		},
		revalidate: 30
	}
}

export async function getStaticPaths() {
	const events = await getFeaturedEvents()
	const paths = events.map(event => ({
		params: {
			id: event.id
		}
	}))
	return {
		paths,
		fallback: true
	}
}
