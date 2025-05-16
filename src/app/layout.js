import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Nav from "./components/Home/Nav";
import ClientProvider from "./components/Hoc/ClientProvider";
import Footer from "./components/Home/Footer";
import ScrollToTop from "./components/Helper/ScrollToTop";
import { ToastContainer } from "react-toastify";



const font = Plus_Jakarta_Sans({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ["latin"],

})

export const metadata = {
  title: "JobBoard | Find Your Dream Job",
  description: "Find Your Dream Job",
};

export default function RootLayout({ children }) {
  return (
    <ClientProvider>
    <html lang="en">
      <body
        className={font.className}>
          <Nav/>
        {children}
        <ToastContainer position="top-right" autoClose={3000}/>
        <Footer/>
        <ScrollToTop/>
      </body>
    </html>
    </ClientProvider>
  );
}
