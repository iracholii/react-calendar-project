import React, { useState } from 'react';
import propTypes from 'prop-types';

import ModalForm from './ModalForm';

import { isFormDataValid } from '../../utils/validation';

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

  const { startTime, endTime, date } = formData;

  const changeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (isFormDataValid(startTime, endTime, date)) {
      createNewEvent(formData);
      closeModalHandler();
    }
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
