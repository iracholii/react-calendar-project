import React, { useState } from 'react';

import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import eventsArr from '../../gateway/events';

import './calendar.scss';

const Calendar = ({ weekDates }) => {
  const [events, setEvents] = useState(eventsArr);

  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week weekDates={weekDates} events={events} />
        </div>
      </div>
    </section>
  );
};

export default Calendar;
