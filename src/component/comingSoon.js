import React, { useState, useEffect } from 'react';

const ComingSoon = () => {
  const calculateTimeLeft = () => {
    const targetDate = new Date('2024-11-31T00:00:00'); // Set your launch date here
    const now = new Date();
    const difference = targetDate - now;
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        day: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timerComponents = [];
  Object.keys(timeLeft).forEach((interval) => {
    if (timeLeft[interval]) {
      timerComponents.push(
        <span key={interval}>
          {timeLeft[interval]} {interval}{' '}
        </span>
      );
    }
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>We're Coming Soon!</h1>
      <p style={styles.subHeader}>Break Out Game is under maintainance</p>
      {/* {timerComponents.length ? (
        <div style={styles.timer}>
          {timerComponents}
        </div>
      ) : (
        <p style={styles.launchText}>The wait is over! 🎉</p>
      )} */}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    color: '#333',
    padding: '50px',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: '2.5rem',
    marginBottom: '20px',
  },
  subHeader: {
    fontSize: '1.2rem',
    marginBottom: '30px',
  },
  timer: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  launchText: {
    fontSize: '1.5rem',
    color: '#28a745',
  },
};

export default ComingSoon;
