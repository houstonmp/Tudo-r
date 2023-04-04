import React, { useState } from 'react';

import TodoMan from './todos/TodoMan'
import './Cont.css'
import DateManager from './datecomponent/DateManager';
import Form from './form/Form'
import Modal from 'react-modal';
// import ModalForm from './form/ModalForm';

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
    const [TodoArr, setTodoArr] = useState(INITIAL_TODO);
    const [isDisplay, setDisplay] = useState(true);
    const [filterDate, setDate] = useState({
        month: TODAYS_DATE.getMonth(),
        year: TODAYS_DATE.getFullYear(),
        date: TODAYS_DATE.getDate()
    });

    // const fetchDate = (date) => {

    // }

    const dateHandler = (dateObj) => {
        setDate(dateObj);
        console.log('Set date Object', filterDate);
    }

    Modal.setAppElement('#root')

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }



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
            console.log(isDisplay);
        }
    }


    return (
        <div className='container'>
            <button onClick={openModal}>Open Modal</button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Edit Modal"
            >
                <h1>Edit Data</h1>
                <Form></Form>
            </Modal>
            {/* <ModalForm></ModalForm> */}
            <section>
                <Form onSaveForm={formHandler} arrLength={TodoArr.length}></Form>
                <DateManager filterDate={filterDate} onFilterDate={dateHandler}></DateManager>
            </section>
            <section>
                <TodoMan isDisplay={isDisplay} TodoArr={filteredArr} delTodo={deleteHandler} ></TodoMan>
            </section>
        </div>


    )
}
export default Container;