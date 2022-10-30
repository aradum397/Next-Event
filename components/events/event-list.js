import EventItem from './event-item'
import classes from './event-list.module.css'

function EventList(props) {
	return (
		<ul className={classes.list}>
			{props.items.map(event => (
				<EventItem
					key={event.id}
					id={event.id}
					title={event.title}
					image={event.image}
					date={event.date}
					address={event.location}
				/>
			))}
		</ul>
	)
}

export default EventList
