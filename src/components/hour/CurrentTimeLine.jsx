import React, { useState, useEffect } from 'react';

const CurrentTimeLine = () => {
  const [redLine, setRedLine] = useState(new Date().getMinutes());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRedLine(new Date().getMinutes());
    }, 60000);
    return clearInterval(intervalId);
  }, []);

  return <div className="red-line" style={{ top: redLine + 'px' }}></div>;
};

export default CurrentTimeLine;
