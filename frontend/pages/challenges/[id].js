import Layout from "../../components/layout";
import { challengesData } from "../../challengesData";
import { useAuth } from "../../components/authProvider";
import FAQ from "../../components/faq";
import { useEffect, useState } from "react";
import { stake } from "../../interactions";
import { getReward } from "../../interactions";
import { start, stop, timeIntoChallenge } from "../../interactions";

const stakeCOUN = async () => {
    var prom = new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, 3000)
    })
    return prom
}

function secondsToDhms(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor(seconds % (3600 * 24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);

    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
}

export default function Challenge({ challengeData }) {

    const { currentAccount } = useAuth()
    const [staked, setStaked] = useState(false)
    const [timeSinceChallengeStarted, setTimeSinceChallengeStarted] = useState(null)



    useEffect(() => {

        const findTimeIntoChallenge = async () => {
            console.log("Inside find time into challenge" + challengeData.number)
            timeIntoChallenge(challengeData.number)
                .then(res => setTimeSinceChallengeStarted(secondsToDhms(res)))
                .catch(err => console.log(err))

        }

        if (currentAccount && staked) {
            findTimeIntoChallenge()
        }

    }, [currentAccount, staked])

    const handleStake = async (challengeNumber) => {
        // stakeCOUN().then(() => {
        //     setStaked(true)
        // })
        stake(challengeNumber)
            .then(() => setStaked(true))
            .catch(err => console.log(err))
    }

    const handleStart = async (challengeNumber) => {
        console.log("Inside handle start" + challengeNumber)
        start(challengeNumber)
    }

    const handleStop = async (challengeNumber) => {
        console.log("Inside handle stop" + challengeNumber)
        stop(challengeNumber)
    }

    const handleGetReward = async (challengeNumber) => {
        console.log("Inside handle getReward" + challengeNumber)
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
                                    <div>You started this challenge {timeSinceChallengeStarted} ago</div>
                                    <div className="mt-4"><button className="px-4 py-2 bg-green-500" onClick={() => { handleStart(challengeData.number) }}>Start {challengeData.description}</button><button className="ml-6 px-4 py-2 bg-green-500" onClick={() => { handleStart(challengeData.number) }}>Stop {challengeData.description}</button></div>
                                    <div className="mt-4"><button className="px-4 py-2 bg-green-700" onClick={() => { handleGetReward(challengeData.number) }}>Get Reward</button></div>
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
