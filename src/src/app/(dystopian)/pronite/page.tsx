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

  const { data: pronites } = api.pronite.getPronite.useQuery();
  
  useEffect(() => {
    if (pronites) {
      console.log('pronite',pronites)
    }
  }, [pronites]);

return(<>
<div className="all">All pronites</div>

<div className="div-center mt-6" >
        <Grid scrollable="none" data={pronites} style={{width:'20%'}}>
          <GridToolbar>
            <Link href="/pronite/create"><button className="btn">Create Pronite</button></Link>
          </GridToolbar>
            <Column
                field="proniteDetails.name"
                title="Name"
                width="150px"
            />
            <Column
                field="proniteDetails.begin_time"
                title="Begin Date"
                format="{0:dd/MM/yyyy hh:mm}"
                width="150px"
            />
        </Grid>

</div>
</>)

};
export default Page;

