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
        if (formData.enteredProgress !== '') {
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
    }


    return <form className={styles.form} onSubmit={submitHandler}>
        <label>Tudo:</label>
        <input type="text" name="Tudo" onChange={onChangeText} />
        <label type="date" >Finish Date:</label>
        <input type="date" onChange={onChangeDate} />
        <label>Progress:</label>
        <select name="" id="" onChange={onChangeProgress}>
            <option value="">--Please choose an option--</option>
            <option value="progress">In Progress</option>
            <option value="unfinished">Unfinished</option>
            <option value="finished">Finished</option>
        </select>
        <button type="submit">Submit</button>
    </form>
}

export default Form;