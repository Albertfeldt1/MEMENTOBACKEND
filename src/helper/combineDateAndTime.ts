const combineDateAndTime = (date: Date, time: string) => {
  const [clock, modifier = 'AM'] = time.trim().split(' ');
  let [hours, minutes] = clock.split(':').map(Number);

  if (modifier.toUpperCase() === 'PM' && hours < 12) hours += 12;
  if (modifier.toUpperCase() === 'AM' && hours === 12) hours = 0;

  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hours,
    minutes,
    0,
    0
  );
};

export default combineDateAndTime;