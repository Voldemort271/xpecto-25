"use client"
import React from 'react'
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();
    const handleSubmit = () => {

        router.push('/profile')
    }
    //TODO: Make this page inaccessible to anyone who is an ambassodor and anyone not logged in
  return (
    <div>
        <div className='h-32'></div>
      Put the content of campus ambassador here.
      <button className='border-2 p-2' onClick={handleSubmit}>Click here to become a campus ambassador</button>
    </div>
  )
}

export default Page
