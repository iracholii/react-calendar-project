import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';

import Event from '../event/Event';

import { formatMins } from '../../../src/utils/dateUtils.js';

const Hour = ({ dataHour, dataDay, currentMonth, hourEvents, deleteEvent }) => {
  const [redLine, setRedLine] = useState(new Date().getMinutes());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRedLine(new Date().getMinutes());
    }, 60000);
    return clearInterval(intervalId);
  }, []);

  return (
    <div
      className="calendar__time-slot"
      data-time={dataHour + 1}
      data-day={dataDay}
      data-month={currentMonth}
    >
      {dataHour === new Date().getHours() &&
        dataDay === new Date().getDate() &&
        currentMonth === new Date().getMonth() && (
          <div className="red-line" style={{ top: redLine + 'px' }}></div>
        )}

      {/* if no events in the current hour nothing will render here */}
      {hourEvents.map(({ id, dateFrom, dateTo, title, description }) => {
        const eventStart = `${dateFrom.getHours()}:${formatMins(
          dateFrom.getMinutes()
        )}`;
        const eventEnd = `${dateTo.getHours()}:${formatMins(
          dateTo.getMinutes()
        )}`;

        return (
          <Event
            key={id}
            //calculating event height = duration of event in minutes
            height={(dateTo.getTime() - dateFrom.getTime()) / (1000 * 60)}
            marginTop={dateFrom.getMinutes()}
            time={`${eventStart} - ${eventEnd}`}
            title={title}
            description={description}
            id={id}
            deleteEvent={deleteEvent}
          />
        );
      })}
    </div>
  );
};

export default Hour;

Hour.propTypes = {
  dataHour: propTypes.number.isRequired,
  dataDay: propTypes.number.isRequired,
  currentMonth: propTypes.number.isRequired,
  hourEvents: propTypes.array.isRequired,
  deleteEvent: propTypes.func.isRequired,
};
