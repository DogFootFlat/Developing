import { Link } from 'react-router-dom';
import dummy from '../db/datatest.json'

export default function Daylisttest() {
  return (
	<ul className="list_day">
		{dummy.days.map(day => (
			<li key={day.id}>
				<Link to={`/day/${day.day}`}>Day {day.day}</Link>
			</li>
		))}
	</ul>
  )
}