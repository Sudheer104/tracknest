import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-800 via-amber-800 to-gray-900">
      <div className="bg-white dark:bg-gray-700 p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <SignIn />
      </div>
    </div>
  )
}