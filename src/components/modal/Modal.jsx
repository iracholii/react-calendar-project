import React from 'react';
import propTypes from 'prop-types';

import './modal.scss';

const Modal = ({
  closeModalHandler,
  createNewEvent,
  formData,
  setFormData,
}) => {
  const changeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (formData.endTime.slice(0, 2) - formData.startTime.slice(0, 2) > 6) {
      alert('Event must be no longer than 6 hours');
      return;
    }

    if (
      formData.startTime.slice(3, 5) % 15 !== 0 ||
      formData.endTime.slice(3, 5) % 15 !== 0
    ) {
      alert('Event timing must be a multiple of 15');
      return;
    }

    createNewEvent(formData);
    closeModalHandler();
  };

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button
            className="create-event__close-btn"
            onClick={closeModalHandler}
          >
            +
          </button>
          <form className="event-form" onSubmit={submitHandler}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
              onChange={changeHandler}
              value={formData.title}
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                onChange={changeHandler}
                value={formData.date}
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                onChange={changeHandler}
                value={formData.startTime}
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                onChange={changeHandler}
                value={formData.endTime}
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              onChange={changeHandler}
              value={formData.description}
            ></textarea>
            <button type="submit" className="event-form__submit-btn">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  closeModalHandler: propTypes.func.isRequired,
  createNewEvent: propTypes.func.isRequired,
  formData: propTypes.object.isRequired,
  setFormData: propTypes.func.isRequired,
};
