import { PersonalInfoComponent } from '@/app/models/personal-info-component.interface';
import styles from './personal-info.module.scss';
import { useState } from 'react';
import Image from 'next/image';

export default function PersonalInfo({ bornAt, age, gender, document, nat }: PersonalInfoComponent) {
    const [seeMore, setSeeMore] = useState<boolean>(false);

    return (
        <div className={"card card-info" + (seeMore ? ' expandido' : '')}>
            <h4>Personal Info</h4>
            <ul>
                <li><strong>born at: </strong>{bornAt}</li>
                <li><strong>age: </strong>{age}</li>
                <li><strong>gender: </strong>{gender}</li>
                {
                    document.value &&
                    <li><strong>document: </strong>{document.name + " - " + document.value}</li>
                }
                <li><strong>nat: </strong>{nat}</li>
            </ul>
            <hr />
            <span className="see-more" onClick={() => setSeeMore(!seeMore)}>
                <Image
                    src="/arrow-down-info.svg"
                    alt="Arrow"
                    width={18}
                    height={18}
                    priority
                />

            </span>
        </div>
    );
}