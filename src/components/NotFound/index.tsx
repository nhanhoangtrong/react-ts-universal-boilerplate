import * as React from 'react';
import Status, { StatusProps } from '../../routes/Status';
import * as styles from './style.styl';

export default () => (
    <Status code={404}>
        <div className={styles.notFound}>
            <h1 className={styles.code}>404</h1>
            <h2 className={styles.status}>Not Found</h2>
            <p className={styles.info}>Page not found! Please go back!</p>
        </div>
    </Status>
);
