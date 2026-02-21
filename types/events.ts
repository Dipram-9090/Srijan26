import { EventListing } from "@prisma/client";
import type { User } from "./user";

type Event = {
    slug: string;
    id: string;
    name: string;
    minMembers: number;
    maxMembers: number;
};

type Team = {
    id: string;
    name: string;
    leader: string;
    members: User[];
    pendingMembers: User[];
    eventSlug: string;
    joiningCode: string;
};

enum RegistrationStatus {
    REGISTERED = "REGISTERED",
    PENDING = "PENDING",
    NOT_REGISTERED = "NOT_REGISTERED",
}

type EventCategory =
  | "CODING"
  | "CIRCUITS_AND_ROBOTICS"
  | "BUSINESS"
  | "BRAINSTORMING"
  | "GAMING"
  | "MISCELLANEOUS";

type StringObj = {
  value: string;
}

type EventFrontendData = {
  name: string;
  slug: string;
  eventListingData: EventListing
}

type EventFormType = {
  name: string;
  slug: string;
  description: string;
  format: string;
  driveLink?: string;
  rules: StringObj[];
  category: EventCategory;
  prizes: StringObj[];
  registrationDeadline: string;
  teamSize: string;
  eventDates: StringObj[];
  coordinators: StringObj[];
}

export type { EventFrontendData, EventCategory, EventFormType };

export { RegistrationStatus };
export type { Event, Team };
