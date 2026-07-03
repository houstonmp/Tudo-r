import React, { useState } from 'react';
import styles from './Form.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

let initForm = {};

const Form = (props) => {

    
    const [inputType, setInputType] = useState('text');
    const todayFormatted = new Date().toLocaleDateString('en-US', { 
        month: 'long', day: 'numeric', year: 'numeric' 
    });
    if (props.todoData) {
        initForm = {
            enteredText: props.todoData.text,
            enteredDate: props.todoData.date.toISOString().split('T')[0],
            enteredProgress: props.todoData.progress
        }
    } else {
        initForm = {
            enteredText: '',
            enteredDate: '',
            enteredProgress: ''
        }
    }

    const [formData, setFormData] = useState(initForm);



    // if (props.todoData !== undefined) {
    //     if (props.todoData.text !== formData.enteredText) {
    //         setFormData();
    //         console.log("Set data", props.todoData)
    //     }
    // }



    const onChangeText = (event) => {
        setFormData((prev) => {
            return { ...prev, enteredText: event.target.value }
        });
    }
    const onChangeDate = (event) => {
        setFormData((prev) => {
            return { ...prev, enteredDate: event.target.value }
        });
    }
    const onChangeProgress = (event) => {
        setFormData((prev) => {
            return { ...prev, enteredProgress: event.target.value }
        });
    }

    const submitHandler = (e) => {
        e.preventDefault();
        let id = '';
        if (props.todoData) {
            id = props.todoData.id;
        } else {
            id = `t${props.arrLength + 1}`;
        }

        const inputData = {
            id: id,
            text: formData.enteredText,
            date: formData.enteredDate instanceof Date 
                ? formData.enteredDate 
                : new Date(formData.enteredDate),
            progress: formData.enteredProgress
        }

        props.onSaveForm(inputData);
        setFormData({
            enteredText: '',
            enteredDate: '',
            enteredProgress: ''
        })
    }


    return <form className={styles.form} onSubmit={submitHandler}>

        <div className={styles.inputItem}>
            <label>The Matter:</label>
            <input type="text" name="Tudo" value={formData.enteredText} placeholder="Tidy the Parlour" onChange={onChangeText} required />

        </div>
        <div className={styles.inputItem}>
            <label>To Be Resolved By:</label>
            <DatePicker
                placeholderText={todayFormatted}
                selected={formData.enteredDate ? new Date(formData.enteredDate) : null}
                onChange={(date) => onChangeDate({ target: { value: date } })}
                dateFormat="MMMM do, yyyy"
                required
                customInput={<input className={styles.dateInput} />}
                wrapperClassName={styles.datePickerWrapper}
                portalId="root"
            />
        </div>

        <div className={styles.inputItem}>
            <label>State of Affairs:</label>
            <select value={formData.enteredProgress} onChange={onChangeProgress} required>
                <option value="">--Please Select an Option--</option>
                <option value="unfinished">Unfinished</option>
                <option value="progress">In Progress</option>
                <option value="finished">Finished</option>
            </select>
        </div>
        <div className={styles.submitItem}>
            <button className={styles.button + ' kapakana-default'} type="submit">+ Add Tudo</button>
        </div>
    </form >
}

export default Form;