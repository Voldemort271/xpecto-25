"use client";

import React, { useEffect } from "react";
import { api } from "@/trpc/react"; // Import the api object
import {CompetitionType} from "../../../types"
import { useCurrentUser } from "@/lib/utils";
import CreateTeamDialog from "@/components/(dystopian)/create-team-dialog";
import { Button } from "@/components/ui/button"; // Import the Button component
import Link from 'next/link'
const Page = () => {


  const createCompetition = api.competition.createCompetition.useMutation();

  const handleChange=(key:string, value:string|Date|number)=>
  {
    setForm((initState)=>({...initState,[key]:value}));
  }

  const saveCompetition = (form:  CompetitionType) => {
    try {
      createCompetition.mutate(
        {
          max_team_size: form.max_team_size,
          min_team_size: form.min_team_size,
          prizepool: form.prizepool,
          begin_time:form.begin_time,
          end_time:form.end_time,
          venue:form.venue,
          description:form.description,
          name:form.name,
        },
        {
          onSuccess: (e) => {
            //alert('Data Saved..')
            window.location.href="/competitions";

          },
        },
      );
    }   catch (e) {
      console.error(e);
      alert("Failed to accept the invitation. Please try again.");
    }
  };

 const [form,setForm]=React.useState<CompetitionType>({
   name: "",
  begin_time:new Date(),
  end_time:new Date(),
  description:"",
  max_team_size:0,
  min_team_size:0,
  prizepool:0,
  venue:""
 });

  

  return (
    <>
      <div className="flex flex-col">
      <div className="flex flex-row">
        <div className="left-col">
          <label className="font-semibold">
            Name
          </label>
          </div>
          <div >
          <input
            type="text"
            className="field-text"
            placeholder="Name" 
            onChange={(e)=>handleChange('name',e.target.value)}
          />
        </div>
        </div>
         <div className="flex flex-row">    
        <div className="left-col">
          <label className="font-semibold left">
            Description
          </label>
          </div>
          <div>
          <textarea
            rows={3}
            className="field-text"
            placeholder="Description"
            onChange={(e)=>handleChange('description',e.target.value)}
          />
        </div>
        </div>
        <div className="flex flex-row">
        <div className="left-col">
          <label className="font-semibold">
            Venue
          </label>
          </div>
          <div >
          <input
            type="text"
            onChange={(e)=>handleChange('venue',e.target.value)}
            className="field-text"
            placeholder="Venue"
          />
        </div>
        </div> 
        <div className="flex flex-row">
        <div className="left-col">
          <label className="font-semibold">
            Begin Date
          </label>
          </div>
          <div >
          <input
            type="date"
            onChange={(e)=>handleChange('begin_time',new Date(e.target.value))}
            className="field"
            
          />
        </div>
        </div>
        <div className="flex flex-row">
        <div className="left-col">
          <label className="font-semibold">
            End Date
          </label>
          </div>
          <div >
          <input
            type="date"
            onChange={(e)=>handleChange('end_time',new Date(e.target.value))}
            className="field"
            
          />
        </div>
        </div>
        <div className="flex flex-row">
        <div className="left-col">
          <label className="font-semibold">
            Min Team Size
          </label>
          </div>
          <div >
          <input
            type="text"
            id="minTeamSize"
            onChange={(e)=>handleChange('min_team_size',Number(e.target.value))}
            className="field"
            placeholder="minimum"
          />
        </div>
        </div>  
        <div className="flex flex-row">
        <div className="left-col">
          <label  className="font-semibold">
            Max Team Size
          </label>
          </div>
          <div >
          <input type="text"
            onChange={(e)=>handleChange('max_team_size',Number(e.target.value))}
            className="field"
            placeholder="maximum"
          />
        </div>
        </div>
        <div className="flex flex-row">
        <div className="left-col">
          <label className="font-semibold left">
            Prizepool
          </label>
          </div>
          <div >
          <input
            onChange={(e)=>handleChange('prizepool',Number(e.target.value))}
            type="text"
            id="prizePool"
            className="field"
            placeholder="Prizepool"
          />
        </div>
        </div>
       
        <div className="flex flex-row">
        <button className="btn" onClick={() =>
                  saveCompetition(form)
                } style={{marginLeft:"10.5rem",marginTop:"1rem"}}>Create</button>
        <button className="btn" style={{marginLeft:"1rem",marginTop:"1rem"}} onClick={()=>{window.location.href="/competitions"}}>Cancel</button>
        </div>
      </div>
    </>
  );
};
export default Page;
