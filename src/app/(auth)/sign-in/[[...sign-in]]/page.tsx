import { SignIn } from '@clerk/nextjs'
import React from 'react'

const Signin = () => {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-10">
        <SignIn />
    </main>
  )
}

export default Signin