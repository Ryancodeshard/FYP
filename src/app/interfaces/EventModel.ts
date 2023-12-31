import { add, startOfDay, startOfHour } from "date-fns";

export class EventModel {
    ID: number;
    title: string;
    startDate: Date;
    endDate: Date;
    allDay: boolean;
    startTime: Date;
    endTime: Date;
    notes: string;

    constructor(
        _ID: number,
        _title: string,
        _startDate: Date,
        _endDate: Date,
        _allDay: boolean,
        _startTime: Date,
        _endTime: Date,
        _notes: string
    ){
        this.ID = _ID;
        this.title = _title;
        this.startDate = _startDate;
        this.endDate = _endDate;
        this.allDay = _allDay;
        this.startTime = _startTime;
        this.endTime = _endTime;
        this.notes = _notes;
    }
    
    static getInitialEventValues() {
        const date = startOfDay(new Date());
        const startTime = add(startOfHour(date), { hours: 1 });
        const endTime = add(startOfHour(date), { hours: 2 });
        return new EventModel(-1, '', date, date, false, startTime, endTime, '');
    }
}