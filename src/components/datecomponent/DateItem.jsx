import styles from './DateItem.module.css'

const DateItem = (props) => {
    return (
        <div className={`${styles.date} ${props.active && styles.active}`}>
            <h4 className={`${styles['date-text']} `}>{props.month}</h4>
            <h4 className={`${styles['date-text']} `}>{props.date}</h4>
        </div >
    )
}

export default DateItem;