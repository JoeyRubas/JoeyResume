export enum ContactType {
    EMAIL = 'email',
    PHONE = 'phone',
    LINKEDIN = 'linkedin',
    GITHUB = 'github',
    WEBSITE = 'website'
}

export type ResumeType = {
    id?: string;
    name : string;
    contacts : ResumeContact[];
    sections : ResumeSection[];
}

export type ResumeContact = {
    id?: string;
    contact_type : ContactType;
    contact : string;
}

export type ResumeSection = {
    id?: string;
    title: string;
    entries : ResumeEntry[];
}

export type ResumeEntry = {
    id?: string;
    title : string;
    subtitle ?: string;
    startDate : string;
    endDate ?: string;
    location : string;
    bulletpoints : string[]; 
}