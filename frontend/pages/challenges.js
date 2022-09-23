import Layout from "../components/layout";
import { useState } from "react";
import { challengesData } from "../challengesData";
import Link from "next/link";

export default function Home() {

  const [challengeID, setChallengeID] = useState(0)

  const handleChallengeClick = (id) => {
    setChallengeID(id)
  }

  return (
    <Layout>
      <div className="flex flex-wrap">
        {challengesData.map((challenge) => (
          <div className="px-[1%] basis-1/4 overflow-hidden" key={challenge.id} onClick={() => { handleChallengeClick(challenge.id) }}>
            <Link href={`/challenges/${challenge.id}`}><a>
              <img src={`/challenges/${challenge.img}`} alt="" className="" />
              <div>
                <p className="text-lg font-bold">{challenge.name}</p>
                <p className="text-gray-600 truncate">{challenge.durationInDays} days</p>
                <p className="text-sm text-gray-500">{challenge.awardNFT} NFT</p>
                <p className="text-sm text-gray-500">{challenge.stakeAmount} COUN</p>
              </div>
            </a></Link>
          </div>
        ))}
      </div>
    </Layout>
  )
}
