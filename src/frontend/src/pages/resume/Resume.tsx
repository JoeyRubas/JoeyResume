import React, { useEffect, useState } from 'react';
import api from '../../api/service';
import {ResumeType, ResumeContact, ContactType, ResumeSection, ResumeEntry } from '../../types/resume';
import { exampleResume } from './exampleResumeData';
import './styles.css';

const renderResume = (resume : ResumeType) => {
    return (
        <div className="resume">
            <div className="resume-header">
                {resume.name}
                <div className="contacts">
                    {resume.contacts.map(contact => renderContact(contact))}
                </div>
                <div className="resumeBody">
                    {resume.sections.map(section => renderSection(section))}
                </div>
            </div>
        </div>
    )
}

const contactEmojis: { [key in ContactType]: string } = {
    [ContactType.EMAIL]: '📧', [ContactType.PHONE]: '📞', [ContactType.LINKEDIN]: '💼', [ContactType.GITHUB]: '💻', [ContactType.WEBSITE]: '🌐',
};

const renderContact = (contact: ResumeContact) => {
    const emoji = contactEmojis[contact.contact_type] || '📋';
    const isLink = [ContactType.EMAIL, ContactType.LINKEDIN, ContactType.GITHUB, ContactType.WEBSITE].includes(contact.contact_type);
    const href = contact.contact_type === ContactType.EMAIL ? `mailto:${contact.contact}` : (!/^https?:\/\//i.test(contact.contact) ? `https://${contact.contact}` : contact.contact);
    return <span key={contact.id} className="contact-item">{emoji} {isLink ? <a href={href} target="_blank" rel="noopener noreferrer">{contact.contact}</a> : contact.contact}</span>;
};

const renderSection = (section : ResumeSection) => {
    return (
        <div className="resume-section">
            <h4 className="resume-section-title">{section.title}</h4>
            <hr className="resume-section-separator" />
            <div className="resume-section-entries">
                {section.entries.map(entry => renderEntry(entry))}
            </div>
        </div>
    )
}

const renderEntry = (entry : ResumeEntry) => {
    return (
        <div className="resume-entry">
            <div className="entry-header">
                <div className="entry-title">{entry.title}</div>
                <div className="entry-date">
                    {entry.startDate} - {entry.endDate ? entry.endDate : 'Present'}
                </div>
            </div>
            <div className="entry-subtitle">{entry.subtitle}</div>
            <ul className="bulletpoint">
            {entry.bulletpoints.map(bulletpoint => {return <li>{bulletpoint}</li>})}
            </ul>
        </div>
    )
}

const Resume: React.FC = () => {
  return (
    <div className="resume-container">
      {renderResume(exampleResume)}
    </div>
  );
};

export default Resume;
