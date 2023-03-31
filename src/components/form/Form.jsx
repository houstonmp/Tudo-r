import React, { useState } from 'react';
import styles from './Form.module.css';

const Form = (props) => {
    const [formData, setFormData] = useState({
        enteredText: '',
        enteredDate: '',
        enteredProgress: ''
    });


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
        const id = `e${props.arrLength + 1}`;

        const inputData = {
            id: id,
            text: formData.enteredText,
            date: formData.enteredDate,
            progress: formData.enteredProgress
        }
        console.log(inputData);

        props.onSaveForm(inputData);
        setFormData({
            enteredText: '',
            enteredDate: '',
            enteredProgress: ''
        }
        )
    }


    return <form className={styles.form} onSubmit={submitHandler}>
        <label>Tudo:</label>
        <input type="text" name="Tudo" value={formData.enteredText} onChange={onChangeText} required />
        <label type="date" >Finish Date:</label>
        <input type="date" value={formData.enteredDate} onChange={onChangeDate} required />
        <label>Progress:</label>
        <select value={formData.enteredProgress} onChange={onChangeProgress} required>
            <option value="">--Please Select an Option--</option>
            <option value="unfinished">Unfinished</option>
            <option value="progress">In Progress</option>
            <option value="finished">Finished</option>
        </select>
        <button className="button" type="submit">Add Tudo</button>
    </form >
}

export default Form;