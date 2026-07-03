import './App.css';
import Navbar from './components/navbar/Nav';
import Footer from './components/footer/Footer';
import Container from './components/Cont';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // set once at the app level

function App() {

  return (<>
    <Navbar />
    <Container />
    <Footer />
  </>
  )
}

export default App
