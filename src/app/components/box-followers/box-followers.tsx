import { BoxFollowersComponent } from "@/app/models/box-followers-component.interface";
import Image from 'next/image';
import { useEffect, useState } from "react";
import './box-followers.scss';
import { followersSubject$, suggestionsSubject$ } from "@/app/services/user.service";

export default function BoxFollowers({ unfollowUser, viewThumb }: BoxFollowersComponent) {
    const [viewFollowers, setViewFollowers] = useState<boolean>(true);
    const [followers, setFollowers] = useState<any[]>(null);

    useEffect(() => {
        window.addEventListener('resize', (event) => {
            if (viewFollowers && (window.innerWidth <= 400) && followers) {
                document.documentElement.style.overflow = 'hidden';
                window.scrollTo(0, 0);
            }
            if (!viewFollowers) {
                document.documentElement.style.overflow = 'auto';
            }
        });
        window.addEventListener('click', (event) => {
            if (event.composedPath().indexOf(document.querySelector('.box-followers')) < 0) {
                setViewFollowers(false);
                document.documentElement.style.overflow = 'auto';
            }
        });
        if (viewFollowers && window.innerWidth <= 400) {
            document.documentElement.style.overflow = 'hidden';
            window.scrollTo(0, 0);
        };

        const followersRef = localStorage.getItem("followers-user")?.split(';');
        if (followersRef && suggestionsSubject$?.value === null) {
            followersSubject$.next([...followersRef.map((v) => JSON.parse(v))]);
        }

        if (!followersRef) {
            followersSubject$.next([]);
        }

        followersSubject$.asObservable().subscribe((v) => {
            setFollowers(v);
        });
    }, []);

    return (
        <>
            <span>{viewFollowers.toString()}</span>
            <span>
                {
                    followers?.length ?
                        <div className="box-followers">
                            <div className="open-box-followers" onClick={() => {
                                setViewFollowers(true);
                                if (window.innerWidth <= 400) document.documentElement.style.overflow = 'hidden';
                            }}>
                                <strong>following {followers.length} user{followers.length > 1 && 's'}
                                </strong>
                                <Image
                                    src="/arrow-down-followers.svg"
                                    alt="Arrow"
                                    width={18}
                                    height={18}
                                    priority

                                />
                            </div>
                            {
                                viewFollowers &&
                                <div className="box-list-followers">
                                    <h4>
                                        following {followers.length} user{followers.length > 1 && 's'}
                                        <strong style={{ color: '#000', marginLeft: '10px', cursor: 'pointer' }}
                                            onClick={() => {
                                                setViewFollowers(false);
                                                document.documentElement.style.overflow = 'auto';
                                            }}>X</strong>
                                    </h4>
                                    <div className="list-followers">
                                        {
                                            followers.map((v) => {
                                                return (
                                                    <div className="item-list-followers" key={v.login.uuid} onClick={() => {
                                                        viewThumb(v);
                                                        setViewFollowers(false);
                                                        document.documentElement.style.overflow = 'auto';
                                                    }}>
                                                        <div className="avatar" style={{ backgroundImage: "url('" + v.picture.thumbnail + "')" }}></div>
                                                        <div>
                                                            <strong>{v.name.first} {v.name.last}</strong><br />
                                                            <small>{v.location.city}, {v.location.country}</small>
                                                        </div>
                                                        <button className="btn-unfollow"
                                                            onClick={(event) => {
                                                                event.stopPropagation();
                                                                unfollowUser(v.login.uuid);
                                                                setViewFollowers(false);
                                                                document.documentElement.style.overflow = 'auto';
                                                            }}>unfollow</button>
                                                    </div>
                                                );
                                            })
                                        }

                                    </div>
                                </div>
                            }
                        </div>
                        : null
                }
            </span >
        </>
    );
}