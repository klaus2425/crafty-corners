const debounce = (func, delay) => {
  let timerId;
  return (...args) => {
      if (timerId) {
          clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
          func.apply(this, args);
      }, delay);
  };
};

export default debounce;