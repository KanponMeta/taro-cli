import type {BaseComponent} from '../base/type';

import {useMemo, useState} from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import {getWeekday} from '@/utils/date';

import {View} from '@tarojs/components';
import Picker from '@/components/Picker';

interface DatePickerProps extends BaseComponent {
  dayRange?: number;
  value: dayjs.Dayjs;
  onDateChange: (date: dayjs.Dayjs) => void;
}

/**
 * This component renders a date picker with customizable options.
 * It allows the user to select a date, hour, and minute.
 * The selected date and time are displayed in a formatted text.
 *
 * @param props - The component props.
 * @param props.dayRange - The number of days to show in the date range.
 * @param props.value - The initial value of the date picker.
 * @param props.onDateChange - The function called when the date picker value changes.
 * @param props.className - The optional CSS class name for styling.
 */
const DatePicker = (props: DatePickerProps) => {
  // Default day range is 10 days
  const dayRange = props.dayRange || 10;

  // Default picker value is the current date and time
  const currentPickerValue = [dayRange, dayjs().hour(), dayjs().minute()];

  // State to hold the current picker date
  const [currentPickerDate, setCurrentPickerDate] = useState(props.value);

  /**
   * Generates the list of selectable dates.
   * The list includes the date for the next `dayRange` days.
   *
   * @returns The list of selectable dates.
   */
  const dateSelect = useMemo(() => {
    const handDate = dayjs().subtract(10, 'day');

    const dateList: string[] = [];
    for (let i = 0; i < 21; i++) {
      const tmp = handDate.add(i, 'day');
      dateList.push(`${tmp.format('MM/DD')} ${getWeekday(tmp.day())}`);
    }
    return dateList;
  }, []);

  /**
   * Generates the list of selectable hours.
   * The list includes all hours of the day.
   *
   * @returns The list of selectable hours.
   */
  const hourSelect = useMemo(() => {
    const hourList: string[] = [];
    for (let i = 0; i < 24; i++) {
      let hour = i.toString();
      if (hour.length === 1) {
        hour = `0${hour}`;
      }
      hourList.push(hour);
    }
    return hourList;
  }, []);

  /**
   * Generates the list of selectable minutes.
   * The list includes all minutes of an hour.
   *
   * @returns The list of selectable minutes.
   */
  const minuteSelect = useMemo(() => {
    const minuteList: string[] = [];
    for (let i = 0; i < 60; i++) {
      let minute = i.toString();
      if (minute.length === 1) {
        minute = `0${minute}`;
      }
      minuteList.push(minute);
    }
    return minuteList;
  }, []);

  /**
   * Handles the change event of the date picker.
   * Updates the current picker date and calls the `onDateChange` callback.
   *
   * @param currentSelector - The selected values of the date picker.
   */
  const onDatePickerChange = (
    currentSelector: number[] = currentPickerValue,
  ) => {
    const [dateIndex, hourIndex, minuteIndex] = currentSelector;
    let tempResult = dayjs();
    if (dateIndex > dayRange) {
      tempResult = dayjs().add(dateIndex - dayRange, 'day');
    } else {
      tempResult = dayjs().subtract(dayRange - dateIndex, 'day');
    }

    const dateResult = tempResult.hour(hourIndex).minute(minuteIndex);
    setCurrentPickerDate(dateResult);
    props.onDateChange(dateResult);
  };

  /**
   * Formats the current picker text based on the selected time.
   * The formatted text includes the date, weekday, and time.
   *
   * @param time - The selected time.
   * @returns The formatted current picker text.
   */
  const formatCurrentPickerText = (time: dayjs.Dayjs) => {
    if (!time.isValid()) return '请选择时间';

    return `${time.format('MM/DD')} ${getWeekday(time.day())} ${time.format(
      'HH:mm',
    )}`;
  };

  const rootClass = classNames('date-picker', props.className);
  return (
    <View className={rootClass}>
      <Picker
        mode='multiSelector'
        content={formatCurrentPickerText(currentPickerDate)}
        range={[dateSelect, hourSelect, minuteSelect]}
        value={currentPickerValue}
        onChange={e => onDatePickerChange(e.detail.value)}
      />
    </View>
  );
};

export default DatePicker;
