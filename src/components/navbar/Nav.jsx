import logo from '../../assets/Tudor_rose.png'
import styles from './Nav.module.css';

const Navbar = () => {

    return (<nav>
        <img src={logo}></img>
        <h1 className="junge-default">Tudo[r]</h1>
        <h2>Task management fit for the royal court</h2>
    </nav>
    );
}

export default Navbar;