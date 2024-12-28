"use client";
import React, { useEffect } from "react";
import { api } from "@/trpc/react"; // Import the api object
import { useRouter } from "next/navigation";
import {
  Grid,
  GridColumn as Column,
  GridToolbar,
} from "@progress/kendo-react-grid";

const Page = () => {
  const router = useRouter();
  const { data: pronites } = api.pronite.getPronite.useQuery();

  useEffect(() => {
    if (pronites) {
      console.log("pronite", pronites);
    }
  }, [pronites]);

  return (
    <div>
      <div className="all">All pronites</div>

      <div className="div-center mt-6">
        <Grid scrollable="none" data={pronites} style={{ width: "20%" }}>
          <GridToolbar>
            <button
              onClick={() => router.push("/pronites/create")}
              className="btn"
            >
              Create Pronite
            </button>
          </GridToolbar>
          <Column field="proniteDetails.name" title="Name" width="150px" />
          <Column
            field="proniteDetails.begin_time"
            title="Begin Date"
            format="{0:dd/MM/yyyy hh:mm}"
            width="150px"
          />
        </Grid>
      </div>
    </div>
  );
};

export default Page;
