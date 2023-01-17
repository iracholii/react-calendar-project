import React, { useState, FC, Dispatch, SetStateAction } from 'react';

import ModalForm from './ModalForm';

import { isFormDataValid } from '../../utils/validation';
import { IInitialFormData, INewEventData } from '../../types';

import './modal.scss';

type Props = {
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  createNewEvent: (eventData: INewEventData) => void;
  initialFormData: IInitialFormData;
  setInitialFormData: Dispatch<SetStateAction<IInitialFormData>>;
};

const Modal: FC<Props> = ({
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

  const changeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = event.target;

    setFormData({ ...formData, [target.name]: target.value });
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isFormDataValid(startTime, endTime, new Date(date))) {
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
