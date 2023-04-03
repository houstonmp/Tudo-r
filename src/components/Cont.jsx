import React, { useState } from 'react';

import TodoMan from './todos/TodoMan'
import './Cont.css'
import DateManager from './datecomponent/DateManager';
import Form from './form/Form'

const TODAYS_DATE = new Date();

const INITIAL_TODO = [
    {
        id: 't1',
        text: 'Cook Dinner',
        date: TODAYS_DATE,
        progress: 'finished',
    },
    {
        id: 't2',
        text: 'Eat Dinner',
        date: TODAYS_DATE,
        progress: 'progress',
    },
    {
        id: 't3',
        text: 'Wash Dishes',
        date: TODAYS_DATE,
        progress: 'unfinished',
    }
]

const Container = () => {
    const [TodoArr, setTodoArr] = useState(INITIAL_TODO);
    const [isDisplay, setDisplay] = useState(true);

    const formHandler = (formData) => {
        setTodoArr((prevState) => {
            return [formData, ...prevState]
        })
        showDisplay(true);
    }

    const showDisplay = (isValid) => {
        setDisplay(isValid);
    }

    const deleteHandler = (event) => {
        const newArr = TodoArr.filter((el) => {
            return el.id !== event.target.parentNode.parentNode.id;
        })

        if (newArr.length === 0) {
            setTodoArr([]);
            showDisplay(false);
            console.log('false');
        }
        else {
            setTodoArr([...newArr])
            showDisplay(true);
            console.log('true');
        }
    }


    //ERROR: DATA continues to load regardless of filtered dates. Check this tomorrow


    const filterData = (date = TODAYS_DATE.getDate(), month = TODAYS_DATE.getMonth(), year = TODAYS_DATE.getFullYear()) => {
        return TodoArr.filter((el) => {
            if (el.date.getMonth() === month) {
                if (el.date.getFullYear() === year) {
                    if (el.date.getDate() === date) {
                        console.log(el);
                        return el;
                    }
                }
            }
        })
    }

    let filteredArr = filterData();


    return (
        <div className='container'>
            <section>
                <Form onSaveForm={formHandler} arrLength={TodoArr.length}></Form>
                <DateManager onLoadDate={filterData}></DateManager>
            </section>
            <section>
                <TodoMan isDisplay={isDisplay} TodoArr={filteredArr} delTodo={deleteHandler} ></TodoMan>
            </section>
        </div>


    )
}
export default Container;