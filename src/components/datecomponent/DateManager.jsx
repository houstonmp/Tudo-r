import React, { useState } from 'react';

import DateItem from './DateItem';
import DateSelect from './DateSelect';
// import Form from './Form'

import styles from './DateManager.module.css';

const TODAYS_DATE = new Date();


const DateManager = (props) => {

    // const [filterDate, setDate] = useState({
    //     month: TODAYS_DATE.getMonth(),
    //     year: TODAYS_DATE.getFullYear(),
    //     date: TODAYS_DATE.getDate()
    // });


    // const [displayArrow, setArrow] = useState({
    //     left: false,
    //     right: false
    // });

    let displayArrow = {
        left: false,
        right: true
    }

    let startDate = 0;
    let endDate = 5;

    const setDates = () => {
        if (props.filterDate.date < 5) {
            startDate = dateList[0].getDate();
            //See if there is a better way to write code
            if (1 === props.filterDate.date) {
                displayArrow = {
                    left: false,
                    right: true
                }
            } else {
                displayArrow = {
                    left: true,
                    right: true
                }
            }

        }
        else if (props.filterDate.date >= 5 && props.filterDate.date < (dateList.length - 3)) {
            startDate = props.filterDate.date - 2;
            endDate = props.filterDate.date + 2;
            displayArrow = {
                left: true,
                right: true
            }
        }
        else if (props.filterDate.date > (dateList.length - 6)) {
            startDate = dateList[dateList.length - 5].getDate();
            endDate = dateList[dateList.length - 1].getDate();

            //See if there is a better way to write code
            if (dateList.length === props.filterDate.date) {
                displayArrow = {
                    left: true,
                    right: false
                }
            } else {
                displayArrow = {
                    left: true,
                    right: true
                }
            }

        }
        // props.onLoadDate(filterDate.date, filterDate.month, filterDate.year);
    }

    const initDateArr = (month, year) => {
        let date = new Date(year, month, 1);
        let days = [];
        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }

        return days;
    }

    const dateList = initDateArr(props.filterDate.month, props.filterDate.year);

    const initOptions = () => {
        const currentYear = parseInt(TODAYS_DATE.getFullYear());
        const yearArr = [];
        for (let i = currentYear; i < currentYear + 100; i++) {
            yearArr.push(i);
        }
        return yearArr;
    }

    const monthHandler = (newMonth) => {
        props.onFilterDate((prevState) => {
            return {
                month: parseInt(newMonth.target.value),
                year: prevState.year,
                date: 1
            }
        });
    }

    const yearHandler = (newYear) => {
        props.onFilterDate((prevState) => {
            return {
                month: prevState.month,
                year: parseInt(newYear.target.value),
                date: 1
            }
        });
    }

    setDates();

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

    const moveLeft = () => {
        props.onFilterDate((prevState) => {
            return {
                month: prevState.month,
                year: prevState.year,
                date: (prevState.date - 1)
            }
        });
        setDates();
    }
    const moveRight = () => {
        props.onFilterDate((prevState) => {
            return {
                month: prevState.month,
                year: prevState.year,
                date: (prevState.date + 1)
            }
        });
        setDates();
    }

    const clickHandler = (event) => {
        //Due to event bubbling you need to grab the event first before you assign it in the onFilterDate function which will be passed into the parent Component
        let eventDate = event.currentTarget.children[1].textContent;
        props.onFilterDate((prevState) => {
            return {
                month: prevState.month,
                year: prevState.year,
                date: parseInt(eventDate)
            }
        })
        setDates();
    }



    const filterArr = dateList.filter((el) => {
        return el.getDate() >= startDate && el.getDate() <= endDate;
    })

    return (
        <div className='datePicker' onLoad={setDates}>
            <div className="filter">
                <p>Filter by:</p>
                <DateSelect valueType="month" value={props.filterDate.month} options={options.months} onSaveDate={monthHandler} />
                <DateSelect valueType="year" value={props.filterDate.year} options={options.years} onSaveDate={yearHandler} />
            </div>
            <article className={`${styles['date-man']}`}>
                {displayArrow.left && <span className="material-symbols-outlined" onClick={moveLeft}>
                    arrow_left
                </span>}
                {/* <Form /> */}
                {

                    filterArr.map((el, index) => {
                        if (props.filterDate.date === el.getDate()) {
                            return <DateItem onClickItem={clickHandler} key={`${el.getDate()}-${props.filterDate.month}`} active="active" month={options.months[props.filterDate.month].slice(0, 3)} date={el.getDate()} />
                        }
                        else {
                            return <DateItem onClickItem={clickHandler} key={`${el.getDate()}-${props.filterDate.month}`} month={options.months[props.filterDate.month].slice(0, 3)} date={el.getDate()} />
                        }
                    })
                }
                {displayArrow.right && <span className="material-symbols-outlined" onClick={moveRight}>
                    arrow_right
                </span>}

            </article >
        </div >
    )
}

export default DateManager;