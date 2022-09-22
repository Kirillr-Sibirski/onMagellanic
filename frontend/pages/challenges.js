import Layout from "../components/layout";
import { useState } from "react";

const challengesData = [
  { id: 1, name: "Sleep for set amount of time", durationInDays: "14", awardNFT:"Great Sleep Regulator", stakeAmount:"10", img: "excuseme-brother.png" },
  { id: 2, name: "Get up at same time", durationInDays: "21", awardNFT:"Stable Bed Frequency", stakeAmount:"30", img: "bpraak.png" },
  { id: 3, name: "Use phone for no more than 2h/day", durationInDays: "30", awardNFT:"Old Against New", stakeAmount:"50", img: "jasleen-royal.png" },
  { id: 4, name: "Meditate atleast 15 minutes", durationInDays: "30", awardNFT:"Traditional Practice -  New Horizon", stakeAmount:"70", img: "lost-stories.png" }
]

export default function Home() {

  const [challengeID, setChallengeID] = useState(0)

  const handleChallengeClick = (id) => {
    setChallengeID(id)
  }

  return (
   <Layout>
      <div className="flex flex-wrap">
        {challengesData.map((challenge) => (
          <div className="px-[1%] basis-1/4 overflow-hidden" key={challenge.id} onClick={() => {handleChallengeClick(challenge.id)}}>
            <img src={`/challenges/${challenge.img}`} alt="" className="" />
            <div>
              <p className="text-lg font-bold">{challenge.name}</p>
              <p className="text-gray-600 truncate">{challenge.durationInDays} days</p>
              <p className="text-sm text-gray-500">{challenge.awardNFT} NFT</p>
              <p className="text-sm text-gray-500">{challenge.stakeAmount} CONU</p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}
