import React, { useState } from 'react';

import DateItem from './DateItem';
import DateSelect from './DateSelect';
// import Form from './Form'

import styles from './DateManager.module.css';

const TODAYS_DATE = new Date()


const DateManager = () => {

    const [filterDate, setDate] = useState({
        month: TODAYS_DATE.getMonth(),
        year: TODAYS_DATE.getFullYear()
    });

    const initOptions = () => {
        const currentYear = parseInt(TODAYS_DATE.getFullYear());
        const yearArr = [];
        for (let i = currentYear; i < currentYear + 100; i++) {
            yearArr.push(i);
        }
        return yearArr;
    }

    const monthHandler = (newMonth) => {
        setDate((prevState) => {
            return {
                month: newMonth,
                year: prevState.year
            }
        })
    }

    const yearHandler = (newYear) => {
        setDate((prevState) => {
            return {
                month: prevState.month,
                year: newYear
            }
        })
    }

    const options = {
        years: initOptions(),
        months: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ]
    };

    return (
        <div>
            <div className="filter">
                <p>Filter by:</p>
                <DateSelect valueType="month" value={filterDate.month} options={options.months} onSaveDate={monthHandler} />
                <DateSelect valueType="year" value={filterDate.year} options={options.years} onSaveDate={yearHandler} />
            </div>
            <article className={`${styles['date-man']}`}>
                {/* <Form /> */}
                <DateItem />
                <DateItem />
                <DateItem />
                <DateItem />
                <DateItem />
            </article >
        </div >
    )
}

export default DateManager;