import { aboutSidebarNavItems, aboutUsContents } from "./AboutUs";
import { governanceContents, governanceSidebarNavItems } from "./Governance";
import { studentContents, studentSidebarNavItems } from "./Students";

export const navItems = [
    {
        id: "hs83kL_29fjDn7",
        title: "Home",
        path: '/'
    },
    {
        id: "pQ92mN_84kRtY3",
        title: "About Us",
        path: '/about',
        contents: aboutUsContents,
        sidebarItems: aboutSidebarNavItems,
        submenus: [
            {
                id: "rT45sK_73mLpX9",
                title: "About Us",
                path: '/about',
                childSubmenus: [
                    { id: "vB67nM_19qWsZ4", title: "About Kolhapur", path: '/about/history/foundation' },
                    { id: "xN89pL_25rXtA8", title: "SUK Google Map", path: '/about/google-map' },
                    { id: "zP01qM_31sYuB2", title: "Contact Information", path: '/about/contact' },
                    { id: "aR23rN_47tZvC6", title: "How to reach SUK", path: '/about/how-to-reach' },
                    { id: "bS45sO_53uAwD0", title: "About University", path: '/about/university' }
                ]
            },
            {
                id: "cT67tP_69vBxE4",
                title: "Authorities And Bodies",
                path: '/about/authorities',
                childSubmenus: [
                    { id: "dU89uQ_75wCyF8", title: "Senate", path: '/about/senate' },
                    { id: "eV01vR_81xDzG2", title: "Management Council", path: '/about/management-council' },
                    { id: "fW23wS_97yEaH6", title: "Academic Council", path: '/about/academic-council' },
                    { id: "gY45xT_03zFbI0", title: "Board of Deans", path: '/about/board-deans' },
                    { id: "hZ67yU_19aGcJ4", title: "Declaration of Student Council", path: '/about/student-council' },
                    { id: "iA89zV_25bHdK8", title: "Faculties", path: '/about/faculties' },
                    { id: "jB01aW_31cIeL2", title: "BOS", path: '/about/bos' },
                    { id: "kC23bX_47dJfM6", title: "Ad-Hoc Board", path: '/about/ad-hoc-board' },
                    { id: "lD45cY_53eKgN0", title: "Board of University Department and Interdisciplinary studies", path: '/about/university-departments' },
                    { id: "mE67dZ_69fLhO4", title: "Fee Fixation Committee", path: '/about/fee-committee' }
                ]
            },
            {
                id: "nF89eA_75gMiP8",
                title: "Mission, Vision and Goals",
                path: '/about/mission'
            },
            {
                id: "oG01fB_81hNjQ2",
                title: "Hon'ble Chancellor",
                path: '/about/chancellor'
            },
            {
                id: "pH23gC_97iOkR6",
                title: "Hon'ble Vice Chancellor Desk",
                path: '/about/vice-chancellor'
            },
            {
                id: "qI01hD_03jPlS0", // Fixed duplicate ID
                title: "Hon'ble Pro Vice Chancellor",
                path: '/about/pro-vice-chancellor'
            },
            {
                id: "rJ23iE_19kQmT4", // Fixed duplicate ID
                title: "Registrar Desk",
                path: '/about/registrar-desk'
            },
            {
                id: "sK45jF_25lRnU8", // Fixed duplicate ID
                title: "Former Vice Chancellors",
                path: '/about/former-vice-chancellor'
            },
            {
                id: "tL67kG_31mSoV2", // Fixed duplicate ID
                title: "Organization Structure",
                path: '/about/structure'
            },
            {
                id: "uM89lH_47nTpW6", // Fixed duplicate ID
                title: "University Officers",
                path: '/about/officers'
            },
            {
                id: "vN01mI_53oUqX0", // Fixed duplicate ID
                title: "Office Working Hours",
                path: '/about/working-hours'
            },
            {
                id: "wO23nJ_69pVrY4", // Fixed duplicate ID
                title: "University Organogram",
                path: '/about/organogram'
            },
            {
                id: "xP45oK_75qWsZ8", // Fixed duplicate ID
                title: "Statistical Information",
                path: '/about/statistics'
            },
            {
                id: "yQ67pL_81rXtA2", // Fixed duplicate ID
                title: "Courses at a Glance",
                path: '/about/courses-glance'
            },
            {
                id: "zR89qM_97sYuB6", // Fixed duplicate ID
                title: "SUK Daily News 2025",
                path: '/about/suk-daily-news'
            },
            {
                id: "aS01rN_03tZvC0", // Fixed duplicate ID
                title: "Holidays in 2025",
                path: '/about/holiday'
            }
        ]
    },
    {
        id: "xQ89oL_75qWsZ8",
        title: "Academics",
        path: '/academics'
    },
    {
        id: "yR01pM_81rXtA2",
        title: "Governance",
        path: "/governance",
        contents: governanceContents,
        sidebarItems: governanceSidebarNavItems,
        submenus: [
            {
                id: "zS23qN_97sYuB6",
                title: "Authorities",
                path: "/governance/authorities",
                childSubmenus: [
                    { id: "aT46rO_03tZvC0", title: "From the Desk of Head", path: "/governance/authorities/head", content_id: "aT46rO_03tZvC0" },
                    { id: "bU67sP_19uAwD4", title: "Department Profile", path: "/governance/authorities/department-profile", content_id: "bU67sP_19uAwD4" },
                    { id: "cV89tQ_25vBxE8", title: "Brief History", path: "/governance/authorities/brief-history", content_id: "cV89tQ_25vBxE8" },
                    { id: "dW01uR_31wCyF2", title: "Programmes offered", path: "/governance/authorities/programmes-offered", content_id: "dW01uR_31wCyF2" },
                    { id: "eX23vS_37xDzG6", title: "Learning Outcomes", path: "/governance/authorities/learning-outcomes", content_id: "eX23vS_37xDzG6" },
                    { id: "fY45wT_53yEaH0", title: "MoUs and Linkages", path: "/governance/authorities/mous-linkages", content_id: "fY45wT_53yEaH0" },
                    { id: "gZ67xU_69zFbI4", title: "Publication", path: "/governance/authorities/publication", content_id: "gZ67xU_69zFbI4" },
                    { id: "hA89yV_75aGcJ8", title: "Stride Workshop", path: "/governance/authorities/stride-workshop", content_id: "hA89yV_75aGcJ8" },
                    { id: "iB01zW_81bHdK2", title: "Vision Mission", path: "/governance/authorities/vision-mission", content_id: "iB01zW_81bHdK2" },
                    { id: "jC23aX_97cIeL6", title: "Faculty", path: "/governance/authorities/faculty", content_id: "jC23aX_97cIeL6" },
                    { id: "kD45bY_03dJfM0", title: "Seminars Conferences Workshops", path: "/governance/authorities/seminars-conferences", content_id: "kD45bY_03dJfM0" },
                    { id: "lE67cZ_19eKgN4", title: "Infrastructure", path: "/governance/authorities/infrastructure", content_id: "lE67cZ_19eKgN4" },
                    { id: "mF89dA_25fLhO8", title: "Photo Gallery", path: "/governance/authorities/photo-gallery", content_id: "mF89dA_25fLhO8" },
                    { id: "nG01eB_31gMiP2", title: "Contact", path: "/governance/authorities/contact", content_id: "nG01eB_31gMiP2" }
                ]
            },
            {
                id: "eX23vS_47xDzG6",
                title: "Act Documents",
                path: "/governance/committees",
                childSubmenus: [
                    { id: "mA01bC_11xDeF1", title: "Maharashtra Universities Act 2016", path: "/governance/committees/maharashtra-universities-act-2016", content_id: "mA01bC_11xDeF1" },
                    { id: "nB02cD_22yEfG2", title: "General Statutes", path: "/governance/committees/general-statutes", content_id: "nB02cD_22yEfG2" },
                    { id: "oC03dE_33zFgH3", title: "Circular of Statutes", path: "/governance/committees/circular-of-statutes", content_id: "oC03dE_33zFgH3" },
                    { id: "pD04eF_44aGhI4", title: "Amendment in Mah. Public Universities Act", path: "/governance/committees/amendment-public-universities-act", content_id: "pD04eF_44aGhI4" },
                    { id: "qE05fG_55bHiJ5", title: "Ordinance", path: "/governance/committees/ordinance", content_id: "qE05fG_55bHiJ5" },
                    { id: "rF06gH_66cIjK6", title: "Gazette for VC Post", path: "/governance/committees/gazette-vc-post", content_id: "rF06gH_66cIjK6" },
                    { id: "sG07hI_77dJkL7", title: "Ordinance 15 and 16", path: "/governance/committees/ordinance-15-16", content_id: "sG07hI_77dJkL7" },
                    { id: "tH08iJ_88eKlM8", title: "Eligibility Conditions for Being Elected, Nominated or Co-opted", path: "/governance/committees/eligibility-conditions", content_id: "tH08iJ_88eKlM8" },
                    { id: "uI09jK_99fLmN9", title: "Statute Regarding Empowered Autonomous Colleges, Empowered Autonomous Cluster Institution, Grant of Autonomy to Affiliated Colleges", path: "/governance/committees/statute-empowered-autonomous-colleges", content_id: "uI09jK_99fLmN9" },
                    { id: "vJ10kL_10gMnO0", title: "Uniform Statute No 01 of 2018 Student Development 358", path: "/governance/committees/uniform-statute-01-2018-student-development", content_id: "vJ10kL_10gMnO0" },
                    { id: "wK11lM_21hNoP1", title: "Uniform Statute No 02 of 2018 Director of National Service 361", path: "/governance/committees/uniform-statute-02-2018-director-national-service", content_id: "wK11lM_21hNoP1" },
                    { id: "xL12mN_32iOpQ2", title: "Uniform Statute No 06 of 2018 Business of Meeting Students Council 396", path: "/governance/committees/uniform-statute-06-2018-students-council", content_id: "xL12mN_32iOpQ2" },
                    { id: "yM13nO_43jPqR3", title: "Uniform Statute No 07 of 2018 NNS NCC Sports and Culture Activities 394", path: "/governance/committees/uniform-statute-07-2018-nns-ncc-sports", content_id: "yM13nO_43jPqR3" },
                    { id: "zN14oP_54kQrS4", title: "Statute No.2 (Recovery)", path: "/governance/committees/statute-no2-recovery", content_id: "zN14oP_54kQrS4" },
                    { id: "aO15pQ_65lRsT5", title: "Statute No.1 (Penalties)", path: "/governance/committees/statute-no1-penalties", content_id: "aO15pQ_65lRsT5" }
                ]
            },
            {
                id: "jC23aX_97cIeL6",
                title: "Document For Citizen",
                path: "/governance/officers",
                content_id: "jC23aX_97cIeL6"
            },
            {
                id: "kD45bY_03dJfM0",
                title: "University Election 2022",
                path: "/governance/policies",
                content_id: "kD45bY_03dJfM0"
            },
            {
                id: "lE67cZ_19eKgN4",
                title: "University Election 2017",
                path: "/governance/reports",
                content_id: "lE67cZ_19eKgN4"
            },
            {
                id: "nG01eB_31gMiP2",
                title: "Notification / Guidelines",
                path: "/governance/notifications",
                content_id: "nG01eB_31gMiP2"
            },
            {
                id: "oH23fC_47hNjQ6",
                title: "Handbook of the Statutes and Regulations",
                path: "/governance/regulations",
                content_id: "oH23fC_47hNjQ6"
            },
            {
                id: "pI45gD_53iOkR0",
                title: "सेवाविषक 150 दिवसांचा सेवाकर्मी कार्यक्रम",
                path: "/governance/meetings",
                content_id: "pI45gD_53iOkR0"
            }
        ]
    }
    ,
    {
        id: "qJ67hE_69jPlS4",
        title: "Research",
        path: '/research'
    },
    {
        id: "rK89iF_75kQmT8",
        title: "Student",
        path: '/student',
        contents: studentContents,
        sidebarItems: studentSidebarNavItems,
        submenus: [
            {
                id: "sL01jG_81lRnU2",
                title: "Syllabus",
                path: '/student/syllabus',
                childSubmenus: [
                    { id: "tM23kH_97mSoV6", title: "MPhil PhD Coursework Syllabus", path: '/student/mphil-phd-syllabus' },
                    { id: "sB23cD_45fGhI6", title: "Circular", path: '/student/circular' },
                    { id: "uN45lI_03nTpW0", title: "Old Syllabus", path: '/student/old-syllabus' },
                    { id: "vO67mJ_19oUqX4", title: "Entrance Exam Syllabus", path: '/student/entrance-exam-syllabus' }
                ]
            },
            {
                id: "wP89nK_25pVrY8",
                title: "On Campus Facilities",
                path: '/student/facilities',
                childSubmenus: [
                    { id: "xQ01oL_31qWsZ2", title: "Boys Hostel", path: '/student/facilities/boys-hostel' },
                    { id: "yR23pM_47rXtA6", title: "Girls Hostel", path: '/student/facilities/girls-hostel' },
                    { id: "zS45qN_53sYuB0", title: "Sports Facilities", path: '/student/facilities/sports' },
                    { id: "aT67rO_69tZvC4", title: "BBK Knowledge Resource Center", path: '/student/facilities/bbk-resource-center' }
                ]
            },
            {
                id: "bU89sP_75uAwD8",
                title: "SWAYAM",
                path: '/student/swayam-courses'
            },
            {
                id: "cV01tQ_81vBxE2",
                title: "Scholarships / Awards / Prizes",
                path: '/student/scholarships',
                childSubmenus: [
                    { id: "dW23uR_97wCyF7", title: "Shivaji University Merit Scholarship", path: '/student/scholarships/merit' },
                    { id: "eX45vS_03xDzG0", title: "Govt. of Maharashtra", path: '/student/scholarships/maharashtra' },
                    { id: "fY67wT_19yEaH4", title: "Central Government Prize and Shishyavrutti", path: '/student/scholarships/central' },
                    { id: "gZ89xU_25zFbI8", title: "Shivaji University Prizes", path: '/student/scholarships/university-prizes' },
                    { id: "hA01yV_31aGcJ2", title: "Shivaji University Prizes and Scholarship", path: '/student/scholarships/prizes-scholarship' },
                    { id: "iB23zW_47bHdK6", title: "Research Sensitization", path: '/student/scholarships/research' }
                ]
            },
            {
                id: "jC45aX_53cIeL0",
                title: "Support Schemes",
                path: '/student/support-schemes',
                childSubmenus: [
                    { id: "pI67gD_19iOkR5", title: "Support Schemes", path: '/student/support-schemes' },
                    { id: "kD67bY_69dJfM4", title: "Financial Support", path: '/student/support-schemes/financial' },
                    { id: "lE89cZ_75eKgN8", title: "Academic Support", path: '/student/support-schemes/academic' },
                    { id: "mF01dA_81fLhO2", title: "Counseling Services", path: '/student/support-schemes/counseling' },
                    { id: "nG23eB_97gMiP6", title: "Special Needs Support", path: '/student/support-schemes/special-needs' }
                ]
            },
            {
                id: "oH45fC_03hNjQ0",
                title: "Coachings",
                path: '/student/coachings',
                childSubmenus: [
                    { id: "pI67gD_19iOkR4", title: "Remedial Coaching", path: '/student/coachings/remedial' },
                    { id: "qJ89hE_25jPlS8", title: "I.A.S. Coaching", path: '/student/coachings/ias' },
                    { id: "rK01iF_31kQmT2", title: "Competitive Exams", path: '/student/coachings/competitive' },
                    { id: "sL23jG_47lRnU6", title: "Career Coaching", path: '/student/coachings/career' }
                ]
            },
            {
                id: "tM45kH_53mSoV0",
                title: "Students' Development",
                path: '/student/development',
                childSubmenus: [
                    { id: "uN67lI_69nTpW4", title: "Department of Students' Development", path: '/student/development/department' },
                    { id: "vO89mJ_75oUqX8", title: "Ragging Prevention Act, 2009", path: '/student/development/ragging-prevention' },
                    { id: "wP01nK_81pVrY2", title: "Student Council", path: '/student/development/council' },
                    { id: "xQ23oL_97qWsZ6", title: "Student Council Election", path: '/student/development/election' }
                ]
            },
            {
                id: "yR45pM_03rXtA0",
                title: "National Service Scheme (NSS)",
                path: '/student/nss',
                childSubmenus: [
                    { id: "zS67qN_19sYuB4", title: "NSS Activities", path: '/student/nss/activities' },
                    { id: "aT89rO_25tZvC8", title: "Volunteer Registration", path: '/student/nss/volunteer' },
                    { id: "bU01sP_31uAwD2", title: "NSS Events", path: '/student/nss/events' },
                    { id: "cV23tQ_47vBxE6", title: "NSS Achievements", path: '/student/nss/achievements' }
                ]
            },
            {
                id: "dW45uR_53wCyF0",
                title: "NCC Sub-unit",
                path: '/student/ncc',
                childSubmenus: [
                    { id: "eX67vS_69xDzG4", title: "About NCC", path: '/student/about-ncc' },
                    { id: "fY89wT_75yEaH8", title: "NCC Enrollment", path: '/student/ncc/enrollment' },
                    { id: "gZ01xU_81zFbI2", title: "Training Programs", path: '/student/ncc/training' },
                    { id: "hA23yV_97aGcJ6", title: "NCC Camps", path: '/student/ncc/camps' },
                    { id: "iB45zW_03bHdK0", title: "NCC Achievements", path: '/student/ncc/achievements' }
                ]
            },
            {
                id: "jC67aX_19cIeL4",
                title: "Examinations",
                path: '/student/examinations',
                childSubmenus: [
                    { id: "kD89bY_25dJfM8", title: "Examination Time Table", path: '/student/examinations/timetable' },
                    { id: "lE01cZ_31eKgN2", title: "Examination Name Lists", path: '/student/examinations/name-lists' },
                    { id: "mF23dA_47fLhO6", title: "Examination Summary", path: '/student/examinations/summary' },
                    { id: "nG45eB_53gMiP0", title: "Hall Tickets", path: '/student/examinations/hall-tickets' },
                    { id: "oH67fC_69hNjQ4", title: "Seating Arrangements", path: '/student/examinations/seating' },
                    { id: "pI89gD_75iOkR8", title: "Student's Facilitation Centre (SFC)", path: '/student/examinations/sfc' },
                    { id: "qJ01hE_81jPlS2", title: "How to get Marksheets, Transcripts, MC/TC", path: '/student/examinations/marksheets' }
                ]
            },
            {
                id: "rK23iF_97kQmT6",
                title: "Digital Degree",
                path: '/student/digital-degree',
                childSubmenus: [
                    { id: "sL45jG_03lRnU0", title: "Apply for Digital Degree", path: '/student/digital-degree/apply' },
                    { id: "tM67kH_19mSoV4", title: "Download Digital Degree", path: '/student/digital-degree/download' },
                    { id: "uN89lI_25nTpW8", title: "Degree Verification", path: '/student/digital-degree/verification' },
                    { id: "vO01mJ_31oUqX2", title: "FAQ", path: '/student/digital-degree/faq' },
                    { id: "vO01mJ_31oUqX3", title: "Digilocker Convocation Degree Data", path: '/student/digital-degree/digilocker-convocation' }
                ]
            },
            {
                id: "wP23nK_47pVrY6",
                title: "Students Facilitation Centre (SFC)",
                path: '/student/sfc',
                childSubmenus: [
                    { id: "xQ45oL_53qWsZ0", title: "SFC Services", path: '/student/sfc/services' },
                    { id: "yR67pM_69rXtA4", title: "Contact SFC", path: '/student/sfc/contact' },
                    { id: "zS89qN_75sYuB8", title: "Working Hours", path: '/student/sfc/timings' },
                    { id: "aT01rO_81tZvC2", title: "Student Support", path: '/student/sfc/support' }
                ]
            },
            {
                id: "bU23sP_97uAwD6",
                title: "Student Grievance Redressal Portal",
                path: '/student/grievance',
                childSubmenus: [
                    { id: "cV45tQ_03vBxE0", title: "Register Grievance", path: '/student/grievance/register' },
                    { id: "dW67uR_19wCyF4", title: "Check Status", path: '/student/grievance/status' },
                    { id: "eX89vS_25xDzG8", title: "Grievance Policy", path: '/student/grievance/policy' },
                    { id: "fY01wT_31yEaH2", title: "Contact Committee", path: '/student/grievance/contact' }
                ]
            },
            {
                id: "gZ23xU_47zFbI6",
                title: "Central Placement Cell",
                path: '/student/placement',
                childSubmenus: [
                    { id: "hA45yV_53aGcJ0", title: "Placement Registration", path: '/student/placement/register' },
                    { id: "iB67zW_69bHdK4", title: "Recruiting Companies", path: '/student/placement/companies' },
                    { id: "jC89aX_75cIeL8", title: "Placement Training", path: '/student/placement/training' },
                    { id: "kD01bY_81dJfM2", title: "Placement Results", path: '/student/placement/results' }
                ]
            },
            {
                id: "lE23cZ_97eKgN6",
                title: "Alumni Connect Portal",
                path: '/student/alumni',
                childSubmenus: [
                    { id: "mF45dA_03fLhO0", title: "Alumni Association", path: '/student/alumni/association' },
                    { id: "nG67eB_19gMiP4", title: "Alumni Registration", path: '/student/alumni/registration' },
                    { id: "oH89fC_25hNjQ8", title: "Alumni Network", path: '/student/alumni/network' },
                    { id: "pI01gD_31iOkR2", title: "Alumni Events", path: '/student/alumni/events' }
                ]
            },
            {
                id: "qJ23hE_47jPlS6",
                title: "Student Login",
                path: '/student/login'
            }
        ]
    },
    {
        id: "mF45dA_03fLhO0",
        title: "IQAC",
        path: '/iqac'
    },
    {
        id: "nG67eB_19gMiP4",
        title: "Incubation Center",
        path: '/incubation-center'
    },
    {
        id: "oH89fC_25hNjQ8",
        title: "International Affairs Cell",
        path: '/international-affairs'
    },
    {
        id: "pI01gD_31iOkR2",
        title: "NEP2020@SUK",
        path: '/nep'
    },
    {
        id: "qJ23hE_47jPlS6",
        title: "Disclosure",
        path: '/disclosure'
    }
];