import React from 'react';
import propTypes from 'prop-types';

import { days } from '../../utils/dateUtils.js';

import './navigation.scss';

const Navigation = ({ weekDates }) => {
  return (
    <header className="calendar__header">
      {weekDates.map((dayDate) => {
        const currentDay =
          dayDate.getDate() === new Date().getDate() &&
          dayDate.getMonth() === new Date().getMonth();

        const dayNameClasses = `day-label__day-name ${
          currentDay && 'day-label__day-name-current'
        }`;
        const dayNumberClasses = `day-label__day-number ${
          currentDay && 'day-label__day-number-current'
        }`;

        return (
          <div
            key={dayDate.getDate()}
            className="calendar__day-label day-label"
          >
            <span className={dayNameClasses}>{days[dayDate.getDay()]}</span>
            <span className={dayNumberClasses}>{dayDate.getDate()}</span>
          </div>
        );
      })}
    </header>
  );
};

export default Navigation;

Navigation.propTypes = {
  weekDates: propTypes.array.isRequired,
};
