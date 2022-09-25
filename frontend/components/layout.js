import Link from 'next/link'
import { ethers } from "ethers";
import { stake, getReward } from '../interactions/index.js'
import { networkChainID, ethEndpoint } from "../constants/ethConstants";
import { useEffect, useState } from 'react';
import { useAuth } from './authProvider.js';

const shortenAddress = (address) => {
    if (address)
        return address.substring(0, 6) + "..." + address.substring(address.length - 4, address.length)
}

export default function Layout({ children }) {

    const { currentAccount, setCurrentAccount } = useAuth()

    const connectWalletHandler = async () => {
        const { ethereum } = window

        if (!ethereum) {
            alert("Please Install Metamask")
        }

        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
            setCurrentAccount(accounts[0])
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="h-screen p-6">
            <div>
                <header className="flex justify-between mb-6">
                    <div className="flex items-center">
                        <h3 className="text-xl font-extrabold"><Link href="/"><a>OnMagellanic</a></Link></h3>
                        <p className="ml-8 text-gray-600"><Link href="/challenges"><a>Challenges</a></Link></p>
                    </div>
                    {currentAccount ? (
                        <h4>{shortenAddress(currentAccount)}</h4>
                    ) : (
                        <button className="px-4 py-2 text-lg border border-orange-600" onClick={connectWalletHandler}>Login</button>
                    )}
                </header>
                <main>
                    {children}
                </main>
            </div>

            <footer>
                <div className="mt-8 mb-6 border border-grey-600"></div>
                <div className="flex justify-between">
                    <p>Life is in this moment. There is no other meaning of life.</p>
                </div>
            </footer>
        </div>
    )
}