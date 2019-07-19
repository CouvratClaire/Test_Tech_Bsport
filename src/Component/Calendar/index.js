import React from 'react';
import moment from 'moment';
import './calendar.css'


// constants
const WEEKDAYS_SHORT = moment.weekdaysShort();

// Weekdays is a table row containing all days of the week
const Weekdays = () =>
  <tr>
    {WEEKDAYS_SHORT.map((day) => <td key={day} className="week-day">{day}</td>)}
  </tr>


export default class Calendar extends React.Component {
	
	constructor(props) {
		super(props);

		this.width = props.width || "500px";
		this.style = props.style || {};
		this.style.width = this.width;
	}

	render() {
    const {selectedDate, onDayClick} = this.props;

    // We need to pad the calendar with white spaces to account for the fact that a month does not
    // always start on a Sunday
		let blanks = [];
    const firstDayOfMonth = moment(selectedDate).startOf('month').format('d');
		for (let i = 0; i < firstDayOfMonth; i++) {
			blanks.push(<td key={i*80} className="emptySlot">
				{""}
				</td>
			);
		}

    //Create one slot per day in the month
		let daysInMonth = [];
		for (let d = 1; d<= selectedDate.daysInMonth(); d++) {
      const className = (d === selectedDate.date()) ? "day current-day" : "day";
      const date = moment(selectedDate).date(d);
			daysInMonth.push(
				<td key={d} className={className}>
					<span onClick={() => onDayClick(date)}>{d}</span>
				</td>
			);
		}

		var totalSlots = [...blanks, ...daysInMonth];
		let rows = [];
		let cells = [];

		totalSlots.forEach((row, i) => {
			if ((i%7) !== 0) {
				cells.push(row);
			} else {
				let insertRow = cells.slice();
				rows.push(insertRow);
				cells = [];
				cells.push(row);
			}
			if (i === totalSlots.length - 1) {
				let insertRow = cells.slice();
				rows.push(insertRow);
			}
		});

		let trElems = rows.map((d, i) => {
			return (
				<tr key={i*100}>
					{d}
				</tr>
			);
		})

		return (
			<div className="calendar-container" style={this.style}>
				<table className="calendar">
					<thead>
						<tr className="calendar-header">
							<td colSpan="5">
								July 2019
							</td>
						</tr>
					</thead>
					<tbody>
            <Weekdays />
						{trElems}
					</tbody>
				</table>
			</div>
		);
	}
}
