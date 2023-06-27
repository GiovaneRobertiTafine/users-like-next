export interface PersonalInfoComponent {
    bornAt: string;
    age: number;
    gender: string;
    document: Document;
    nat: string;
}

interface Document {
    name?: string;
    value?: string;
} 