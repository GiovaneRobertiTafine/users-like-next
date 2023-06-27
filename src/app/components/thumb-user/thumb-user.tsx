import ThumbUserComponent from '@/app/models/thumb-user-component.interface';
import Image from 'next/image';
import styles from './thumb-user.module.scss';
import '../../globals.scss';
import { useEffect, useState } from 'react';


export default function ThumbUser({ user, nextUser, followUser, unfollowUser }: ThumbUserComponent) {
    const [unfollow, setUnfollow] = useState<boolean>(false);
    useEffect(() => {
        setUnfollow(false);
        localStorage.getItem("followers-user")?.split(';').forEach((v) => {
            if (JSON.parse(v).login.uuid === user.login.uuid) setUnfollow(true);
        });
    }, [user]);
    return (
        <div className="card">
            <div className={styles.thumbImage} style={{ backgroundImage: "url('" + user.picture.large + "')" }}></div>
            <div className={styles.avatarImage} style={{ backgroundImage: "url('" + user.picture.large + "')" }}></div>
            <div className={styles.boxBtnFollow}>
                {
                    unfollow ?
                        <button id={styles['btn-unfollow']} onClick={() => unfollowUser(user.login.uuid)}>Unfollow</button>
                        : <button id={styles['btn-follow']} onClick={() => followUser(user)}>Follow</button>

                }
                <button id={styles['btn-next']} onClick={() => nextUser()}>try the next one</button>
            </div>
            <h2 className={styles.name}>{user.name.first} {user.name.last}</h2>
            <h4 className={styles.location}>{user.location.city}, {user.location.country}</h4>
        </div >
    );
}