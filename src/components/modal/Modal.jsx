import React, { useState } from 'react';
import propTypes from 'prop-types';

import ModalForm from './ModalForm';

import './modal.scss';

const Modal = ({
  setIsModalVisible,
  createNewEvent,
  initialFormData,
  setInitialFormData,
}) => {
  const [formData, setFormData] = useState({
    ...initialFormData,
    title: '',
    description: '',
  });

  const closeModalHandler = () => {
    setIsModalVisible(false);

    setFormData({
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      description: '',
    });

    setInitialFormData({
      date: '',
      startTime: '',
      endTime: '',
    });
  };

  const { startTime, endTime } = formData;

  const changeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const eventDurationInHours = (start, end) => {
    return end.slice(0, 2) - start.slice(0, 2);
  };

  const isTimeMultipleOf15 = (time) => {
    return time.slice(3, 5) % 15 === 0;
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (eventDurationInHours(startTime, endTime) > 6) {
      alert('Event must be no longer than 6 hours');
      return;
    }

    if (!isTimeMultipleOf15(startTime) || !isTimeMultipleOf15(endTime)) {
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
  setIsModalVisible: propTypes.func.isRequired,
  createNewEvent: propTypes.func.isRequired,
  initialFormData: propTypes.object.isRequired,
  setInitialFormData: propTypes.func.isRequired,
};
