import {ResumeType, ContactType } from '../../types/resume';

export const exampleResume: ResumeType = {
  id: 'resume-001',
  name: 'Joey Rubas',
  contacts: [
    {
      id: 'contact-001',
      contact_type: ContactType.EMAIL,
      contact: 'joeymrubas@email.com'
    },
    {
      id: 'contact-002',
      contact_type: ContactType.PHONE,
      contact: '(630) 219-9451'
    },
    {
      id: 'contact-003',
      contact_type: ContactType.LINKEDIN,
      contact: 'linkedin.com/in/joeyrubas'
    },
    {
      id: 'contact-004',
      contact_type: ContactType.GITHUB,
      contact: 'github.com/joeyrubas'
    }
  ],
  sections: [
    {
      id: 'section-002',
      title: 'Education',
      entries: [
        {
          id: 'entry-003',
          title: 'University of Virginia',
          subtitle: 'BA - Computer Science, BA - Math',
          startDate: '2022-08',
          endDate: '2025-05',
          location: 'Charlottesville, MA',
          bulletpoints: [
            'Relevant Coursework: Data Structures and Algorithms, Software Development, Web Development, Cloud Computing, Programming Lanugages'
          ]
        }
      ]
    },
    {
      id: 'section-001',
      title: 'Experience',
      entries: [
        {
          id: 'entry-001',
          title: 'Software Engineer I',
          subtitle: 'CarMax',
          startDate: '2025-07',
          endDate: 'Present',
          location: 'Richmond, VA',
          bulletpoints: [
            'Incoming Software Engineer I at CarMax in the CarMax Tech Academy program'
          ]
        },
        {
          id: 'entry-002',
          title: 'Summer Intern II',
          subtitle: 'CarMax',
          startDate: '2024-06',
          endDate: '2024-08',
          location: 'Remote',
          bulletpoints: [
            'Worked on the Payroll team to design and implement a data pipeline for payroll processing',
            'Developed and deployed Azure Data Factory pipelines and supporting infrastructure using Bicep',
            'Automated payroll request processing, improving reliability and scalability of payroll operations'
          ]
        },
        {
          id: 'entry-002',
          title: 'Summer Intern I',
          subtitle: 'CarMax',
          startDate: '2023-06',
          endDate: '2023-08',
          location: 'Richmond, VA',
          bulletpoints: [
            'Developed a .NET API to simulate the legacy system, enabling dependent teams to test integrations without relying on external creditor APIs',
            'Designed a configurable interface allowing teams to specify request/response pairs for flexible QA testing',
            'Provisioned Azure infrastructure using Bicep and deployed the service from scratch',
            'Improved testing reliability and reduced dependency on legacy BizTalk-based systems'
          ]
        },
        {
          id: 'entry-002',
          title: 'SchooLinks',
          subtitle: 'CarMax',
          startDate: '2020-06',
          endDate: '2020-08',
          location: 'Remote',
          bulletpoints: [
        'Matched different college names and abbreviations for over 900 universities using string pattern matching in Python',
        'Automated synchronization of highschool data with common application for over 100,000 students with Django routing',
        'Improved university search by including location and size as additional sorting fields on university search page'
          ]
        }
      ]
    },
    {
      id: 'section-003',
      title: 'Projects',
      entries: [
        {
          id: 'entry-005',
          title: 'Open Source Contributor at Mit-Tab',
          startDate: '2024-10',
          endDate: 'Present',
          location: 'Side Project',
          bulletpoints: [
              'Accomplished modernization of mit-tab’s tech stack, as measured by successful upgrades to Python 3.12 and Django 4.2, by auditing dependencies, resolving compatibility issues, and updating deployment scripts.',
              'Accomplished improved accessibility and usability for 1000+ annual users, as measured by positive feedback and reduced support requests, by adding disability accommodation tags, room dropdowns, and fixing long-standing bugs.',
              'Accomplished faster tournament operations, as measured by reduced database query times and deployment latency, by eliminating N+1 query issues, optimizing exports, and reconfiguring deployment to minimize cross-region delays.'
          ]
        },
      ]
    }
  ]
};
