// pages/404.js
import Link from 'next/link'

export default function Custom404() {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link href="/">
        <a>Go back to chat</a>
      </Link>
    </div>
  )
}