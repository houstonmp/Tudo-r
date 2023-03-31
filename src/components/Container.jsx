import React, { useState } from 'react';

import TodoMan from './todos/TodoMan'
import './Container.css'
import DateManager from './datecomponent/DateManager';
import Form from './form/Form'

const INITIAL_TODO = [
    {
        id: 't1',
        text: 'Cook Dinner',
        progress: 'finished',
    },
    {
        id: 't2',
        text: 'Eat Dinner',
        progress: 'progress',
    },
    {
        id: 't3',
        text: 'Wash Dishes',
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

    return (
        <div className='container'>
            <section>
                <Form onSaveForm={formHandler} arrLength={TodoArr.length}></Form>
                <DateManager ></DateManager>
            </section>
            <section>
                <TodoMan isDisplay={isDisplay} TodoArr={TodoArr} delTodo={deleteHandler}></TodoMan>
            </section>
        </div>


    )
}
export default Container;