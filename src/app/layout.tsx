import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
const inter = Inter({ subsets: ["latin"] });
import SideBar from "@/components/Header";
import StoreProvider from "./StoreProvider";
import './globals.css'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import '@smastrom/react-rating/style.css'
import type { NextApiRequest, NextApiResponse } from 'next';

config.autoAddCss = false;


export const metadata: Metadata = {
  title: "Navy Film",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <div className="">
            <div className="w-[90%] xl:w-[75%] flex justify-center items-center  mx-auto  shadow-2xl ">

              {children}
            </div>
          </div>
        </body>
      </html>
    </StoreProvider>
  );
}


