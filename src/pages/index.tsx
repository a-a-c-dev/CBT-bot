import { Suspense,lazy } from "react";
import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import HeaderContainer from "@/components/headerContainer/HeaderContainer";
const ChatbotContainer  = lazy (()=>import ("../components/chatbotContainer/ChatbotContainer"));
import { Spinner } from "@/components/spinner/Spinner";
import AccessibilityPanel from "../components/accessibilityPanel/AccessibilityPanel";
import FooterContainer from "@/components/footerContainer/FooterContainer";
import { useAccessibility } from "../context/AccessibilityContext"; 
import ErrorBoundary from "@/components/errorBoundary/ErrorBoundary";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const { theme, fontSize, isDyslexiaFont } = useAccessibility(); // Get the current accessibility state


  return (
    <>
    <ErrorBoundary>
      <Head>
        <title>CBT-friendly-Bot</title>
        <meta name="description" content="cbt app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AccessibilityPanel />

      <div className={`app-container ${theme} font-${fontSize} ${isDyslexiaFont ? "dyslexia-font" : ""} ${styles.page} ${geistSans.variable} ${geistMono.variable}`}      >
        <HeaderContainer/>
        <main className={styles.main}>
          <Suspense fallback={<Spinner/>}>
                <ChatbotContainer/>      
          </Suspense> 
        </main>
       <FooterContainer/>
      </div>
      </ErrorBoundary>
    </>
  );
}
