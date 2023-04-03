import React, { useState } from 'react';

const DateSelect = (props) => {

    return (<select defaultValue={props.value} onChange={props.onSaveDate}>
        {props.options.map((el, index) => {
            if (props.valueType === "month")
                return <option key={index} value={index} >{el}</option>;
            else
                return <option key={el} value={el} >{el}</option>;
        })}
    </select>);
}

export default DateSelect;