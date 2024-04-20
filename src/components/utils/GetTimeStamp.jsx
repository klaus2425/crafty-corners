const getTimestamp = (date) => {
  const dateObject = new Date(date.replace(' ', 'T'));
  const currentDate = new Date(); // Get the current date

  // Check if the provided date is in the same week as the current date but not the current day
  const isSameWeek = dateObject.getFullYear() === currentDate.getFullYear() &&
    dateObject.getMonth() === currentDate.getMonth() &&
    Math.abs(dateObject.getDate() - currentDate.getDate()) < 7 &&
    dateObject.getDay() !== currentDate.getDay();

  // Check if the provided date is the current date
  const isCurrentDate = dateObject.toDateString() === currentDate.toDateString();

  let formattedTime;

  if (isCurrentDate) {
    formattedTime = getTimeString(dateObject);
  } else if (isSameWeek) {
    const day = dateObject.toLocaleString('default', { weekday: 'short' });
    formattedTime = `${day}, ${getTimeString(dateObject)}`;
  } else {
    const month = dateObject.toLocaleString('default', { month: 'short' });
    const day = dateObject.getDate();
    const year = dateObject.getFullYear();
    formattedTime = `${month} ${day}${year !== currentDate.getFullYear() ? `, ${year}` : ''}, ${getTimeString(dateObject)}`;
  }

  return formattedTime;
}

// Function to format time string
const getTimeString = (dateObject) => {
  const hours = dateObject.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
  const minutes = dateObject.getMinutes().toString().padStart(2, '0');
  return `${formattedHours}:${minutes} ${ampm}`;
}





export default getTimestamp;