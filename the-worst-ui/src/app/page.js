'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const handleAliveClick = () => {
    router.push('/terrible-login')
  }

  const handleDeadClick = () => {
    router.push('/terrible-signup')
  }

  return (
    <main className="terrible-ui">
      <div className="container">
        <h1 className="title">Are you alive?</h1>
        <div className="button-group">
          <button onClick={handleAliveClick} className="submit-button">
            Yes, I am alive
          </button>
          <button onClick={handleDeadClick} className="submit-button">
            No, I am dead
          </button>
        </div>
      </div>
    </main>
  )
}