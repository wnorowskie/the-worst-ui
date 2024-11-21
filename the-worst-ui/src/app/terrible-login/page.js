// src/app/terrible-login/page.js
'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import '../terrible-signup.css'

export default function TerribleLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [submitPosition, setSubmitPosition] = useState({ x: 0, y: 0 })
  const [scrollDirection, setScrollDirection] = useState(1)
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      setSubmitPosition({
        x: Math.random() * 300 - 150,
        y: Math.random() * 300 - 150,
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = (e) => {
      e.preventDefault()
      window.scrollBy(0, -e.deltaY * scrollDirection)
    }
    window.addEventListener('wheel', handleScroll, { passive: false })
    return () => window.removeEventListener('wheel', handleScroll)
  }, [scrollDirection])

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

    const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      }),
    })
    const data = await res.json()
    if (res.ok) {
      alert(data.message)
      router.push('/success')
    } else {
      alert(data.error)
    }
  }

  return (
    <div className="terrible-ui">
      <div className="container">
        <form onSubmit={handleSubmit} className="signup-form">
          <h1 className="title">Log In for Eternal Frustration</h1>

          <div className="form-group">
            <label htmlFor="username" className="label">Username (good luck finding it)</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="input invisible-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="label">
              Password (must contain a prime number, a mythical creature, and your grandmother's maiden name)
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="input black-on-black"
              required
            />
          </div>

          <button
            type="submit"
            style={{
              position: 'relative',
              left: `${submitPosition.x}px`,
              top: `${submitPosition.y}px`,
              transition: 'all 0.5s ease',
            }}
            className="submit-button"
            onClick={() => handleSubmit }
          >
            Try to click me!
          </button>

          <button
            onClick={() => setScrollDirection(prev => prev * -1)}
            className="toggle-scroll"
          >
            Toggle Scroll Direction
          </button>

          <button
            onClick={() => router.push('/terrible-signup')}
            className="link-button"
          >
            Go to Sign Up
          </button>

          <div className="background-animations">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="animation-circle"
                style={{
                  backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                  width: `${Math.random() * 50 + 10}px`,
                  height: `${Math.random() * 50 + 10}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 3 + 1}s`,
                }}
              ></div>
            ))}
          </div>
        </form>
      </div>
    </div>
  )
}