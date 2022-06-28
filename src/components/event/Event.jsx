import React, { useState } from 'react';
import propTypes from 'prop-types';

import DeleteEvent from './DeleteEvent';

import './event.scss';

const Event = ({
  height,
  marginTop,
  title,
  description,
  time,
  id,
  deleteEvent,
}) => {
  const eventStyle = {
    height,
    marginTop,
  };

  const [showDeleteEventButton, setShowDeleteEventButton] = useState(false);

  const onEventClickHandler = () => {
    setShowDeleteEventButton(!showDeleteEventButton);
  };

  return (
    <div style={eventStyle} className="event" onClick={onEventClickHandler}>
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
      <div className="event__description">{description}</div>

      <DeleteEvent
        id={id}
        deleteEvent={deleteEvent}
        showDeleteEventButton={showDeleteEventButton}
      />
    </div>
  );
};

export default Event;

Event.propTypes = {
  height: propTypes.number.isRequired,
  marginTop: propTypes.number.isRequired,
  title: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  time: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  deleteEvent: propTypes.func.isRequired,
};
