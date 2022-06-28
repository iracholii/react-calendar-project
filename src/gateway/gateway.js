const baseUrl = 'https://627b8319a01c46a8531fa362.mockapi.io/api/v1/events';

export const getEvents = () =>
  fetch(baseUrl)
    .then((response) => {
      if (!response.ok) {
        alert("Internal Server Error. Can't display events");
      }
      return response.json();
    })
    .then((events) =>
      events.map((event) => ({
        ...event,
        dateFrom: new Date(event.dateFrom),
        dateTo: new Date(event.dateTo),
      }))
    );

export const addNewEvent = (eventData) =>
  fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData),
  }).then((response) => {
    if (!response.ok) {
      alert("Internal Server Error. Can't create new event");
    }
  });

export const deleteEvent = (eventId) =>
  fetch(`${baseUrl}/${eventId}`, {
    method: 'DELETE',
  }).then((response) => {
    if (!response.ok) {
      alert("Internal Server Error. Can't delete event");
    }
  });
