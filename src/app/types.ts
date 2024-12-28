import type { Competition, EventDetails, InviteToken, RegistrationLevel, Team, User } from "@prisma/client";

export type CompetitionType = {
  max_team_size: number;
  min_team_size: number;
  name: string;
  prizepool: number;
  description: string;
  begin_time: Date;
  end_time: Date;
  venue: string;
  levels: string;
  rules: string;
  problem_statement: string;
  regPlans: {
    id: string;
    name: string;
    description: string;
    price: string;
    labelling: string;
  }[];
};
export type ProniteType = {
  max_capacity: number;
  ticket_price: number;
  name: string;
  description: string;
  begin_time: Date;
  end_time: null;
  venue: string;
};

export type MultiEntitySchemaType = {
  name: string;
  type: string;
  displayName: string;
};

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



