import DateItem from './DateItem';
// import Form from './Form'

import styles from './DateManager.module.css';


const DateManager = () => {
    return (
        <article className={`${styles['date-man']}`}>
            {/* <Form /> */}
            <DateItem />
            <DateItem />
            <DateItem />
            <DateItem />
            <DateItem />
        </article >
    )
}

export default DateManager;