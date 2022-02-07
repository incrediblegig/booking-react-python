import Day from './Day';
import React from 'react';
import { useSelector } from 'react-redux';


function daysInMonth(month, year) {
    return new Date(year, month+1, 0).getDate();
}


export default function CalendarBody() {

    const date = useSelector(state => state.date.value);

    return (
<div className="calendar-body">

    <div className="calendar-body-row">
        {Array(7).fill(0).map((_, i) => (<Day dayNumber={i+1} />), )}
    </div>
    <div className="calendar-body-row">
        {Array(7).fill(0).map((_, i) => (<Day dayNumber={i+8} />), )}
    </div>
    <div className="calendar-body-row">
        {Array(7).fill(0).map((_, i) => (<Day dayNumber={i+15} />), )}
    </div>
    <div className="calendar-body-row">
        {Array(7).fill(0).map((_, i) => (<Day dayNumber={i+22} />), )}
    </div>
    <div className="calendar-body-row">
        {Array(
            daysInMonth(date.getMonth(),
            date.getFullYear())-27).fill(0)
            .map((_, i) => (<Day dayNumber={i+28} />), )}
    </div>

</div>
    );
};
