
import '../globals.css'
import { Inter } from 'next/font/google'
import Header from '../components/features/layout/Header';
import Footer from '../components/features/layout/Footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'beeeach',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
          <div className='container min-h-screen px-6 py-20 lg:pt-10 lg:px-24 lg:pb-24 xl:px-48'>
            {children}
          </div>
        <Footer />
        </body>
    </html>
  )
}
