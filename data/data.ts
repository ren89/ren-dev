import { Experience, Project } from "@/lib/types";

export const myExperiences: Experience[] = [
  {
    company: "Frntlne",
    date: "2024 - Present",
    description:
      "a marketing-tech platform dedicated to enhancing customer engagement and boosting sales confidence, I serve as a full stack developer. My role involves creating innovative features, optimizing code for scalability, resolving bugs, and occasionally providing technical support, reflecting the dynamic nature of our startup environment.",
    technologies: [
      "TypeScript",
      "React Native",
      "NextJS",
      "Native Base",
      "Hasura",
      "GraphQL",
      "AWS",
      "Expo",
    ],
    title: "Full Stack Developer",
  },
  {
    company: "Servscale",
    date: "2022 - 2024",
    description:
      "During my time at Servscale, an outsourcing company, I developed numerous projects utilizing a diverse range of technologies and stacks. This exploration allowed me to identify my true focus in development. I successfully deployed these projects for various clients and had the opportunity to lead a team on several small-scale initiatives.",
    technologies: [
      "JavaScript",
      "TypeScript",
      "Flutter",
      "Firebase",
      "SQL",
      "AWS",
      "Python",
      "NextJS",
    ],
    title: "Junior Software Engineer",
  },
];

export const myProjects: Project[] = [
  // {
  //   href: "https://brittanychiang.com/",
  //   name: "My Portfolio (inpired in Britanny Chiang Portfolio)",
  //   description:
  //     "A personal portfolio inspired by the UI of Brittany Chiang. It showcases a clean, minimalistic design and is fully responsive. This project was created to quickly highlight my skills and projects.",
  //   technologies: ["NextJS", "Tailwind", "Typescript", "Shadcn", "Vercel"],
  //   image: "/images/portfolio.png",
  // },
  {
    type: "web",
    href: "https://property-listing-app-rho.vercel.app/",
    name: "Property Listing App",
    description:
      "A simple property listing platform built as part of a technical exam. Normal users can browse, search, and filter properties, while admins manage listings through CRUD operations. Designed mobile-first, the app emphasizes scalable architecture and security through row-level policies with JWT role claims.",
    technologies: ["NextJS", "Tailwind", "Typescript", "Shadcn", "Vercel", "Supabase"],
    image: "/images/propertyListing/home.jpg",
    images: [
      { image: "/images/propertyListing/home.jpg", name: "Home" },
      { image: "/images/propertyListing/login.jpg", name: "Login" },
      { image: "/images/propertyListing/register.jpg", name: "Register" },
      { image: "/images/propertyListing/admin.jpg", name: "Admin Dashboard" },
      { image: "/images/propertyListing/create-property.jpg", name: "Create Property" },
      { image: "/images/propertyListing/update-property.jpg", name: "Update Property" },
      { image: "/images/propertyListing/delete-property.jpg", name: "Delete Property" },
      { image: "/images/propertyListing/properties-page.jpg", name: "Properties Page" },
      { image: "/images/propertyListing/properties-filter.jpg", name: "Properties Filter" },
      { image: "/images/propertyListing/property-details.jpg", name: "Property Details" },
      { image: "/images/propertyListing/property-page-web.jpg", name: "Property Page (Web)" },
      { image: "/images/propertyListing/property-loading.jpg", name: "Property Loading" },
    ],
  },
  {
    type: "web",
    href: "https://campus-entry-monitor.vercel.app/",
    name: "Campus Entry Monitor",
    description:
      "A prototype web app designed to track campus entry and room occupancy. It sends real-time WhatsApp/SMS alerts to guardians when students enter or exit the campus. Admins can view live occupancy data and basic analytics. Powered by RFID, the app enhances campus security and helps track movement for potential investigations.",
    technologies: ["NextJS", "Tailwind", "Typescript", "Shadcn", "Vercel", "Supabase", "Twilio", "RFID"],
    image: "/images/campusEntryMonitor/home.jpg",
    images: [
      { image: "/images/campusEntryMonitor/home.jpg", name: "Home" },
      { image: "/images/campusEntryMonitor/user-dashboard.jpg", name: "User Dashboard" },
      { image: "/images/campusEntryMonitor/admin-dashboard.jpg", name: "Admin Dashboard" },
      { image: "/images/campusEntryMonitor/entry-logs.jpg", name: "Entry Logs" },
      { image: "/images/campusEntryMonitor/user-management.jpg", name: "User Management" },
      { image: "/images/campusEntryMonitor/user-management-add-user.jpg", name: "Add User" },
      { image: "/images/campusEntryMonitor/user-management-edit-user.jpg", name: "Edit User" },
      { image: "/images/campusEntryMonitor/user-management-user-logs.jpg", name: "User Logs" },
      { image: "/images/campusEntryMonitor/room-management.jpg", name: "Room Management" },
      { image: "/images/campusEntryMonitor/room-management-add-room.jpg", name: "Add Room" },
      { image: "/images/campusEntryMonitor/room-management-update-delete-room.jpg", name: "Update Room" },
      { image: "/images/campusEntryMonitor/room-management-change-room.jpg", name: "Change Room" },
      { image: "/images/campusEntryMonitor/login.jpg", name: "Login" },
    ],
  },
  {
    type: "web",
    href: undefined,
    name: "Shuffled",
    description:
      "Shuffled is an e-commerce platform for pre-loved clothing, featuring live selling with a unique “mine” button. During live sales, the first user to click “mine” claims the item, which is added to their cart with a checkout timer. If they don’t complete the purchase in time, the item returns to the sale. Shuffled also includes all standard e-commerce features: stores, user profiles, search, categories, cart, payment, shipping, and a live comment section for real-time interaction.",
    technologies: ["MongoDB", "Express", "React", "NodeJS"],
    image: "/images/shuffled/homeScreen.png",
    images: [
      // { image: "/images/shuffled/homeScreen.png", name: "Home Screen" }, remove profile face
      { image: "/images/shuffled/homeScreenSeller.png", name: "Home Screen" }, // to remove
      {
        image: "/images/shuffled/homeScreenSeller.png",
        name: "Seller's Home Screen",
      },
      // { remove face
      //   image: "/images/shuffled/homeScreenUser.png",
      //   name: "User's Home Screen",
      // },
      // { image: "/images/shuffled/search.png", name: "Filter Search" }, remove profile face
      { image: "/images/shuffled/cart.png", name: "Shopping Cart" },
      // { image: "/images/shuffled/checkout.png", name: "Checkout" }, remove profile face
      // { image: "/images/shuffled/checkout1.png", name: "Payment Method" }, remove profile face
      // { image: "/images/shuffled/checkout2.png", name: "Payment" }, remove name
      { image: "/images/shuffled/inventory.png", name: "Inventory" },
      { image: "/images/shuffled/addProduct.png", name: "Add Product" },
      // { image: "/images/shuffled/orderList.png", name: "Order List" }, remove name and profilepic
      { image: "/images/shuffled/updateOrder.png", name: "Update Order" },
      // { remove face
      //   image: "/images/shuffled/liveSellUser.png",
      //   name: "Live Sell Buyer's View",
      // },
      { image: "/images/shuffled/liveSell.png", name: "Start Live Sell" },
      { image: "/images/shuffled/liveSell1.png", name: "Live Selling" },
      { image: "/images/shuffled/liveSell2.png", name: "Live Sell Items" },
    ],
  },
  {
    type: "cross-platform",
    href: "https://app.frntlne.com/",
    name: "frntlne",
    description:
      "The latest version of Frntlne, I work as a full stack developer. We transformed it into a cross-platform app using React Native and Expo, and it’s now available for download on both the App Store and Google Play Store.",
    technologies: [
      "NextJS",
      "React Native",
      "Expo",
      "Hasura",
      "GraphQL",
      "AWS",
      "Native Base",
      "TypeScript",
    ],
    image: "/images/frntlne/frntlne.png",
    images: [
      { image: "/images/frntlne/frntlne.png", name: "Login Screen" },
      { image: "/images/frntlne/homePage.jpg", name: "Home" },
      { image: "/images/frntlne/course.jpg", name: "Course" },
      { image: "/images/frntlne/course1.jpg", name: "Course" },
      { image: "/images/frntlne/courseVideo.jpg", name: "CourseVideo" },
      { image: "/images/frntlne/question.jpg", name: "Question" },
      { image: "/images/frntlne/question1.jpg", name: "Question" },
      { image: "/images/frntlne/successSection.jpg", name: "Section Passed" },
      { image: "/images/frntlne/notification.jpg", name: "Notification" },
    ],
  },
  {
    type: "web",
    href: undefined,
    name: "Buildustry",
    description:
      "Buildustry connects clients, contractors, and skilled laborers to manage construction projects. Clients post jobs, build teams, track progress, and message team members directly. Contractors update project statuses and showcase their work, while team members can rate completed projects, fostering trust and transparency.",
    technologies: [
      "NextJS",
      "Tailwind",
      "Shadcn",
      "Javascript",
      "SQLite",
      "Primsa",
    ],
    image: "/images/buildustry/dashboard.png",
    images: [
      { image: "/images/buildustry/dashboard.png", name: "Dashboard" },
      { image: "/images/buildustry/search.png", name: "Search" },
      { image: "/images/buildustry/workerHomepage.png", name: "Worker Home" },
      { image: "/images/buildustry/workerProfile.png", name: "Worker Profile" },
      { image: "/images/buildustry/login.png", name: "Login" },
      { image: "/images/buildustry/register.png", name: "Register" },
      { image: "/images/buildustry/history.png", name: "History" },
      { image: "/images/buildustry/messages.png", name: "Messages" },
      { image: "/images/buildustry/myTeam.png", name: "My Team" },
      {
        image: "/images/buildustry/requestService.png",
        name: "Request Service",
      },
    ],
  },

  {
    type: "web",
    href: "https://ren-dev-black.vercel.app/codeExercise/tictactoe",
    name: "Tic Tac Toe",
    description:
      "This is a classic Tic Tac Toe game that allows players to play in a player-vs-player mode. It features a simple and intuitive interface for a seamless gaming experience.",
    technologies: ["NextJs", "TypeScript"],
    image: "/images/tictactoe/tictactoe.png",
    images: [{ image: "/images/tictactoe/tictactoe.png", name: "Game board" }],
  },
  {
    type: "web",
    href: "https://ren-dev-black.vercel.app/codeExercise/todo",
    name: "Todo List",
    description:
      "A simple React app to add, edit, delete, and display todos. Built to practice clean code and custom hook creation with useTodos for managing todo logic.",
    technologies: ["NextJs", "TypeScript"],
    image: "/images/todo/todo.png",
    images: [{ image: "/images/todo/todo.png", name: "ToDo List" }],
  },
  {
    type: "web",
    href: undefined,
    name: "E-Vill",
    description:
      "e-Vill is a web platform designed for barangays, enabling citizens to request documents, file complaints online and track their status, reducing the need for multiple trips. The admin side allows barangay officials to manage requests, post announcements, and address citizen complaints, complete with image attachments. e-Vill fosters efficient, transparent, and connected barangay services.",
    technologies: ["HTML", "CSS", "NodeJs", "Firebase"],
    image: "/images/eVill/barangayHome.png",
    images: [
      { image: "/images/eVill/login.png", name: "Login" },
      { image: "/images/eVill/complaintPage.png", name: "Complaints" },
      {
        image: "/images/eVill/documentRequestPage.png",
        name: "Document Requests",
      },
      { image: "/images/eVill/barangayHome.png", name: "Admin Home" },
      {
        image: "/images/eVill/barangayComplaints.png",
        name: "Admin Complaint",
      },
      {
        image: "/images/eVill/barangayRequests.png",
        name: "Admin Document Request",
      },
      {
        image: "/images/eVill/barangayResidents.png",
        name: "Admin Resident List",
      },
    ],
  },
  {
    type: "mobile",
    href: undefined,
    name: "frntlne V2",
    description:
      "Frntlne is a marketing-tech platform focused on improving customer engagement and sales confidence. As a frontend developer, I contribute by implementing designs, optimizing code for scalability, fixing bugs, and occasionally providing technical support, all within the fast-paced startup environment.",
    technologies: ["Python", "Flutter", "AWS"],
    image: "/images/frntlne/frntlnev2.png",
    images: [{ image: "/images/frntlne/frntlnev2.png", name: "Home Screen" }],
  },

  {
    type: "mobile",
    href: undefined,
    name: "PicMe",
    description:
      "PicMe is a social media platform I created during my university days. It’s designed specifically for photographers, serving as a marketplace where people can hire and connect with photographers for their projects. We also extended this feature to models, allowing photographers and others to hire models as well.",
    technologies: ["Flutter", "Firebase"],
    image: "",
    images: [],
  },
  {
    type: "mobile",
    href: undefined,
    name: "Trashure",
    description:
      "Trashure is a mobile app connecting sellers of junk items with junkyards. Users can list items for sale, set pickup times, and locate nearby junkyards using the integrated map. The key feature is route optimization, allowing junkyard owners to plan the most efficient paths for collecting multiple purchases.",
    technologies: ["Flutter", "Firebase", "Google Maps API"],
    image: "",
    images: [],
  },
  // {
  //   type: "mobile",
  //   href: undefined,
  //   name: "Serby",
  //   description:
  //     "Serby is a mobile game I developed for a company, designed specifically for toddlers. It features engaging and educational mini-games centered around animals, numbers, shapes, and colors.",
  //   technologies: ["Flutter"],
  //   image: "/images/serby/menu.png",
  //   images: [
  //     { image: "/images/serby/menu.png", name: "Menu Screen" },
  //     { image: "/images/serby/matchingAnimals.png", name: "Matching Animals" },
  //     { image: "/images/serby/matchingNumber.png", name: "Matching Numbers" },
  //   ],
  // },
  // {
  //   type: "mobile",
  //   href: undefined,
  //   name: "ServPay",
  //   description:
  //     "Servpay is an e-wallet UI I worked on during my time at my previous company, built using Flutter. The interface is designed to offer a seamless and intuitive experience for users, allowing for easy navigation and efficient management of digital transactions. I contributed to the development of its features, ensuring a smooth and responsive user experience.",
  //   technologies: ["Flutter"],
  //   image: "/images/servPay/splashScreen.png",
  //   images: [
  //     { image: "/images/servPay/menu.png", name: "Menu" },
  //     { image: "/images/servPay/bank.png", name: "Bank Page" },
  //     { image: "/images/servPay/bankGrid.png", name: "Bank Grid" },
  //     { image: "/images/servPay/addBank.png", name: "Add Bank" },
  //     { image: "/images/servPay/payment1.png", name: "Payment" },
  //     {
  //       image: "/images/servPay/paymentCOnfirmation.png",
  //       name: "Payment Confirmation",
  //     },
  //     { image: "/images/servPay/transaction.png", name: "Transaction" },
  //     { image: "/images/servPay/transaction1.png", name: "Transaction" },
  //     { image: "/images/servPay/login.png", name: "Login" },
  //     { image: "/images/servPay/forgotPassword.png", name: "Forgot Password" },
  //     { image: "/images/servPay/otpVerification.png", name: "Verification" },
  //     { image: "/images/servPay/newPassword.png", name: "newPassword" },
  //   ],
  // },
];
