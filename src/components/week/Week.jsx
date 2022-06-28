import React from 'react';
import propTypes from 'prop-types';

import Day from '../day/Day';

import './week.scss';

const Week = ({ weekDates, events, deleteEvent }) => {
  return (
    <div className="calendar__week">
      {weekDates.map((dayStart) => {
        const dayEnd = new Date(dayStart.getTime()).setHours(
          dayStart.getHours() + 24
        );

        //getting all events from the day we will render
        const dayEvents = events.filter(
          (event) => event.dateFrom >= dayStart && event.dateTo < dayEnd
        );

        return (
          <Day
            key={dayStart.getDate()}
            dataDay={dayStart.getDate()}
            currentMonth={dayStart.getMonth()}
            dayEvents={dayEvents}
            deleteEvent={deleteEvent}
          />
        );
      })}
    </div>
  );
};

export default Week;

Week.propTypes = {
  weekDates: propTypes.array.isRequired,
  events: propTypes.array.isRequired,
  deleteEvent: propTypes.func.isRequired,
};
