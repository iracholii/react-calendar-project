import React, { useState, useEffect, FC } from 'react';

const CurrentTimeLine: FC = () => {
  const [redLine, setRedLine] = useState<number>(new Date().getMinutes());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRedLine(new Date().getMinutes());
    }, 60000);
    return clearInterval(intervalId);
  }, []);

  return <div className="red-line" style={{ top: redLine + 'px' }}></div>;
};

export default CurrentTimeLine;
