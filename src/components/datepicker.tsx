import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const DateTimePicker: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => date && setStartDate(date)}
      wrapperClassName="datePicker"
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      dateFormat="MMMM d, yyyy h:mm aa"
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6"
    />
  );
}

export default DateTimePicker;
