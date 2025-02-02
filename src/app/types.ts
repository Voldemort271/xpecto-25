import {
  type Competition,
  type EventDetails,
  type Expos,
  type InviteToken,
  type Pronite,
  type RegistrationLevel,
  type Team,
  type User,
  type Workshops,
} from "@prisma/client";
import { type StaticImport } from "next/dist/shared/lib/get-img-props";

export type TeamData = {
  name: string;
  role: "convenor" | "co-convenor" | "head"; // enum
  org?:
    | "web dev"
    | "design"
    | "content"
    | "planning"
    | "photography"
    | "sponsorship"
    | "security"
    | "publicity"
    | "media"
    | "hospitality"
    | "decoration"; // enum
  image: string | StaticImport;
  desc: string;
  email?: string; // url
  phone?: string; // number maybe?
  instagram?: string; // url
  linkedin?: string; // url
};

// export type CompetitionType = {
//   max_team_size: number;
//   min_team_size: number;
//   name: string;
//   prizepool: number;
//   description: string;
//   begin_time: Date;
//   end_time: Date;
//   venue: string;
//   levels: string;
//   rules: string;
//   problem_statement: string;
//   regPlans: {
//     id: string;
//     name: string;
//     description: string;
//     price: string;
//     labelling: string;
//   }[];
// };
// export type ProniteType = {
//   max_capacity: number;
//   ticket_price: number;
//   name: string;
//   description: string;
//   begin_time: Date;
//   end_time: null;
//   venue: string;
// };
//
// export type MultiEntitySchemaType = {
//   name: string;
//   type: string;
//   displayName: string;
// };

export interface TeamWithFullDetails extends Team {
  leader: User;
  team_members: User[];
  invitations: InviteToken[];
}

export interface EventWithPlans extends EventDetails {
  regPlans: RegistrationLevel[];
}

export interface CompetitionWithDetails extends Competition {
  competitionDetails: EventWithPlans;
}

export interface ExpoWithDetails extends Expos {
  exposDetails: EventWithPlans;
}

export interface WorkshopWithDetails extends Workshops {
  workshopDetails: EventWithPlans;
}

export interface ProniteWithDetails extends Pronite {
  proniteDetails: EventWithPlans;
}
