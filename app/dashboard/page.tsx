"use client"
import { User } from '@supabase/supabase-js'
import React, { useState } from 'react'
import { useAuth } from '../providers/auth-provider';

const page = () => {
    // const [user, setuser] = useState<User | null>(null);
    const {user} = useAuth();
    const fetchUser = async() => {
        try {
            console.log("user: ",user);
        } catch (error) {
            
        }
    }
  return (
    <div>{user?.email}, </div>
  )
}

export default page