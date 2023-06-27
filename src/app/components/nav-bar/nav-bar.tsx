import { NavBarComponent } from '@/app/models/nav-bar-component.interface';
import styles from './nav-bar.module.scss';
import { useEffect } from 'react';

export default function NavBar({ children }: NavBarComponent) {
    return (
        <main className={styles.main}>
            <span>users_like.me</span>
            <span>
                {children}
            </span>
        </main>
    );
}