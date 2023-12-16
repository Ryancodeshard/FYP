'use client'

import { DateInfo } from '../_hooks/useDate'
import { parse, format, getDate, getDay, subDays, subMonths, startOfMonth, getMonth, addMonths } from 'date-fns';
import DayList from './DayList';

interface CalendarProps {
    date: DateInfo;
}
export const Calendar = (props: CalendarProps) => {
    const { date } = props;

    // An array of days containing events for populating the calendar
    const days = Array.from({ length: date.daysInMonth }, (_, i) => {
        const currentDay = i + 1;

        //Creates dateObject using month spelled out in a string, currentDay and year
        const dateObject = parse(
            `${date.month}, ${currentDay}, ${date.year}`,
            "MMMM, d, yyyy",
            new Date()
        );

        return {
            date: dateObject,
            // events: getEventsByDayNumber(currentDay, eventsInSelectedMonth),
        };
    });
    const previousMonth = subMonths(startOfMonth(days[0].date), 1);
    const previousMonthDateString = format(previousMonth, 'MMMM');
    const firstDayOfTheMonthWeekday = getDay(days[0].date);
    const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday;
    const previousMonthLastDayOfMonth = getDate(
        subDays(days[0].date, visibleNumberOfDaysFromPreviousMonth)
    );
    const previousMonthDays = Array.from({ length: visibleNumberOfDaysFromPreviousMonth }, (_, i) => previousMonthLastDayOfMonth + i);
    const previousMonthDateObjects = previousMonthDays.map((currentDay) => {
        const dateObject =  parse(
            `${previousMonthDateString}, ${currentDay}, ${previousMonth.getFullYear()}`,
            "MMMM, d, yyyy",
            new Date()
        );

        return {
            date: dateObject,
            // events: getEventsByDayNumber(currentDay, eventsInSelectedMonth),
        }
    });
    const currentMonth: number = getMonth(days[0].date); 
    const lastDayOfTheMonthWeekday = getDay(new Date(date.year, currentMonth, days.length));
    const nextMonth = addMonths(startOfMonth(days[0].date), 1);
    const nextMonthDateString = format(nextMonth, 'MMMM');
    const visibleNumberOfDaysFromNextMonth = 6 - lastDayOfTheMonthWeekday;
    const nextMonthDays = Array.from({ length: visibleNumberOfDaysFromNextMonth }, (_, i) => i+1);
    const nextMonthDateObjects = nextMonthDays.map((currentDay) => {
        const dateObject = parse(
            `${nextMonthDateString}, ${currentDay}, ${nextMonth.getFullYear()}`,
            "MMMM, d, yyyy",
            new Date()
        );

        return {
            date: dateObject,
            // events: getEventsByDayNumber(currentDay, eventsInSelectedMonth),
        }
    })
    const monthDays = [...previousMonthDateObjects, ...days, ...nextMonthDateObjects];
    
    return (
        <DayList calendarGridDayObjects={monthDays} />
    )
}


export default (Calendar)