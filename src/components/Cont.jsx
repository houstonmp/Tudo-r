import React, { useState, useEffect } from 'react';

import TodoMan from './todos/TodoMan'
import './Cont.css'
import DateManager from './datecomponent/DateManager';
import Form from './form/Form'

// ModalForm.jsx
import Modal from 'react-modal';

const ModalForm = ({ isOpen, onClose, todoItem, arrLength }) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
            <h2>Edit Data</h2>
            <Form onSaveForm={onClose} arrLength={arrLength} todoData={todoItem} />
        </Modal>
    )
}

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
        text: 'Retire at a Reasonable Hour',
        date: TODAYS_DATE,
        progress: 'finished',
    },
    {
        id: 't2',
        text: 'Review the Guild\'s Proposal',
        date: TODAYS_DATE,
        progress: 'progress',
    },
    {
        id: 't3',
        text: 'Settle Accounts with the Merchant',
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
            <ModalForm 
                isOpen={modalIsOpen} 
                onClose={closeModal} 
                todoItem={todoItem} 
                arrLength={TodoArr.length}
            />
            <Form onSaveForm={formHandler} arrLength={TodoArr.length}></Form>
            <DateManager filterDate={filterDate} onFilterDate={dateHandler}></DateManager>
            <TodoMan onEdit={openModal} isDisplay={isDisplay} TodoArr={filteredArr} delTodo={deleteHandler} ></TodoMan>
        </div>


    )
}
export default Container;