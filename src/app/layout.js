import '@/styles/globals.css';
import Navbar from '@/components/Navbar/Navbar';

export const metadata = {
  title: 'Nebula Catalog | Premium Multi-Category Showcase',
  description: 'Explore our curated catalog of cars, phones, computers, and bikes with dynamic properties.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        {/* <Navbar /> */}
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
