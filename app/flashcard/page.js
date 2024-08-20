"use client"
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import {db} from '@/firebase'
import { useSearchParams } from "next/navigation"
import {Container,TextField,Button,Typography, Box,Grid, Card, CardContent,
    CardActionArea,AppBar,Toolbar
  }from '@mui/material'

export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState([])
  
    const searchParams = useSearchParams()
    const search = searchParams.get('id')
    const username = user ? user.firstName : '';
  
    useEffect(() => {
        async function getFlashcard() {
          if (!search || !user) return
      
          const docRef = doc(collection(doc(collection(db,'users'), user.id),'flashcardSets'),search)
          const docSnap = await getDoc(docRef)
            const docs = docSnap.data().flashcards || []; // Ensure docs is an array, or use an empty array as a fallback
            const flashcards = [];
          
            // Iterate through the array and access elements directly
            docs.forEach((doc, index) => {
              flashcards.push({ id: index, ...doc });
            });
          
          console.log(flashcards);
          setFlashcards(flashcards)
          }
        getFlashcard()
      }, [search, user])

      const handleCardClick = (id) => {
        setFlipped((prev) => ({
          ...prev,
          [id]: !prev[id],
        }))
      }
      if (!isLoaded || !isSignedIn){
        return <></>
      }
      return (
        <Container maxWidth="100%">
        <AppBar position="static" sx={{ backgroundColor: '#1E1E1E' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#FFA500' }}>
            CardCraftr
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
        <Container maxWidth="md" sx={{ bgcolor: '#121212', color: '#FFF', maxHeight:"100%", pb:2, pt:2 }}>
        {flashcards.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom color="#FFA500">
              Flashcards Preview for {search.charAt(0).toUpperCase() + search.slice(1)}
            </Typography>
            <Grid container spacing={2}>
              {flashcards.map((flashcard, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card sx={{ bgcolor: flipped[index] ? '#FFA500' : '#1E1E1E', color: '#FFF' }}>
                    <CardActionArea
                      onClick={() => {
                        handleCardClick(index)
                      }}>
                      <CardContent>
                        <Box sx={{
                          perspective: "1000px",
                          '& > div': {
                            transition: "transform 0.6s",
                            transformStyle: "preserve-3d",
                            position: "relative",
                            width: "100%",
                            height: "200px",
                            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                            transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                          },
                          '& > div > div': {
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backfaceVisibility: 'hidden',
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 2,
                            boxSizing: 'border-box'
                          },
                          '& > div > div:nth-of-type(2)': {
                            transform: 'rotateY(180deg)'
                          },
                        }}>
                          <div>
                            <div>
                              <Typography variant="h6" component="div">
                                {flashcard.front}
                              </Typography>
                            </div>
                            <div>
                              <Typography variant="h6" component="div">
                                {flashcard.back}
                              </Typography>
                            </div>
                          </div>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
        </Container>
        </Container>
      )
      
  }