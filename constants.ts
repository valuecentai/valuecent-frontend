import { Course } from './types';

export const COURSES: Course[] = [
    {
        id: "ai-course-by-vishnu-singh-rajput",
        title: "AI course- by Vishnu Singh Rajput",
        description: "A comprehensive introduction to Artificial Intelligence concepts, tools, and practical applications.",
        videoEmbedUrl: "https://www.youtube.com/embed/ad79nYk2keg",
        notebookUrl: "https://notebooklm.google.com/notebook/f0ce5b70-bdb6-4879-8313-0f64f2498130",
        isFeatured: true,
        chapters: [
            { title: 'Chapter 1: Introduction', videoEmbedUrl: 'https://www.youtube.com/embed/S2rhqC8I3E8' },
            { title: 'Chapter 2: Fundamentals of AI', videoEmbedUrl: 'https://www.youtube.com/embed/kWmX3pd1f10' },
            { title: 'Chapter 3: How to become Beginner to Advanced in AI', videoEmbedUrl: 'https://www.youtube.com/embed/_5-I0G_P_3U' },
            { title: 'Chapter 4: How to use AI in professional work', videoEmbedUrl: 'https://www.youtube.com/embed/86saC8t2m3o' }
        ]
    },
    {
        id: "what-valuecent-does",
        title: "What Valuecent does",
        description: "An overview of Valuecent's mission, services, and impact on the professional world. Understand our core values and what drives us.",
        videoEmbedUrl: "https://www.youtube.com/embed/b-a1jXgIeGM",
        notebookUrl: "https://notebooklm.google.com/notebook/f0ce5b70-bdb6-4879-8313-0f64f2498130",
        chapters: [
            { title: 'Our Mission and Vision', videoEmbedUrl: 'https://www.youtube.com/embed/y2C3jP6p48M' },
            { title: 'Core Services Explained', videoEmbedUrl: 'https://www.youtube.com/embed/3-I5c55j4-s' },
            { title: 'Our Impact on the Industry', videoEmbedUrl: 'https://www.youtube.com/embed/I-gZNYp6u0U' },
        ],
        resources: [
            { title: 'Visit the Valuecent Website', url: 'https://www.valuecent.in/', type: 'website' },
            { title: 'Download Our Company Profile (PDF)', url: '#', type: 'pdf' }
        ]
    },
    {
        id: "worldwide-presence-of-valuecent",
        title: "Worldwide presence of Valuecent",
        description: "Explore Valuecent's global footprint, our international offices, and how we serve clients across different continents.",
        videoEmbedUrl: "https://www.youtube.com/embed/n4M4-qI-2ik",
        notebookUrl: "https://notebooklm.google.com/notebook/f0ce5b70-bdb6-4879-8313-0f64f2498130",
        chapters: [
            { title: 'Our Global Network', videoEmbedUrl: 'https://www.youtube.com/embed/J6P62D12kEc' },
            { title: 'Serving the Americas', videoEmbedUrl: 'https://www.youtube.com/embed/g2Zk-1Zwv1Y' },
            { title: 'Operations in Europe, Middle East, and Africa', videoEmbedUrl: 'https://www.youtube.com/embed/3n2c0b5fC5E' },
            { title: 'Expanding in Asia-Pacific', videoEmbedUrl: 'https://www.youtube.com/embed/Pjo-Jm9-y30' },
        ]
    },
    {
        id: "compliance-taxation-management-ctm",
        title: "Compliance & Taxation Management (CTM)",
        description: "A deep dive into corporate tax, from global expansion and transfer pricing to IFRS, GAAP, and M&A advisory.",
        videoEmbedUrl: "https://www.youtube.com/embed/5pQY_2J5G_4",
        notebookUrl: "https://notebooklm.google.com/notebook/24194d68-8268-4eba-9f1e-92c011e82984",
        chapters: [
            { title: '1 Introduction and induction', videoEmbedUrl: 'https://www.youtube.com/embed/ee0FCotA-YE' },
            { title: '2 What CTM Does', videoEmbedUrl: 'https://www.youtube.com/embed/y7P6e4m0QjY' },
            { title: '3 Cross border taxation', videoEmbedUrl: 'https://www.youtube.com/embed/J-yN-4_a-Y0' },
            { title: '4 Global Expansion Strategies', videoEmbedUrl: 'https://www.youtube.com/embed/j8_pLw2yD-o' },
            { title: '5 Global Tax Planning', videoEmbedUrl: 'https://www.youtube.com/embed/i0-T5uL1PzQ' },
            { title: '6 Transfer pricing', videoEmbedUrl: 'https://www.youtube.com/embed/P24gC-P5-fI' },
            { title: '7 IFRS & GAAP', videoEmbedUrl: 'https://www.youtube.com/embed/g6qG8N_s20s' },
            { title: '8 Risk Management and Compliance', videoEmbedUrl: 'https://www.youtube.com/embed/G05lC366XG4' },
            { title: '9 Advisory services', videoEmbedUrl: 'https://www.youtube.com/embed/n4pccL6p9WU' },
            { title: '10 Mergers and acquisitions', videoEmbedUrl: 'https://www.youtube.com/embed/Lxg_8I43-7M' },
        ]
    },
    {
        id: "accounting",
        title: "Accounting",
        description: "A detailed look into Dutch accounting practices, from GAAP and VAT to payroll, compliance, and industry-standard software.",
        videoEmbedUrl: "https://www.youtube.com/embed/73i7ILB78XM",
        notebookUrl: "https://notebooklm.google.com/notebook/029f9dc9-d37a-41b7-acb3-631d1b4c59ff",
        chapters: [
            { title: '1 Introduction', videoEmbedUrl: 'https://www.youtube.com/embed/2_8i52-y6wI' },
            { title: '2 Valuecent approach in EU (Dutch) Accounting', videoEmbedUrl: 'https://www.youtube.com/embed/rWbC-nIQ0lI' },
            { title: '3 What is Dutch GAAP', videoEmbedUrl: 'https://www.youtube.com/embed/qj_1SxFANv0' },
            { title: '4 What is Dutch VAT', videoEmbedUrl: 'https://www.youtube.com/embed/E-T_5-3tBmw' },
            { title: '5 Dutch Payroll', videoEmbedUrl: 'https://www.youtube.com/embed/P0zZu-yDhX0' },
            { title: '6 General complinaces overview + Deepdive', videoEmbedUrl: 'https://www.youtube.com/embed/7-F2bOa-Tts' },
            { title: '7 CIT', videoEmbedUrl: 'https://www.youtube.com/embed/gM60mBEgP5o' },
            { title: '8 Benchmarking', videoEmbedUrl: 'https://www.youtube.com/embed/qg_S4AbV43E' },
            { title: '9 Publication', videoEmbedUrl: 'https://www.youtube.com/embed/462-s-3AvMw' },
            { title: '10 Cbs-ICL, BS & PL Report', videoEmbedUrl: 'https://www.youtube.com/embed/1RRBOD_j-bA' },
            { title: '11 Conversion of clients', videoEmbedUrl: 'https://www.youtube.com/embed/F4qgC7g1-z0' },
            { title: '12 How to be an expert in Dutch Accounting', videoEmbedUrl: 'https://www.youtube.com/embed/G2e0iC2a_oI' },
            { title: '13 Softwares training -Twinfield, Excel, SAP, Exact, Netsuite, ZOHO, Xero, Quickbooks', videoEmbedUrl: 'https://www.youtube.com/embed/9w2BfF-A-A0' },
        ]
    },
    {
        id: "auditing",
        title: "Auditing",
        description: "Learn the principles of auditing and assurance services, including financial statement audits, internal controls, and professional ethics.",
        videoEmbedUrl: "https://www.youtube.com/embed/k-a-R9hLhF4",
        notebookUrl: "https://notebooklm.google.com/notebook/e1899d9f-bd35-4982-9ada-4ce33d0701a6",
        chapters: [
            { title: 'Chapter 1: Introduction to Auditing and Assurance', videoEmbedUrl: 'https://www.youtube.com/embed/r8V283P8L8o' },
            { title: 'Chapter 2: The Audit Process', videoEmbedUrl: 'https://www.youtube.com/embed/TWDYP5wP76g' },
            { title: 'Chapter 3: Internal Control Systems', videoEmbedUrl: 'https://www.youtube.com/embed/v2T-4PzX2aM' },
            { title: 'Chapter 4: Audit Evidence and Procedures', videoEmbedUrl: 'https://www.youtube.com/embed/OEVkLU5fTvc' },
            { title: 'Chapter 5: Auditing Financial Statements', videoEmbedUrl: 'https://www.youtube.com/embed/d38C3H19K54' },
            { title: 'Chapter 6: Professional Ethics and Legal Liability', videoEmbedUrl: 'https://www.youtube.com/embed/0G35_5-s_wA' },
            { title: 'Chapter 7: Audit Reporting', videoEmbedUrl: 'https://www.youtube.com/embed/G_8zY6-YhM4' },
        ]
    },
    {
        id: "corporate-finance",
        title: "Corporate Finance",
        description: "Understand the key concepts of corporate finance, including capital budgeting, valuation, and risk management.",
        videoEmbedUrl: "https://www.youtube.com/embed/P28jQdOaM88",
        notebookUrl: "https://notebooklm.google.com/notebook/825e22ec-b9e6-4653-ac60-d374793861d5",
        chapters: [
            { title: 'Chapter 1: Introduction to Corporate Finance', videoEmbedUrl: 'https://www.youtube.com/embed/2_8i52-y6wI' },
            { title: 'Chapter 2: Financial Statement Analysis', videoEmbedUrl: 'https://www.youtube.com/embed/8nBFCwC0s-Y' },
            { title: 'Chapter 3: Capital Budgeting & Investment Decisions', videoEmbedUrl: 'https://www.youtube.com/embed/wXGI94-3jts' },
            { title: 'Chapter 4: Business Valuation Models', videoEmbedUrl: 'https://www.youtube.com/embed/ZozuAyqfFkk' },
            { title: 'Chapter 5: Risk and Return', videoEmbedUrl: 'https://www.youtube.com/embed/J7-3iIg2g8U' },
            { title: 'Chapter 6: Capital Structure', videoEmbedUrl: 'https://www.youtube.com/embed/vLfyI47wO04' },
            { title: 'Chapter 7: Mergers & Acquisitions', videoEmbedUrl: 'https://www.youtube.com/embed/Lxg_8I43-7M' },
            { title: 'Chapter 8: Corporate Governance', videoEmbedUrl: 'https://www.youtube.com/embed/0el7-x5-aL8' },
        ]
    },
    {
        id: "human-resources-hr",
        title: "Human Resources (HR)",
        description: "Gain insights into modern human resources management, from talent acquisition to employee relations and strategic HR planning.",
        videoEmbedUrl: "https://www.youtube.com/embed/IyLSiB2nQYc",
        notebookUrl: "https://notebooklm.google.com/notebook/7ee1b607-1345-4a59-8a00-6cffcf538c4b",
        chapters: [
            { title: 'Chapter 1: Introduction to Human Resource Management', videoEmbedUrl: 'https://www.youtube.com/embed/x4e9D-d2kik' },
            { title: 'Chapter 2: Talent Acquisition and Recruitment', videoEmbedUrl: 'https://www.youtube.com/embed/Z05MOfA_38E' },
            { title: 'Chapter 3: Onboarding and Training', videoEmbedUrl: 'https://www.youtube.com/embed/bL7Xh7s7j-I' },
            { title: 'Chapter 4: Performance Management', videoEmbedUrl: 'https://www.youtube.com/embed/JjvaWdfn1bQ' },
            { title: 'Chapter 5: Compensation and Benefits', videoEmbedUrl: 'https://www.youtube.com/embed/N-Yj01F7yA8' },
            { title: 'Chapter 6: Employee Relations and Engagement', videoEmbedUrl: 'https://www.youtube.com/embed/l8w5GcfI22c' },
            { title: 'Chapter 7: HR Law and Compliance', videoEmbedUrl: 'https://www.youtube.com/embed/7-F2bOa-Tts' },
            { title: 'Chapter 8: Strategic HR Planning', videoEmbedUrl: 'https://www.youtube.com/embed/9yqjGmL-G10' },
        ]
    },
    {
        id: "marketing",
        title: "Marketing",
        description: "Discover the fundamentals of marketing strategy, digital marketing, branding, and consumer behavior.",
        videoEmbedUrl: "https://www.youtube.com/embed/bA4w9kU5g-E",
        notebookUrl: "https://notebooklm.google.com/notebook/fdee3765-6c89-4180-b757-eb169919f04d",
        chapters: [
            { title: 'Chapter 1: Introduction to Marketing', videoEmbedUrl: 'https://www.youtube.com/embed/n66PjYyP-Ok' },
            { title: 'Chapter 2: Understanding Consumer Behavior', videoEmbedUrl: 'https://www.youtube.com/embed/gQy7rD_B6k4' },
            { title: 'Chapter 3: Market Research & Analysis', videoEmbedUrl: 'https://www.youtube.com/embed/z589-3oGN40' },
            { title: 'Chapter 4: The Marketing Mix (4Ps)', videoEmbedUrl: 'https://www.youtube.com/embed/C-SoL-f0vo4' },
            { title: 'Chapter 5: Digital Marketing Fundamentals', videoEmbedUrl: 'https://www.youtube.com/embed/Y0iI_3bU_Y4' },
            { title: 'Chapter 6: Branding and Brand Management', videoEmbedUrl: 'https://www.youtube.com/embed/GK_N-RogP6o' },
            { title: 'Chapter 7: Content Marketing Strategy', videoEmbedUrl: 'https://www.youtube.com/embed/0q-a-GdV2bM' },
            { title: 'Chapter 8: Social Media Marketing', videoEmbedUrl: 'https://www.youtube.com/embed/s3-dYy_b3tE' },
            { title: 'Chapter 9: SEO and SEM', videoEmbedUrl: 'https://www.youtube.com/embed/h_WE_8Z-Yjk' },
            { title: 'Chapter 10: Marketing Analytics', videoEmbedUrl: 'https://www.youtube.com/embed/v9D-zRsae1Y' }
        ]
    },
    {
        id: "information-technology-it",
        title: "Information Technology (IT)",
        description: "Explore the core concepts of IT, including hardware, software, networking, and cybersecurity.",
        videoEmbedUrl: "https://www.youtube.com/embed/421eF8_Q4cU",
        notebookUrl: "https://notebooklm.google.com/notebook/01149890-dc8b-401a-9c2a-a47e26cb4133",
        chapters: [
            { title: 'Chapter 1: Introduction to Information Technology', videoEmbedUrl: 'https://www.youtube.com/embed/hxFy64s8pWY' },
            { title: 'Chapter 2: Computer Hardware and Software', videoEmbedUrl: 'https://www.youtube.com/embed/mCq8-x_Ptoo' },
            { title: 'Chapter 3: Networking Fundamentals', videoEmbedUrl: 'https://www.youtube.com/embed/3QhU9jd03a0' },
            { title: 'Chapter 4: Introduction to Cybersecurity', videoEmbedUrl: 'https://www.youtube.com/embed/inWWhr5tnEA' },
            { title: 'Chapter 5: Database Management Systems', videoEmbedUrl: 'https://www.youtube.com/embed/4cWkVbC2bNE' },
            { title: 'Chapter 6: Cloud Computing', videoEmbedUrl: 'https://www.youtube.com/embed/M988_8sOSWo' },
            { title: 'Chapter 7: IT Project Management', videoEmbedUrl: 'https://www.youtube.com/embed/7E-m-o-vT-0' }
        ]
    },
    {
        id: "business-development",
        title: "Business Development",
        description: "Master the strategies and skills needed to grow a business, from lead generation to closing deals and building long-term partnerships.",
        videoEmbedUrl: "https://www.youtube.com/embed/g-g-z5-C1vQ",
        notebookUrl: "https://notebooklm.google.com/notebook/25a5eed7-46d0-4547-8434-3c5b8b991aab",
        chapters: [
            { title: 'Chapter 1: Fundamentals of Business Development', videoEmbedUrl: 'https://www.youtube.com/embed/5b-j9s3a2eQ' },
            { title: 'Chapter 2: Identifying and Qualifying Leads', videoEmbedUrl: 'https://www.youtube.com/embed/x-K4i-j9F8s' },
            { title: 'Chapter 3: The Sales Funnel and Pipeline Management', videoEmbedUrl: 'https://www.youtube.com/embed/L72g74kcrgU' },
            { title: 'Chapter 4: Pitching and Presentation Skills', videoEmbedUrl: 'https://www.youtube.com/embed/HYnKxG0gI4w' },
            { title: 'Chapter 5: Negotiation and Closing Deals', videoEmbedUrl: 'https://www.youtube.com/embed/pCgCg1-j47M' },
            { title: 'Chapter 6: Building Strategic Partnerships', videoEmbedUrl: 'https://www.youtube.com/embed/YUY0jVp5A1A' },
            { title: 'Chapter 7: Account Management and Customer Retention', videoEmbedUrl: 'https://www.youtube.com/embed/rPq5-e4s7pU' }
        ]
    }
];