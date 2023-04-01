const DateSelect = (props) => {

    const onSelectDate = (e) => {
        console.log(e.target.value);
    }

    return (<select defaultValue={props.value} onChange={onSelectDate}>
        {props.options.map((el, index) => {
            if (props.valueType === "months")
                return <option key={index} value={index + 1} >{el}</option>;
            else
                return <option key={el} value={el} >{el}</option>;
        })}
        {/* <SelectItems></SelectItems> */}
    </select>);
}

export default DateSelect;