"use client";

import React, { useState, useRef } from 'react'
import { api } from '@/trpc/react';


const page = () => {

    const users = api.post.getUsers.useSuspenseQuery()[0];

    const [teamMems, setTeamMems] = useState<string[]>([]);

    const createTeamMutation = api.post.createTeam.useMutation();
    const createTeamMutationRef = useRef(createTeamMutation);

    return(
        <>
            <h1 style={{marginTop:200, marginLeft:50}}>TEAM-MAKER PAGE</h1>
            <br />

            <div style={{marginTop:50, marginLeft:50, display:"flex", flexDirection:"column"}}>
                {
                    users.map((user, i)=>(
                        <button onClick={()=>{setTeamMems([...teamMems, user.name])}} key={i}>{user.name}</button>
                    ))
                }
                <button onClick={()=>{createTeamMutationRef.current.mutate(teamMems)}}>Create Team</button>
            </div>
            <br />
            <ul>
                people in team : {teamMems.map((name,i)=><li key={i}>{name}</li>)}
            </ul>

        </>
    )
}

export default page