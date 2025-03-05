import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "rimon hasan",
  description: "Personal site of Rimon Hasan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        {children}
        <Script id="nav-highlight" strategy="afterInteractive">
          {`
            // Function to highlight active nav item
            function highlightActiveNavItem() {
              const navLinks = document.querySelectorAll('nav ul li a');
              const sections = document.querySelectorAll('section[id]');
              
              // Get current scroll position
              const scrollY = window.scrollY;
              
              // Find the current section
              sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                  // Remove active class from all links
                  navLinks.forEach(link => {
                    link.classList.remove('active');
                    link.removeAttribute('aria-current');
                  });
                  
                  // Add active class to current link
                  const activeLink = document.querySelector('nav ul li a[href="#' + sectionId + '"]');
                  if (activeLink) {
                    activeLink.classList.add('active');
                    activeLink.setAttribute('aria-current', 'page');
                  }
                }
              });
            }
            
            // Add scroll event listener
            window.addEventListener('scroll', highlightActiveNavItem);
            
            // Initial call
            document.addEventListener('DOMContentLoaded', highlightActiveNavItem);
          `}
        </Script>
      </body>
    </html>
  );
}
