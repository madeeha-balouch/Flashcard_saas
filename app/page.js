"use client";
import React from "react";
import { SignedOut, SignedIn, UserButton, useUser } from '@clerk/clerk-react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
  Grow,
  Paper,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import Container from "@mui/material/Container";
import { motion } from "framer-motion";
import getStripe from "./utils/get-stripe";



const handleSubmit = async () => {
  const checkoutSession = await fetch("/api/checkout_sessions", {
    method: "POST",
    headers: { origin: "http://localhost:3001" },
  });
  const checkoutSessionJson = await checkoutSession.json();

  const stripe = await getStripe();
  const { error } = await stripe.redirectToCheckout({
    sessionId: checkoutSessionJson.id,
  });

  if (error) {
    console.warn(error.message);
  }
};
const HomePage = () => {
  const {user} = useUser()
  const username = user ? user.firstName : '';
  return (
    
    <Container maxWidth="lg">
      {/* Navigation Bar */}
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Flashcard SaaS
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">
              Login
            </Button>
            <Button color="inherit" href="/sign-up">
              Sign Up
            </Button>
          </SignedOut>
          <SignedIn>
          <Typography sx={{mr:2}}> Hello, {username} </Typography>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{ textAlign: "center", mt: 8 }}>
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h2" gutterBottom>
            Welcome to Flashcard SaaS
          </Typography>
          <Typography variant="h5" gutterBottom>
            The easiest way to create flashcards from your text.
          </Typography>
        </motion.div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 4, mr: 2 }}
            href="/generate"
          >
            Get Started
          </Button>
          <Button variant="outlined" color="primary" sx={{ mt: 4 }}>
            Learn More
          </Button>
        </motion.div>
      </Box>

      {/* Features Section */}
      <Box sx={{ my: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Grow in>
              <Paper elevation={4} sx={{ padding: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Easy to Use
                </Typography>
                <Typography>
                  Intuitive interface designed for effortless flashcard
                  creation.
                </Typography>
              </Paper>
            </Grow>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Grow in timeout={1000}>
              <Paper elevation={4} sx={{ padding: 4 }}>
                <Typography variant="h6" gutterBottom>
                  AI-Powered Flashcards
                </Typography>
                <Typography>
                  Automatically generate flashcards with AI from any text.
                </Typography>
              </Paper>
            </Grow>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Grow in timeout={1500}>
              <Paper elevation={4} sx={{ padding: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Cloud Storage
                </Typography>
                <Typography>
                  Save your flashcards securely in the cloud for easy access.
                </Typography>
              </Paper>
            </Grow>
          </Grid>
        </Grid>
      </Box>

      {/* Pricing Section */}
      <Box sx={{ my: 8, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Pricing
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <motion.div whileHover={{ scale: 1.05 }}>
              {/* <Card raised>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Basic Plan - $5/month
                  </Typography>
                  <Typography sx={{ mt: 2 }}>
                    Access to basic features and limited storage.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained" onClick={handleSubmit}>
                    Choose Basic
                  </Button>
                </CardActions>
              </Card>
            </motion.div>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card raised>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Pro Plan - $10/month
                  </Typography>
                  <Typography sx={{ mt: 2 }}>
                    Unlimited flashcards and additional features.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained" onClick={handleSubmit}>
                    Choose Pro
                  </Button>
                </CardActions>
              </Card> */}

              <Card raised>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Ultimate Plan - $10/month
                  </Typography>
                  <Typography sx={{ mt: 2 }}>
                    {/* Everything you need: create, store, and access unlimited
                    flashcards with AI support and full cloud backup. */}
                    Get full access to our flashcard system: unlimited
                    flashcards, AI-powered creation, and secure cloud storage.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                  >
                    Start Your Journey
                  </Button>
                </CardActions>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;
