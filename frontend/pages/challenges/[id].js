import Layout from "../../components/layout";
import { challengesData } from "../../challengesData";
import { useAuth } from "../../components/authProvider";
import FAQ from "../../components/faq";
import { useState } from "react";
import { stake } from "../../interactions";
import { getReward } from "../../interactions";
import { start, stop } from "../../interactions";

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

    const handleStake = async (challengeNumber) => {
        // stakeCOUN().then(() => {
        //     setStaked(true)
        // })
        stake(challengeNumber)
        .then(() => setStaked(true))
        .catch(err=>console.log(err))
    }

    const handleStart = async (challengeNumber) => {
        console.log("Inside handle start"+challengeNumber)
        start(challengeNumber)
    }

    const handleStop = async (challengeNumber) => {
        console.log("Inside handle stop"+challengeNumber)
        stop(challengeNumber)
    }

    const handleGetReward = async (challengeNumber) => {
        console.log("Inside handle getReward"+challengeNumber)
        getReward(challengeNumber)
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
                                    <button className="px-4 py-2 bg-green-500" onClick={()=>{handleStart(challengeData.number)}}>Start {challengeData.description}</button><button className="ml-6 px-4 py-2 bg-green-500" onClick={()=>{handleStart(challengeData.number)}}>Stop {challengeData.description}</button>
                                    <div className="mt-4"><button className="px-4 py-2 bg-green-700" onClick={() => {handleGetReward(challengeData.number)}}>Get Reward</button></div>
                                </div>
                            ) : (
                                <button className="mt-4 px-4 py-2 bg-green-500" onClick={() => handleStake(challengeData.number)}>Stake and Start</button>
                            )}
                        </div>

                    ) : (
                        <button className="mt-4 px-4 py-2 bg-green-500" onClick={handleStake}>Connect Wallet</button>
                    )
                    }
                    <FAQ />
                </div>
                <div className="basis-1/2">
                    <img className="ml-[50px] h-[45%] w-[25%] rounded-full border border-gray-400" src={`/challenges/${challengeData.img}`} alt=""></img>
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
