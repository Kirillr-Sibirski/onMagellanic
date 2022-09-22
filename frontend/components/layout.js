import Link from 'next/link'
import { ethers } from "ethers";
import { stake } from '../interactions/index.js'
import { networkChainID, ethEndpoint } from "../constants/ethConstants";
import { useEffect, useState } from 'react';

const shortenAddress = (address) => {
    if (address)
        return address.substring(0, 6) + "..." + address.substring(address.length - 4, address.length)
}

export default function Layout({ children }) {

    const [currentAccount, setCurrentAccount] = useState(null)

    const checkWalletIsConnected = async () => {
        const { ethereum } = window
        if (ethereum) {
            const accounts = await ethereum.request({ method: 'eth_accounts' })
            if (accounts.length) {
                setCurrentAccount(accounts[0])
            }
        }
    }

    useEffect(() => {
        checkWalletIsConnected()
    }, [])


    const connectWalletHandler = async () => {
        const { ethereum } = window

        if (!ethereum) {
            alert("Please Install Metamask")
        }

        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
            setCurrentAccount(accounts[0])
        } catch (error) {
            console.log(error)
        }
    }

    // async function requestAccount() {
    //     if(window.ethereum) {
    //         try {
    //             const accounts = await window.ethereum.request({
    //                 method: "eth_requestAccounts"
    //             });
    //         } catch (error) {
    //             console.log("Error connecting...")
    //         }
    //     } else {
    //         alert("Please install MetaMask.")
    //     }
    // }

    // async function switchNetwork() {
    //     // Here network must be switched
    // }

    // async function connectWallet() {
    //     if(typeof window.ethereum !== 'underfined') {
    //         await requestAccount();
    //         const provider = new ethers.providers.Web3Provider(window.ethereum);
    //         await switchNetwork(provider);
    //         stake(provider); // For testing
    //     }
    // }

    return (
        <div className="h-screen p-6">
            <div>
                <header className="flex justify-between mb-6">
                    <div className="flex items-center">
                        <h1 className="text-3xl"><Link href="/"><a>OnMagellanic</a></Link></h1>
                        <h4 className="ml-8"><Link href="/challenges"><a>Challenges</a></Link></h4>
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
                    <div><a href="https://twitter.com/cheenukhurana" target="_blank" className="fa fa-twitter"></a></div>
                </div>
            </footer>
        </div>
    )
}