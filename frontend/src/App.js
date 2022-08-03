import './App.css';
import { Link } from 'react-router-dom';

function App() {
    return (
        <div className="landing-page">
            <div className="landing-content">
                <h1 className="display-1 animate-character">University DAO</h1>
                <Link className="btn landing-button" to="/loading">Launch App</Link>
            </div>
        </div>
    );
}

export default App;
