'use client'
import { Next13ProgressBar } from 'next13-progressbar';
import localFont from 'next/font/local'
import "./globals.css";
import Header from './components/Header';
import LoginProvider from './Provider/LoginProvider';


const MiSans = localFont({src:[
  {
    path : "../public/fonts/miSans/MiSansLatin-Medium.woff2",
    weight : "400"
  },
  {
    path : "../public/fonts/miSans/MiSansLatin-Bold.woff2",
    weight : "700"
  },
],
  variable : '--font-misans'
})

const MiSansTH = localFont({src:[
  {
    path : "../public/fonts/miSansTH/MiSansThai-Medium.woff2",
    weight : "400"
  },
  {
    path : "../public/fonts/miSansTH/MiSansThai-Bold.woff2",
    weight : "700"
  },
],
  variable : '--font-misansth'
})

// export const metadata = {
//   title: "SP Memo",
//   description: "ความทรงจำ",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <LoginProvider>
        <body className={`${MiSansTH.variable} ${MiSans.variable} font-misans`}>
        <div className='bg-zinc-950 text-white min-h-screen transition'>
          <Header />
          <Next13ProgressBar color="#f00" />
          {children}
        </div>
        </body>
      </LoginProvider>
    </html>
  );
}
