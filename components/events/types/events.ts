export type Category =
  | "All"
  | "Coding"
  | "Circuits and Robotics"
<<<<<<< HEAD
  | "Business" 
=======
  | "Business"  
>>>>>>> 5c9ee0c8c5d63667024076a57d6c82ee732fd771
  | "Brainstorming"
  | "Gaming"
  | "Esports"
  | "Special Attractions"
  | "Misc";

export type EventStatus = "All" | "Open" | "Closed" | "Coming Soon";

export interface Coordinator {
  name: string;
  contact: string;
}

export interface Event {
  // --- Core Metadata ---
  id: string;
  slug: string;
  title: string;
  category: Category;
  color: string;
  description: string;
  image: string;
  tags: string[];

  // --- Event Details & Rules ---
  format: string;
  teamSize: string;
  rules: string[];

  // --- Schedule & Dates ---
  lastDate: string;
  prelimsDate?: string;
  finalsDate?: string;

  // --- Prizes ---
  prizePool: string;
  winnerPrize?: string;
  runnersUpPrize?: string;
  secondRunnersUpPrize?: string;

  // --- Links & Contacts ---
  link: string;
  driveLink?: string;
  pdfLink?: string;
  coordinators: Coordinator[];

  // --- State ---
  status: EventStatus;
}
