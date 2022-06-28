import React from 'react';
import propTypes from 'prop-types';

const DeleteEvent = ({ id, deleteEvent, showDeleteEventButton }) => {
  return (
    <>
      {showDeleteEventButton && (
        <button
          className="button delete-event-btn"
          onClick={() => deleteEvent(id)}
        >
          <i className="fas fa-trash delete-event-btn__icon" />
        </button>
      )}
    </>
  );
};

export default DeleteEvent;

DeleteEvent.propTypes = {
  id: propTypes.string.isRequired,
  deleteEvent: propTypes.func.isRequired,
  showDeleteEventButton: propTypes.bool.isRequired,
};
