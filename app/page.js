'use client'
import { Typography, Box, AppBar, Toolbar, Button} from "@mui/material";
import { useUser, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import {useState} from 'react'


export default function Home() {
  const {user} = useUser()
  const username = user ? user.firstName : '';
  
  return (
    <AppBar position="static">
    <Toolbar>
    <Typography variant="h6" style={{flexGrow: 1}}>
      Flashcard SaaS
    </Typography>
    <SignedOut>
      <Button color="inherit" href="/sign-in">Login</Button>
      <Button color="inherit" href="/sign-up">Sign Up</Button>
    </SignedOut>
    <SignedIn>
      <Typography sx={{mr:2}}> Hello, {username} </Typography>
      <UserButton/>
    </SignedIn>
  </Toolbar>
</AppBar>
  );
}
