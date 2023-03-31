import Todo from './todos/Todo'
import './Container.css'
import DateManager from './datecomponent/DateManager';
import Form from './form/Form'

const Container = () => {
    return (
        <div className='container'>
            <section>
                <Form></Form>
                <DateManager></DateManager>
            </section>
            <section>
                <Todo></Todo>
            </section>
        </div>


    )
}
export default Container;