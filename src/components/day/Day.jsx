import React from 'react';
import propTypes from 'prop-types';

import Hour from '../hour/Hour';

import './day.scss';

const Day = ({ dataDay, currentMonth, dayEvents, deleteEvent }) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  return (
    <div className="calendar__day" data-day={dataDay}>
      {hours.map((hour) => {
        //getting all events from the day we will render
        const hourEvents = dayEvents.filter(
          (event) => event.dateFrom.getHours() === hour
        );

        return (
          <Hour
            key={dataDay + hour}
            dataHour={hour}
            dataDay={dataDay}
            currentMonth={currentMonth}
            hourEvents={hourEvents}
            deleteEvent={deleteEvent}
          />
        );
      })}
    </div>
  );
};

export default Day;

Day.propTypes = {
  dataDay: propTypes.number.isRequired,
  currentMonth: propTypes.number.isRequired,
  dayEvents: propTypes.array.isRequired,
  deleteEvent: propTypes.func.isRequired,
};
