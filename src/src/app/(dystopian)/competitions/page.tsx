"use client";
import React, { useEffect } from "react";
import { api } from "@/trpc/react"; // Import the api object
import {CompetitionType} from "../../types"
import { useCurrentUser } from "@/lib/utils";
import CreateTeamDialog from "@/components/(dystopian)/create-team-dialog";
import { Button } from "@/components/ui/button"; // Import the Button component
import Link from 'next/link'
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
const Page = () => {

  const { data: competitions } = api.competition.getCompetitions.useQuery();
  
  useEffect(() => {
    if (competitions) {
      console.log('competition',competitions)
    }
  }, [competitions]);

return(<>
<div className="all">All competitions</div>

<div className="div-center mt-6" >
        <Grid scrollable="none" data={competitions} style={{width:'30%'}}>
          <GridToolbar>
            <Link href="/competitions/create"><button className="btn">Create Competition</button></Link>
          </GridToolbar>
            <Column
                field="competitionDetails.name"
                title="Name"
                width="150px"
            />
            <Column
                field="competitionDetails.begin_time"
                title="Begin Date"
                format="{0:dd/MM/yyyy}"
                width="150px"
            />
            <Column
                field="competitionDetails.end_time"
                title="End Date"
                width="150px"
               format="{0:dd/MM/yyyy}"
            />
        </Grid>

</div>
</>)

};
export default Page;

