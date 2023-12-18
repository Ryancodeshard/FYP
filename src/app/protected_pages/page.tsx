import Image from 'next/image'
import { getServerSession } from 'next-auth'

export default async function SecretStuffPage() {
  const session = await getServerSession()
  console.log('session', session)

  if (!session) return (
    <p>
      unauthorised
    </p>
  )

  return (
    <>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Image src="/calendar.png" alt="me" width="300" height="300" />
        {session && <p>{session?.user?.name}'s secret stuff</p>}
      </div>
    </>
  )
}