import React from 'react';
import propTypes from 'prop-types';

import ModalForm from './ModalForm';

import './modal.scss';

const Modal = ({
  closeModalHandler,
  createNewEvent,
  formData,
  setFormData,
}) => {
  const { startTime, endTime } = formData;

  const changeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (endTime.slice(0, 2) - startTime.slice(0, 2) > 6) {
      alert('Event must be no longer than 6 hours');
      return;
    }

    if (startTime.slice(3, 5) % 15 !== 0 || endTime.slice(3, 5) % 15 !== 0) {
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
          <ModalForm
            formData={formData}
            changeHandler={changeHandler}
            submitHandler={submitHandler}
          />
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
