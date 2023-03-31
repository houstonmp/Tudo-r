import styles from './DateItem.module.css'

const DateItem = () => {
    return (
        <div className={`${styles.date} ${styles.active}`}>
            <h4 className={`${styles['date-text']}`}>Jan</h4>
            <h4 className={`${styles['date-text']}`}>26</h4>
        </div >
    )
}

export default DateItem;