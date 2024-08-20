"use client"
import { SignedOut, SignedIn, UserButton, useUser,SignUp} from '@clerk/clerk-react';
import { Box, Typography, Container, AppBar, Toolbar, Button} from '@mui/material'

export default function signUpPage() {
  const { user } = useUser();
  const username = user ? user.firstName : '';
  return (
    <Container maxWidth="100%">
        <AppBar position="static" sx={{ backgroundColor: '#1E1E1E' }}>
        <Toolbar>
          
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#FFA500', href:"/"}}>
          <a href='/' style={{ textDecoration: 'none' }}>
            CardCraftr
          </a>
          </Typography>
          
          <SignedOut>
            <Button color="inherit" href="/sign-in" sx={{ color: '#FFF' }}>
              Login
            </Button>
            <Button color="inherit" href="/sign-up" sx={{ color: '#FFF' }}>
              Sign Up
            </Button>
          </SignedOut>
          <SignedIn>
            <Typography sx={{ mr: 2, color: '#FFA500' }}>Hello, {username}</Typography>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
    <Box
      sx={{
        pt:2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'black',
      }}
    >
      <Container maxWidth="sm" sx={{pb:2}}>
        <Typography
          variant="h4"
          component="h1"
          sx={{ color: 'orange', fontWeight: 'bold', textAlign: 'center', mb: 2 }}
        >
          Sign Up for CardCraftr
        </Typography>
        <Box sx={{display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'}}>
        <SignUp />
        </Box>
      </Container>
    </Box>
    </Container>
  )
}