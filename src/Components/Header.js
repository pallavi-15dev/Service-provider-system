import classes from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
    const logoutHandler = (event) => {
        event.preventDefault();
    };

    return (


        <header className={classes.header}>
            <h2>Vendor management System</h2>
            <nav>
                <ul>
                    <li>
                        
                            <button onClick={logoutHandler}><Link to="/">Logout</Link></button>
                      
                    </li>
                    <li>
                        
                            <button><Link to={'/dashboard'}>Dashboard</Link></button>
                        
                    </li>
                </ul>
            </nav>
        </header>

    );
};

export default Header;
