export type CompetitionType=
{
    max_team_size: number;
    min_team_size: number;
    name: string;
    prizepool: number;
    description: string;
    begin_time: Date;
    end_time:Date;
    venue: string;
}
export type ProniteType=
{
    max_capacity: number;
    ticket_price: number;
    name: string;
    description: string;
    begin_time: Date;
    end_time:null;
    venue: string;
}

export type MultiEntitySchemaType=
{
   name : string,
   type : string,
   displayName : string
  
}