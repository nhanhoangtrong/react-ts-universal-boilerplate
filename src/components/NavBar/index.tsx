import * as React from 'react';
import * as styles from './style.styl';
import Link from '../../containers/Link';

export default class NavBar extends React.Component<any, any> {
    public render() {
        return (
            <nav className={styles.navbar}>
                <Link className="abc" to="/">Index</Link>
                <Link to="/todo">TodoApp</Link>
            </nav>
        );
    }
}
