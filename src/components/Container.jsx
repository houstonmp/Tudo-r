import Todo from './todos/Todo'
import './Container.css'
import DateManager from './datecomponent/DateManager';

const Container = () => {
    return (
        <div className='container'>
            <section>
                <DateManager></DateManager>
            </section>
            <section>
                <Todo></Todo>
            </section>
        </div>


    )
}
export default Container;