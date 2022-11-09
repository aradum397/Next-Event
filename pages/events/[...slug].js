import { useRouter } from 'next/router'
import useSWR from 'swr'
import { getFilteredEvents } from '../../helpers/api-util'
import EventList from '../../components/events/event-list'
import ResultsTitle from '../../components/events/results-title'
import Button from '../../components/ui/button'
import ErrorAlert from '../../components/ui/error-alert'

function EventFilter(props) {
	const router = useRouter()
	const filterData = router.query.slug
	const { events } = props
	if (!events) {
		return (
			<div>
				<p className='center'>Loading...</p>
			</div>
		)
	}
	const year = +filterData[0]
	const month = +filterData[1]
	if (props.hasError) {
		return (
			<>
				<ErrorAlert>
					<p>No data for such query</p>
				</ErrorAlert>
				<div className='center'>
					<Button link='/events'>Show all events</Button>
				</div>
			</>
		)
	}
	const filteredEvents = events.filter(event => {
		const eventDate = new Date(event.date)
		return (
			eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
		)
	})
	if (!filteredEvents || filteredEvents.length === 0) {
		return (
			<>
				<ErrorAlert>
					<p>No events found</p>
				</ErrorAlert>
				<div className='center'>
					<Button link='/events'>Show all events</Button>
				</div>
			</>
		)
	}
	const date = new Date(year, month - 1)
	return (
		<>
			<ResultsTitle date={date} />
			<EventList items={filteredEvents} />
		</>
	)
}

export default EventFilter

export async function getServerSideProps(context) {
	const { params } = context
	const filterData = params.slug
	const year = +filterData[0]
	const month = +filterData[1]
	if (
		isNaN(year) ||
		isNaN(month) ||
		year < 2021 ||
		year > 2022 ||
		month < 1 ||
		month > 12
	) {
		return {
			props: {
				hasError: true
			}
		}
	}
	const events = await getFilteredEvents({ year, month })
	return {
		props: {
			events,
			date: {
				year,
				month
			}
		}
	}
}
