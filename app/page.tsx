'use client';

import Button from '@/components/ui/Button'
import HELPER from '@/helpers/helper';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const page = () => {
  const router = useRouter()

  return (
    <Button onClick={async()=>{
      HELPER.Axios('POST', 'api/auth/logout').then(res => {
        if(res.success) router.replace('/login')
      })
    }}>
      Logout
    </Button>
  )
}

export default page