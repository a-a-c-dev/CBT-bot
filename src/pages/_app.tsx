import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AccessibilityProvider } from '../context/AccessibilityContext';



export default function App({ Component, pageProps }: AppProps) {
  return <AccessibilityProvider>
            <Component {...pageProps}/>
          </AccessibilityProvider>;
}
