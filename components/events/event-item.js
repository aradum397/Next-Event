import Link from 'next/link'
import Button from '../ui/button'
import DateIcon from '../icons/date-icon'
import AddressIcon from '../icons/address-icon'
import ArrowRightIcon from '../icons/arrow-right-icon'
import classes from './event-item.module.css'

function EventItem(props) {
	const { id, title, image, date, address } = props
	return (
		<li className={classes.item}>
			<img
				src={`/${image}`}
				alt={title}
			/>
			<div className={classes.content}>
				<div className={classes.summary}>
					<h2>{title}</h2>
					<div className={classes.date}>
						<DateIcon />
						<time>
							{new Date(date).toLocaleString('en-GB', {
								day: 'numeric',
								month: 'long',
								year: 'numeric'
							})}
						</time>
					</div>
					<div className={classes.address}>
						<AddressIcon />
						<address>{address.replace(', ', '\n')}</address>
					</div>
				</div>
				<div className={classes.actions}>
					<Button link={`/events/${id}`}>
						<span>Explore</span>
						<span className={classes.icon}>
							<ArrowRightIcon />
						</span>
					</Button>
				</div>
			</div>
		</li>
	)
}

export default EventItem
