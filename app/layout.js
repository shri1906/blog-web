"use client";

import Navbar from "../components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Story_Script, Montserrat } from "next/font/google";
import "@fortawesome/fontawesome-free/css/all.min.css";
import BootstrapClient from "./bootstrapClient";
import Footer from "@/components/Footer";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-montserrat",
});

const storyScript = Story_Script({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-story",
  adjustFontFallback: false,
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${storyScript.variable} d-flex flex-column min-vh-100`}
      >
        <BootstrapClient />
        <Navbar />

        <main
          className="flex-fill"
          style={{ background: "#fcf8f8", paddingTop: "60px" }}
        >
          {children}
        </main>

        <Footer />

        {/* ✅ TOASTER MUST BE INSIDE BODY */}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#333",
              color: "#fff",
            },
            success: {
              iconTheme: {
                primary: "#22c55e",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
