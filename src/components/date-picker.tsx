import React, {useState} from 'react';
import DatePicker, {registerLocale} from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {dateToString, stringToDate} from "@/utils/helper";
import {IFilterPayload} from "@/types";

interface IProps {
  date: string | null;
  onChangeFilterPayload: (key:keyof IFilterPayload, val: any) => void,
  type: "start" | "end"
}


const DateTimePicker = ({date, onChangeFilterPayload, type}: IProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(date ? stringToDate(date) : null);

  const handleChange = (date: Date | null) => {
    console.log(date)
    if (!date) return;

    setSelectedDate(date);

    if (type === "start") {
      onChangeFilterPayload("startDate", dateToString(date))
    } else if (type === "end") {
      onChangeFilterPayload("endDate", dateToString(date))
    }
  }



  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date | null) => date && handleChange(date)}
      wrapperClassName="datePicker"
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      placeholderText={!date ?  "Any time": "" }
      dateFormat="MMMM d, yyyy h:mm aa"
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6"
    />
  );
}

export default DateTimePicker;
