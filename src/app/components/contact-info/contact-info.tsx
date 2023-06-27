import { ContactInfoComponent } from '@/app/models/contact-info-component.interface';
import Image from 'next/image';
import { useState } from 'react';

export default function ContactInfo({ email, phone, cell, postcode }: ContactInfoComponent) {
    const [seeMore, setSeeMore] = useState<boolean>(false);

    return (
        <div className={"card card-info" + (seeMore ? ' expandido' : '')}>
            <h4>Contact Info</h4>
            <ul>
                <li><strong>email: </strong>{email}</li>
                <li><strong>phone: </strong>{phone}</li>
                <li><strong>cell: </strong>{cell}</li>
                <li><strong>postcode: </strong>{postcode}</li>
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