import { SuggestionForYouComponent } from "@/app/models/suggestion-for-you-component.interface";
import { useEffect, useState } from "react";
import Image from 'next/image';
import { followersSubject$, suggestionsSubject$ } from "@/app/services/user.service";

export default function SuggestionForYou({ setDataUser, setFollowUser }: SuggestionForYouComponent) {
    const [sugestoes, setSusgetoes] = useState<any[]>(null);

    useEffect(() => {
        const sugestoesRef = localStorage.getItem("suggestion-user")?.split(';');
        console.log(sugestoesRef);
        console.log(suggestionsSubject$.value);
        if (sugestoesRef && suggestionsSubject$?.value === null) {
            // console.log([...sugestoesRef.map((v) => JSON.parse(v))]);
            suggestionsSubject$.next([...sugestoesRef.map((v) => JSON.parse(v))]);
            setSusgetoes([...suggestionsSubject$.getValue()]);
        }

        if (!sugestoesRef) {
            suggestionsSubject$.next([]);
        }

        suggestionsSubject$.asObservable().subscribe((v) => {
            setSusgetoes(v);
        });

        followersSubject$.asObservable().subscribe((f) => {
            const i = suggestionsSubject$.getValue().findIndex((v) => v.login.uuid === f[f.length - 1].login.uuid);
            if (i >= 0) suggestionsSubject$.value.splice(i, 1);
            localStorage.getItem("suggestion-user")?.split(';').forEach((v: any, index) => {
                if (JSON.parse(v).login.uuid !== f[f.length - 1].login.uuid) {
                    if (!index) {
                        localStorage.setItem("suggestion-user", v);
                    } else {
                        localStorage.setItem("suggestion-user", localStorage.getItem("suggestion-user") + ";" + v);
                    }
                }
            });
            if (!suggestionsSubject$.value.length) localStorage.removeItem("suggestion-user");
            setSusgetoes([...suggestionsSubject$.getValue()]);
        });

    }, []);


    return (
        <>
            <h4>Suggestion 4you</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1em', marginTop: '10px' }}>
                {
                    sugestoes ?
                        sugestoes?.map((s, index) => {
                            return (
                                index < 5 ?
                                    <div className="card card-suggestion" key={index} onClick={() => setDataUser(s)}>
                                        <div className="avatar" style={{ backgroundImage: "url('" + s.picture.thumbnail + "')" }}></div>
                                        <h4>{s.name?.first} {s.name?.last}</h4>
                                        <h6>{s.location.city}, {s.location.country}</h6>
                                        <button className="btn-follow" onClick={(event) => { event.stopPropagation(); setFollowUser(s); }}>Follow</button>
                                    </div>
                                    :
                                    null
                            );
                        }) :
                        null
                }
            </div >
        </>
    );
}