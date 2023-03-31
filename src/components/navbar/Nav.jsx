import logo from '../../assets/Tudor_rose.png'
import './Nav.css';

const Navbar = () => {

    return (<nav>
        <span>
            <img src={logo}></img>
        </span>
        <h1>Tudo[r]</h1>
    </nav>
    );
}

export default Navbar;