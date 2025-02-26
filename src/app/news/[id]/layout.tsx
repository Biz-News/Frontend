import { NavBar } from "@/components/nav-bar";
import { Metadata } from "next";
import { PropsWithChildren } from "react";


export default function RootLayout({ children }: PropsWithChildren) {
    return (
      <div>
        <NavBar/>
        {children}
      </div>
    );
}
