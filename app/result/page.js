"use client";
const { useSearchParams, useRouter } = require("next/navigation");
const { useState, useEffect } = require("react");
import { Container, Typography, Box, CircularProgress,AppBar,Toolbar,Button } from "@mui/material";
import { SignedOut, SignedIn, UserButton, useUser} from '@clerk/clerk-react';

const ResultPage = () => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const {user} = useUser();
  const username = user ? user.firstName : '';

  const session_id = searchParams.get("session_id");

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      if (!session_id) return;
      try {
        const res = await fetch(
          `/api/checkout_sessions?session_id=${session_id}`
        );
        const sessionData = await res.json();
        if (res.ok) {
          setSession(sessionData);
        } else {
          setError(sessionData.error);
        }
      } catch (err) {
        setError("An error occurred while retrieving the session.");
      } finally {
        setLoading(false);
      }
    };
    fetchCheckoutSession();
  }, [session_id]);

  if (loading) {
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
      <Container
        maxWidth="sm"
        sx={{
          textAlign: "center",
          mt: 4,
          bgcolor: "#121212",
          color: "#FFF",
          padding: 4,
          borderRadius: 2,
        }}
      >
        <CircularProgress sx={{ color: "#FFA500" }} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </Container>
      </Container>
    );
  }

  if (error) {
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
      <Container
        maxWidth="sm"
        sx={{
          textAlign: "center",
          mt: 4,
          bgcolor: "#121212",
          color: "#FFF",
          padding: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
      </Container>
    );
  }

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
    <Container
      maxWidth="sm"
      sx={{
        textAlign: "center",
        mt: 4,
        bgcolor: "#121212",
        color: "#FFF",
        padding: 4,
        borderRadius: 2,
      }}
    >
      {session.payment_status === "paid" ? (
        <>
          <Typography variant="h4" sx={{ color: "#FFA500" }}>
            Thank you for your purchase!
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ color: "#FFF" }}>
              Session ID: {session_id}
            </Typography>
            <Typography variant="body1">
              We have received your payment. You will receive an email with the
              order details shortly.
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Typography variant="h4" sx={{ color: "#FFA500" }}>
            Payment failed
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">
              Your payment was not successful. Please try again.
            </Typography>
          </Box>
        </>
      )}
    </Container>
    </Container>
  );
};

export default ResultPage;
