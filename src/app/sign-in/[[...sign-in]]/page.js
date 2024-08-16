import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='flex items-center justify-center flex-col gap-10 text-center'>
        <h1 className='text-4xl font-bold mt-20'>Sign In to FlashCard SaaS</h1>
        <SignIn />
    </div>
  )
}