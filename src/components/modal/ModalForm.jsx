import React from 'react';
import propTypes from 'prop-types';

const ModalForm = ({ changeHandler, submitHandler, formData }) => {
  const { title, date, startTime, endTime, description } = formData;

  return (
    <form className="event-form" onSubmit={submitHandler}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        className="event-form__field"
        onChange={changeHandler}
        value={title}
      />
      <div className="event-form__time">
        <input
          type="date"
          name="date"
          className="event-form__field"
          onChange={changeHandler}
          value={date}
        />
        <input
          type="time"
          name="startTime"
          className="event-form__field"
          onChange={changeHandler}
          value={startTime}
        />
        <span>-</span>
        <input
          type="time"
          name="endTime"
          className="event-form__field"
          onChange={changeHandler}
          value={endTime}
        />
      </div>
      <textarea
        name="description"
        placeholder="Description"
        className="event-form__field"
        onChange={changeHandler}
        value={description}
      ></textarea>
      <button type="submit" className="event-form__submit-btn">
        Create
      </button>
    </form>
  );
};

export default ModalForm;

ModalForm.propTypes = {
  changeHandler: propTypes.func.isRequired,
  submitHandler: propTypes.func.isRequired,
  formData: propTypes.object.isRequired,
};
