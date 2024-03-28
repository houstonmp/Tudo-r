import React, { useState, useEffect } from 'react';

import TodoMan from './todos/TodoMan'
import './Cont.css'
import DateManager from './datecomponent/DateManager';
import Form from './form/Form'
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        width: '80%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-20%',
        transform: 'translate(-50%, -50%)',
    },
};

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
    const [TodoArr, setTodoArr] = useState([]);
    const [isDisplay, setDisplay] = useState(true);
    const [filterDate, setDate] = useState({
        month: TODAYS_DATE.getMonth(),
        year: TODAYS_DATE.getFullYear(),
        date: TODAYS_DATE.getDate()
    });

    const dateHandler = (dateObj) => {
        setDate(dateObj);
    }

    useEffect(() => {
        let todos = JSON.parse(localStorage.getItem("saved-todos"));
        let saved = todos ? todos.map(todo => {
            todo.date = new Date(todo.date);
            return todo;
        }) : null;

        saved ? setTodoArr(saved) : setTodoArr(INITIAL_TODO);
    }, [])

    const deleteFunction = (event) => {
        let currentTodoId = event.target.parentNode.parentNode.id;
        let oldItem = {};
        const newArr = TodoArr.filter((el) => {
            if (el.id !== currentTodoId) {
                return el.id !== currentTodoId;
            }
            else {
                oldItem = {
                    id: el.id,
                    text: el.text,
                    date: el.date,
                    progress: el.progress,
                }
            }

        })

        if (newArr.length === 0) {
            setTodoArr([]);
            showDisplay(false);
        }
        else {
            setTodoArr([...newArr])
            showDisplay(true);
        }
        localStorage.setItem("saved-todos", JSON.stringify([...newArr]));
        return oldItem;
    }

    Modal.setAppElement('#root')

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [todoItem, setTodoItem] = useState({
        id: '',
        text: '',
        date: '',
        progress: ''
    });

    function openModal(event) {
        setTodoItem(deleteFunction(event));
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
    }

    function closeModal(formData) {
        if (formData.id) {
            setTodoArr((prevState) => {
                formData && localStorage.setItem("saved-todos", JSON.stringify([formData, ...prevState]));
                return [formData, ...prevState]
            })
            showDisplay(true);
        }
        setIsOpen(false);
    }



    const formHandler = (formData) => {
        setTodoArr((prevState) => {
            formData && localStorage.setItem("saved-todos", JSON.stringify([formData, ...prevState]));
            return [formData, ...prevState]
        })
        showDisplay(true);
    }

    const showDisplay = (isValid) => {
        setDisplay(isValid);
    }

    const deleteHandler = (event) => {
        deleteFunction(event);
    }

    const filterData = () => {
        return TodoArr.filter((el) => {
            if (el.date.getMonth() === filterDate.month) {
                if (el.date.getFullYear() === filterDate.year) {
                    if (el.date.getDate() === filterDate.date) {
                        return el;
                    }
                }
            }
        })
    }

    let filteredArr = filterData();

    if (filteredArr.length === 0) {
        if (isDisplay) {
            setDisplay(false);
        }
    } else if (filteredArr.length > 0) {
        if (!isDisplay) {
            setDisplay(true);
        }
    }


    return (
        <div className='container'>
            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                // onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Edit Modal"
            >
                <h1>Edit Data</h1>
                <Form onSaveForm={closeModal} arrLength={TodoArr.length} todoData={todoItem}></Form>
            </Modal>
            <section>
                <Form onSaveForm={formHandler} arrLength={TodoArr.length}></Form>
                <DateManager filterDate={filterDate} onFilterDate={dateHandler}></DateManager>
            </section>
            <section>
                <TodoMan onEdit={openModal} isDisplay={isDisplay} TodoArr={filteredArr} delTodo={deleteHandler} ></TodoMan>
            </section>
        </div>


    )
}
export default Container;