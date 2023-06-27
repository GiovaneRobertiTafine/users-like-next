"use client";
import Image from 'next/image';
import styles from './page.module.scss';
import './globals.scss';
import NavBar from './components/nav-bar/nav-bar';
import { addFollower, addSuggestion, delFollower, followersSubject$, getUserRandom, suggestionsSubject$ } from './services/user.service';
import { useEffect, useState } from 'react';
import ThumbUser from './components/thumb-user/thumb-user';
import PersonalInfo from './components/personal-info/personal-info';
import ContactInfo from './components/contact-info/contact-info';
import SuggestionForYou from './components/suggestion-for-you/suggestion-for-you';
import BoxFollowers from './components/box-followers/box-followers';

export default function Home() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        setData(null);
        console.log(data);
        try {
            const result = await getUserRandom();
            verifyRepeteadUser(result.results[0]);
        } catch (error) { }
    };

    const handlerNextUser = () => {
        addSuggestion(data);
        getUser();
    };

    const handlerSetDataUser = (user: any) => {
        setData(user);
    };

    const handlerSetFollowUser = (user: any): void => {
        addFollower(user);
        if (user.login.uuid === data.login.uuid) getUser();
    };

    const handlerUnfollowUser = (id: string) => {
        delFollower(id);
        if (id === data.login.uuid) getUser();
    };

    const verifyRepeteadUser = (user: any): void => {
        if (
            suggestionsSubject$.getValue().findIndex((v) => v.login.uuid === user.login.uuid) !== -1 ||
            followersSubject$.getValue().findIndex((v) => v.login.uuid === user.login.uuid) !== -1
        ) {
            getUser();
        } else {
            setData(user);
        }
    };

    return (
        <main className={styles.main}>

            <NavBar>
                <BoxFollowers unfollowUser={handlerUnfollowUser} viewThumb={handlerSetDataUser} />
            </NavBar>

            <div className={styles.content}>
                <h2 className={styles.tittle}>Find new users like you</h2>
                {
                    data !== null ?
                        <>
                            <ThumbUser user={data} nextUser={handlerNextUser} followUser={handlerSetFollowUser} unfollowUser={handlerUnfollowUser} />
                            <div className={styles.contentInfo}>
                                <PersonalInfo bornAt={data.nat} age={data.dob.age} gender={data.gender} document={data.id} nat={data.nat} />
                                <ContactInfo email={data.email} phone={data.phone} cell={data.cell} postcode={data.location.postcode} />
                            </div>

                        </>
                        :
                        <>
                            <div className="card-loading">
                                <div className="image"></div>
                                <div className="content">
                                    <h2></h2>
                                    <p></p>
                                </div>
                            </div>
                            <div className={styles.contentInfo}>
                                <div className="card-loading">
                                    <div className="content">
                                        <h2></h2>
                                        <p></p>
                                    </div>
                                </div>
                                <div className="card-loading">
                                    <div className="content">
                                        <h2></h2>
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                        </>
                }
                <div className={styles.suggestionForYou}>
                    <SuggestionForYou setDataUser={handlerSetDataUser} setFollowUser={handlerSetFollowUser} />
                </div>
            </div>
            <div className={styles['box-style']}></div>
        </main>
    );
}
