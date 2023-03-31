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



    const formHandler = (formData) => {
        setTodoArr((prevState) => {
            return [formData, ...prevState]
        })
    }

    return (
        <div className='container'>
            <section>
                <Form onSaveForm={formHandler} arrLength={TodoArr.length}></Form>
                <DateManager></DateManager>
            </section>
            <section>
                <TodoMan TodoArr={TodoArr}></TodoMan>
            </section>
        </div>


    )
}
export default Container;