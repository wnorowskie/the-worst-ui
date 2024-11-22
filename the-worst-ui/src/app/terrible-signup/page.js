'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '../terrible-signup.css';

export default function TerribleSignup() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    captcha: '',
  });
  const [submitPosition, setSubmitPosition] = useState({ x: 0, y: 0 });
  const [scrollDirection, setScrollDirection] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setSubmitPosition({
        x: Math.random() * 300 - 150,
        y: Math.random() * 300 - 150,
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = (e) => {
      e.preventDefault();
      window.scrollBy(0, -e.deltaY * scrollDirection);
    };
    window.addEventListener('wheel', handleScroll, { passive: false });
    return () => window.removeEventListener('wheel', handleScroll);
  }, [scrollDirection]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch('http://localhost:3001/api/login', { // Update to your local API URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message); // Success message from the API
      router.push('/terrible-login');
    } else {
      alert(data.message || 'An error occurred. Please try again.');
    }
  } catch (error) {
    console.error('Error during signup:', error);
    alert('An unexpected error occurred. Please try again later.');
  }
};


  return (
    <div className="terrible-ui">
      <div className="container">
        <form onSubmit={handleSubmit} className="signup-form">
          <h1 className="title">Sign Up for Eternal Frustration</h1>

          <div className="form-group">
            <label htmlFor="username" className="label">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="label">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="input wingdings"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="captcha" className="label">
              CAPTCHA (solve quantum mechanics equation)
            </label>
            <input
              type="text"
              id="captcha"
              name="captcha"
              value={formData.captcha}
              onChange={handleInputChange}
              className="input"
              placeholder="∫∞-∞ ψ*(x) (-ℏ²/2m) ∇² ψ(x) dx"
              required
            />
          </div>

          <div className="form-group checkbox-group">
            <input type="checkbox" id="terms" className="checkbox" required />
            <label htmlFor="terms" className="label">
              I agree to the incomprehensible terms and conditions
            </label>
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
            onClick = {handleSubmit}
          >
            Try to click me!
          </button>

          <button
            onClick={() => setScrollDirection((prev) => prev * -1)}
            className="toggle-scroll"
          >
            Toggle Scroll Direction
          </button>

          <button
            onClick={() => router.push('/terrible-login')}
            className="link-button"
          >
            Go to Login
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
  );
}
