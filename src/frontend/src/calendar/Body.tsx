import DayCell from './Day';
import DayPlaceholderCell from './DayPlaceholder';
import { useEffect } from 'react';
import { useAppSelector } from '../store';
import { useParams } from 'react-router-dom';


function daysInMonth(month: number, year: number) {
    return new Date(year, month+1, 0).getDate();
}


async function getMonthlyBookings(slotID: string, date: Date) {

    const starPeriod = new Date(date.getFullYear(), date.getMonth()).toISOString().slice(0,-5)+"Z";
    const endPeriod = new Date(date.getFullYear(), daysInMonth(date.getMonth(), date.getFullYear())).toISOString().slice(0,-5)+"Z";

    const response = await fetch(`http://localhost:5000/api/slots/${slotID}/already_booked?start_period=${starPeriod}&end_period=${endPeriod}`);
    
    const data = await response.json();
    console.log(data);
    return data.bookings;
}


export default function CalendarBody() {

    const monthViewTime = useAppSelector(state => state.monthView.value);
    const monthView = new Date(monthViewTime);

    const { slotID } = useParams();
    if (!slotID) {
        return <div>No slotID</div>;
    }

    useEffect(() => {
        getMonthlyBookings(slotID, monthView);
    }, [monthView]);

    const lastRowDays = daysInMonth(monthView.getMonth(), monthView.getFullYear()) - 28;

    return (
<div className="calendar-body">


    <div className="calendar-body-row">
        {Array(7).fill(0).map((_, i) => (<DayCell monthView={monthView} dayNumber={i+1} key={i} />), )}
    </div>
    <div className="calendar-body-row">
        {Array(7).fill(0).map((_, i) => (<DayCell monthView={monthView} dayNumber={i+8} key={i} />), )}
    </div>
    <div className="calendar-body-row">
        {Array(7).fill(0).map((_, i) => (<DayCell monthView={monthView} dayNumber={i+15} key={i} />), )}
    </div>
    <div className="calendar-body-row">
        {Array(7).fill(0).map((_, i) => (<DayCell monthView={monthView} dayNumber={i+22} key={i} />), )}
    </div>
    {lastRowDays > 0 &&
    <div className="calendar-body-row">
        {Array(lastRowDays)
            .fill(0)
            .map((_, i) => (<DayCell monthView={monthView} dayNumber={i+29} key={i} />), )}
        {Array(7 - lastRowDays)
            .fill(0)
            .map((_, i) => (<DayPlaceholderCell key={i} />), )}
    </div>
    }

</div>
    );
};
