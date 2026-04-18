import { ClerkProvider,SignInButton,SignIn,SignOutButton,SignedIn } from '@clerk/nextjs'
import './globals.css'
import Navbar from '@/components/Navbar'

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Navbar />
          {/* pt-20 ensures content isn't under the navbar */}
          <main className="pt-20">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}