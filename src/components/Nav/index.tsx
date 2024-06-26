'use client';

import Link from "next/link";
import WalletConnector from "../WalletConnector";
import Search from "../Search";
import Logo from "./Logo";

export default function Nav() {
    return <nav className="h-[70px] flex justify-between items-center px-8 sticky top-0 z-10 bg-white shadow-sm">
        <h1 className="text-2xl w-[150px] font-bold text-indigo-600">
            <Link href='/'>
                <Logo />
            </Link>
        </h1>
        <Search />
        <div>
            <WalletConnector />
        </div>
    </nav>
}