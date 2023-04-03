import React, { useState } from 'react';

import DateItem from './DateItem';
import DateSelect from './DateSelect';
// import Form from './Form'

import styles from './DateManager.module.css';

const TODAYS_DATE = new Date(2023, 0, 28);


const DateManager = () => {

    const [filterDate, setDate] = useState({
        month: TODAYS_DATE.getMonth(),
        year: TODAYS_DATE.getFullYear(),
        date: TODAYS_DATE.getDate()
    });

    const initDateArr = (month, year) => {
        let date = new Date(year, month, 1);
        let days = [];
        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    }

    const initOptions = () => {
        const currentYear = parseInt(TODAYS_DATE.getFullYear());
        const yearArr = [];
        for (let i = currentYear; i < currentYear + 100; i++) {
            yearArr.push(i);
        }
        return yearArr;
    }

    const dateList = initDateArr(filterDate.month, filterDate.year);

    const monthHandler = (newMonth) => {
        setDate((prevState) => {
            return {
                month: parseInt(newMonth.target.value),
                year: prevState.year,
                date: 1
            }
        })
        // setDateManager();
    }

    const yearHandler = (newYear) => {
        setDate((prevState) => {
            return {
                month: prevState.month,
                year: parseInt(newYear.target.value),
                date: 1
            }
        })
        // setDateManager();
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

    let startDate = 0;
    let endDate = 5;

    const setDates = () => {
        if (filterDate.date < 5) {
            startDate = dateList[0].getDate();
        }
        else if (filterDate.date >= 5 && filterDate.date < (dateList.length - 3)) {
            startDate = filterDate.date - 2;
            endDate = filterDate.date + 3;
        }
        else if (filterDate.date > (dateList.length - 6)) {
            console.log("DateList:", dateList[dateList.length - 5].getDate(), dateList[dateList.length - 1].getDate());
            startDate = dateList[dateList.length - 5].getDate();
            endDate = dateList[dateList.length - 1].getDate();
        }
    }

    setDates();

    const filterArr = dateList.filter((el) => {
        return el.getDate() >= startDate && el.getDate() <= endDate;
    })

    return (
        <div className='datePicker'>
            <div className="filter">
                <p>Filter by:</p>
                <DateSelect valueType="month" value={filterDate.month} options={options.months} onSaveDate={monthHandler} />
                <DateSelect valueType="year" value={filterDate.year} options={options.years} onSaveDate={yearHandler} />
            </div>
            <article className={`${styles['date-man']}`}>
                {/* <Form /> */}
                {
                    filterArr.map((el, index) => {
                        if (filterDate.date === el.getDate()) {
                            console.log("FilterDate:", filterDate.date, index)
                            return <DateItem key={`${el.getDate()}-${filterDate.month}`} active="active" month={options.months[filterDate.month].slice(0, 3)} date={el.getDate()} />
                        }
                        else {
                            console.log("OtherDate:", filterDate.date, index)
                            return <DateItem key={`${el.getDate()}-${filterDate.month}`} month={options.months[filterDate.month].slice(0, 3)} date={el.getDate()} />
                        }
                    })
                }
            </article >
        </div >
    )
}

export default DateManager;