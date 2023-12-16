import { useState } from "react";
import getDaysInMonth from "date-fns/getDaysInMonth";
import getMonth from "date-fns/getMonth";
import getYear from "date-fns/getYear";
import getDay from "date-fns/getDay";
import startOfMonth from "date-fns/startOfMonth";
import format from "date-fns/format";

export interface DateInfo {
    year: number;
    month: string;
    monthStart: number;
    monthEnd: number;
    daysInMonth: number;
    firstDay: string;
    getNextMonth: any;
    getPreviousMonth: any;
    getCurrentMonth: any;
    getWeekDay: any;
}

const useDate = (): DateInfo => {
    const [date, setDate] = useState(new Date());
    const year: number = getYear(date);
    // Month in string format; e.g. 'November'
    const month: string = format(date, "LLLL");
    const monthStart: number = new Date(date.getFullYear(), date.getMonth()).getTime();
    const monthEnd: number = new Date(date.getFullYear(), date.getMonth() + 1).getTime();
    const daysInMonth: number = getDaysInMonth(date);
    // First day of the month; e.g. 'Tue'
    const firstDay: string = format(startOfMonth(date), "E");

    const getNextMonth = (): void => {
        setDate((prevDate) => new Date(getYear(prevDate), getMonth(prevDate) + 1));
    };

    const getPreviousMonth = (): void => {
        setDate((prevDate) => new Date(getYear(prevDate), getMonth(prevDate) - 1));
    };

    const getCurrentMonth = (): void => {
        setDate(() => new Date());
    };

    const getWeekDay = (dateString: Date): number => {
        return getDay(new Date(dateString));
    }

  return {
    year,
    month,
    monthStart,
    monthEnd,
    daysInMonth,
    firstDay,
    getNextMonth,
    getPreviousMonth,
    getCurrentMonth,
    getWeekDay,
  };
};

export default useDate;
