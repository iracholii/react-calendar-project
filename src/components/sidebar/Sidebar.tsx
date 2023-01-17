import React, { FC } from 'react';

import { hours } from '../../utils/dateUtils';

import './sidebar.scss';

const Sidebar: FC = () => {
  return (
    <div className="calendar__time-scale">
      {hours.map((hour) => (
        <div key={hour} className="time-slot">
          <span className="time-slot__time">{`${hour}:00`}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
