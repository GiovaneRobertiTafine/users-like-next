import { BehaviorSubject, Observable, ReplaySubject, Subject, } from "rxjs";

export async function getUserRandom() {
    const res = await fetch('https://randomuser.me/api/', { cache: 'no-cache' });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export const followersSubject$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
export const suggestionsSubject$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);

export function addSuggestion(user: any): void {
    console.log(user);
    if (suggestionsSubject$.value.findIndex((v) => v.login.uuid === user.login.uuid) === -1) {
        console.log(user);
        if (!localStorage.getItem("suggestion-user")) {
            localStorage.setItem("suggestion-user", JSON.stringify(user));
        } else {
            localStorage.setItem("suggestion-user", localStorage.getItem("suggestion-user") + ';' + JSON.stringify(user));

        }
        suggestionsSubject$.next([...suggestionsSubject$.getValue(), user]);
    }
}

export function addFollower(user: any): void {
    if (followersSubject$.value.findIndex((v) => v.login.uuid === user.login.uuid) === -1) {
        console.log(user);
        if (!localStorage.getItem("followers-user")) {
            localStorage.setItem("followers-user", JSON.stringify(user));
        } else {
            localStorage.setItem("followers-user", localStorage.getItem("followers-user") + ';' + JSON.stringify(user));

        }
        followersSubject$.next([...followersSubject$.getValue(), user]);

    }
}

export function delFollower(id: string): void {
    const index = followersSubject$.value.findIndex((v) => v.login.uuid === id);
    if (index !== -1) {
        followersSubject$.value.splice(index, 1);
        console.log(followersSubject$.value);
        followersSubject$.getValue().forEach((v, index) => {
            if (!index) {
                localStorage.setItem("followers-user", JSON.stringify(v));
            } else {
                localStorage.setItem("followers-user", localStorage.getItem("followers-user") + ";" + JSON.stringify(v));
            }
        });
        if (!followersSubject$.value.length) localStorage.removeItem("followers-user");
        followersSubject$.next([...followersSubject$.getValue()]);

    }
}