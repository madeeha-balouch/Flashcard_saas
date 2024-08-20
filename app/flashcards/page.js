"use client"
import { collection,doc,getDoc,setDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import {useState, useEffect} from 'react'
import { SignedIn, SignedOut,UserButton,useUser} from '@clerk/clerk-react'
import {Container,Typography,Grid, Card, CardContent, CardActionArea, AppBar, Toolbar} from '@mui/material'
import {db} from "@/firebase";


export default function Flashcards() {
const { isLoaded, isSignedIn, user} = useUser() //clerk's hook
const [flashcards, setFlashcards] = useState([])
const router = useRouter()

const username = user ? user.firstName : ''
useEffect(() => {
    async function getFlashcards() {
        if (!user) return 
        const docRef = doc(collection(db,'users'), user.id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()){
            const collections = docSnap.data().flashcardSets || []
            console.log(collections)
            setFlashcards(collections)
        }
        else{
            await setDoc(docRef, {flashcardSets: []})
        }
    }
    getFlashcards()
}, [user])


const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`)
  }

  return (
    <Container maxWidth="100vw">
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

    <Container maxWidth="100%" sx={{ bgcolor: '#121212', color: '#FFF', maxHeight:"100%", pb:2, pt:4 }}>
    <Container maxWidth="md" sx={{color:"orange"}}>
      <Typography variant="h5" component="h2">
            Available Flashcards for {username}
          </Typography>
    <Grid container spacing={3} sx={{ mt: 1 }}>
      {flashcards.map((flashcard, index) => (
        <Grid item xs={12} sm={6} md={6} key={index}>
          <Card sx={{ backgroundColor: 'black', color: 'orange', borderColor: 'orange' }}>
            <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
              <CardContent>
                <Typography variant="h5" component="div">
                {flashcard.name.charAt(0).toUpperCase() + flashcard.name.slice(1)}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
))}
    </Grid>
  </Container>
  </Container>
  </Container>
    
  )
}
