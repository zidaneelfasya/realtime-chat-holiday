'use client';

import Button from '@/components/ui/Button'
import { useAuthCheck } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import React from 'react'

const page = () => {
  const router = useRouter()
  const isChecking = useAuthCheck()
  if (isChecking) return null

  return (
    <Button onClick={()=>{
      localStorage.removeItem("token")
      localStorage.removeItem("expiresAt")
      router.push("/login")
    }}>
      Logout
    </Button>
  )
}

export default page