import Layout from "../../components/layout";
import { challengesData } from "../../challengesData";
import { useAuth } from "../../components/authProvider";
import FAQ from "../../components/faq";
import { useState } from "react";

const stakeCOUN = async () => {
    var prom = new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, 3000)
    })
    return prom
}

export default function Challenge({ challengeData }) {

    const { currentAccount } = useAuth()
    const [staked, setStaked] = useState(false)

    const handleStake = async () => {
        stakeCOUN().then(() => {
            setStaked(true)
        })
    }

    return (
        <Layout>
            <div className="flex">
                <div className="basis-1/2">
                    <h1 className="text-3xl font-bold">{challengeData.name}</h1>
                    {/* <h4 className="text-lg text-red-600 mt-2">Staking Pool closes for new challengers on 17:30 1 Oct GMT+5:30</h4> */}
                    <div className="mt-2"><i className='far fa-calendar-alt' /><span className="ml-2">{challengeData.durationInDays} days</span></div>
                    <div className="mt-2"><i className='fas fa-money-bill-alt' /><span className="ml-2">{challengeData.stakeAmount} COUN</span></div>
                    {currentAccount ? (
                        <div>
                            {staked ? (
                                <div className="mt-4">
                                    <button className="px-4 py-2 bg-green-500">Start {challengeData.description}</button><button className="ml-6 px-4 py-2 bg-green-500">Stop {challengeData.description}</button>
                                </div>
                            ) : (
                                <button className="mt-4 px-4 py-2 bg-green-500" onClick={handleStake}>Stake and Start</button>
                            )}
                        </div>

                    ) : (
                        <button className="mt-4 px-4 py-2 bg-green-500" onClick={handleStake}>Connect Wallet</button>
                    )
                    }
                    <FAQ />
                </div>
                <div className="basis-1/2">
                    <img className="ml-[50px] h-[50%] w-[25%] rounded-full border border-gray-400" src={`/challenges/${challengeData.img}`} alt=""></img>
                    <p className="mt-4">All successful challengers will be minted this nft</p>
                </div>
            </div>
        </Layout>
    )
}


export async function getStaticPaths() {
    const paths = challengesData.map((challenge) => {
        return {
            params: {
                id: String(challenge.id),
            }
        }
    })

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    let challengeData = {}
    for (let i = 0; i < challengesData.length; i++) {
        if (challengesData[i].id == params.id) {
            challengeData = challengesData[i]
        }
    }

    return {
        props: {
            challengeData,
        },
    };
}
