import React, { Component } from 'react';
import Calendar from './Component/Calendar';
//import CalendarV2 from './Component/Calendar/CalendarV2';
import moment from 'moment';
import './App.css';

const style = {
  position:"relative",
  margin: "50px"
}

var item_day = [];

// Activities displays api results in a pretty fashion
const Activities = ({activities}) => 
  <ul>
    {activities.map(a =>
      <li key={a.id}>
        <strong>Identifiant : </strong> {a.id} | 
        <strong>Date et heure de l'activité: </strong>
          {moment(a.date_start).format("YYYY-MM-DD")} à {moment(a.date_start).format("HH:mm")} |
        <strong>Durée: </strong>{~~(a.duration_minute/60)}h{a.duration_minute%60} | 
        <strong>Effectif: </strong>{a.effectif} 
      </li>
    )}
  </ul>


class App extends Component {

    constructor() {
      super();
      this.state = {
        items: [],
        // set to first day of current month by default
        selectedDate: moment().startOf('month'),
      };
    }


    //Va cherher la liste d'éléments
    componentDidMount() {
      fetch('https://back.staging.bsport.io/api/v1/offer/?page_size=10&min_date=2019-07-15&max_date=2019-07-21&company=3')
        .then(results => {
          return results.json();
        }).then(data => {
          this.setState({items: data.results});
          console.log("state", this.state.items);
        });
    }



    onDayClick = (day) => {
      // Update the currently selected day
      this.setState({selectedDate: day})

      // Find activities if there are any for this day
      item_day = this.state.items.filter(function(item) {
        return moment(item.date_start).isSame(day, "day");
      });
      //console.log("day_clicked", moment(day).format("YYYY-MM-DD"));
      //console.log("offer_day", item_day);
    }

    render() {
      return (
        <div className="App">
          <header>Calendrier des activités</header>
          <Activities activities={this.state.items} />
          <center>
            <Calendar
              style={style}
              width="302px" 
              onDayClick={(day) => this.onDayClick(day)}
              selectedDate={this.state.selectedDate}
              />
          </center>
          <h1> Activités du jour : </h1>
          <Activities activities={item_day}/>
        </div>
      )


    }
}

export default App;
