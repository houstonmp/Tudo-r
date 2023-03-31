import DateItem from './DateItem';
import styles from './DateManager.module.css';

const DateManager = () => {
    return (
        <article className={`${styles['date-man']}`}>
            <DateItem />
            <DateItem />
            <DateItem />
            <DateItem />
            <DateItem />
        </article >
    )
}

export default DateManager;