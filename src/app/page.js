import Image from "next/image";
import { auth, currentUser } from '@clerk/nextjs/server'

export default async function Home() {
  const { userId } = auth()
  const user = await currentUser()

  //console.log(userId)
  //console.log(user)

  if(!userId){
    return <div>!Unauthorised User</div>
  }
  return (
    <div>
      <h1 className="font-bold text-center mt-10">Home Page</h1>
    </div>
      );
}
