import {ResumeType, ContactType } from '../../types/resume';

export const resume: ResumeType = {
  id: 'resume-001',
  name: 'Joey Rubas',
  contacts: [
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
            'Incoming Software Engineer I on the Assessment Platform team.'
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
            'Improved testing reliability and reduced dependency on legacy BizTalk-based systems in QA'
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
          'Improved search efficiency 10% by matching different college names and abbreviations for over 900 universities using string pattern matching in Python',
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
          title: 'Lead Open Source Contributor to APDA Standings (black-rod)',
          startDate: '2024-10',
          endDate: 'Present',
          location: 'Side Project',
          bulletpoints: [
              'Accomplished improved accessibility and usability for 1000+ annual users, as measured by positive feedback and reduced support requests, by adding disability accommodation tags, room dropdowns, and fixing long-standing bugs.',
              'Delivered faster tournament operations, as measured by reduced page loads and check-in times, by eliminating N+1 query issues, centralizing check-in processes, and reconfiguring deployment to minimize cross-region delays.',
              'Modernized mit-tab’s tech stack, as measured by successful upgrades to Python, Django, and other dependencies, by auditing dependencies, resolving compatibility issues, and updating deployment scripts.',
              'Improved tournament administrator experience by patching over 10 critical long standing bugs, reducing >1 hour delays by 80% and increasing tournament admin satisfaction by 25%'
          ]
        },
        {
          id: 'entry-005',
          title: 'Open Source Contributor at Mit-Tab',
          startDate: '2024-10',
          endDate: 'Present',
          location: 'Side Project',
          bulletpoints: [
              'Implemented modern CI/CD and code validation pipelines using GitHub Actions, reducing manual deployment time by 75% and downtime from human error by 90%',
              'Modernized tech stack by upgrading Python, Django, Node reducing security vulnerabilities by 90% and improving performance by 15%',
              'Patched long-standing bugs in result accuracy and administrator access reducing admin support requests by 50%',
          ]
        },
      ]
    }
  ],
  quickFacts: [
  "Software Engineer I at CarMax (.NET + Azure)",
  "UVA CS & Math double major (recent grad)",
  "Lead dev for APDA (Debate Software) — ~2,000+ users/yr",
  "Shipped production services with Python/Django & TypeScript/React",
  "Deployed to Azure, AWS and Google Cloud Run; Docker-first workflows",
  "Strengths: Python/Django, DotNET/C#, CI/CD",
  "Learning Targets: AWS, React, TypeScript",
  "Focus areas: reliability, scalability, and developer experience",
]

};
