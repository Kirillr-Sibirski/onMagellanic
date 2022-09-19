export default function HomeComponent() {
    return (
        <div>
            <div className="mt-6 max-w-xl">
                <h2 className="">A Better Way to Live</h2>
                <p>Increase concentration during work time or relax more effectively. Our challenges help to improve quality of life along with getting extra rewards.</p>
                <p>Start building the habits you deserve.</p>
                <button className="px-6 py-4">Start Now</button>
            </div>

            <div className="mt-6">
                <div className="text-center max-w-xl m-auto">
                    <h2 className="">Have fun while achieving</h2>
                    <p>Our gameplay will give you the utimate push to achieve. Compete with others and earn higher rewards.</p>
                </div>
                <div className="flex justify-between mt-4">
                    <div>
                        <h3 className="text-center">Join a Challenge</h3>
                        <p>Option to stake token (Dai, eth) when joining the challenge.</p>
                    </div>
                    <div>
                        <h3 className="text-center">Complete tasks</h3>
                        <p>Complete task regulary to stay in the challenge. Feel proud as you hit your life goals.</p>
                    </div>
                    <div>
                        <h3 className="text-center">Watch rewards accrue</h3>
                        <p>As players leave the game, their tokens are distributed to the remaining players.</p>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <div className="text-center max-w-xl m-auto">
                <h2>Hit your goals and win</h2>
                <p>Players who complete a challenge get back their staked tokens. Players who leave the challenge unfinished do not get back their tokens. Those are distributed equally among the players who completed the challenge. Players who complete the challenge are also minted an nft.</p>
            </div>
            </div>
        </div>
    )
}