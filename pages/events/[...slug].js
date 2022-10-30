import { useRouter } from 'next/router'
import { getFilteredEvents } from '../../dummy-data'
import EventList from '../../components/events/event-list'
import ResultsTitle from '../../components/events/results-title'
import Button from '../../components/ui/button'
import ErrorAlert from '../../components/ui/error-alert'

function EventFilter() {
	const router = useRouter()
	const filterData = router.query.slug
	if (!filterData) {
		return (
			<div>
				<p className='center'>Loading...</p>
			</div>
		)
	}
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
	const events = getFilteredEvents({ year, month })
	if (!events || events.length === 0) {
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
			<EventList items={events} />
		</>
	)
}

export default EventFilter
