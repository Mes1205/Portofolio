import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import CustomCursor from '@/components/CustomCursor'
import Navbar from "@/components/navbar";
import { ThemeProvider } from "./ThemeProvider";


const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Martha Meslina Florencia",
  description: "Portfolio of Martha Meslina Florencia, showcasing projects, experience, skills, and contact information.",
  applicationName: "Martha Meslina Florencia Portfolio",
  authors: [{ name: "Martha Meslina Florencia" }],
  creator: "Martha Meslina Florencia",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Martha Meslina Florencia",
    description: "Projects, experience, skills, and contact information by Martha Meslina Florencia.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col cursor-none">
        <ThemeProvider>
          <Navbar />
          <CustomCursor />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
