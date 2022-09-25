export default function HomeComponent() {
    return (
        <div>
            <div className="max-w-xl">
                <h1 className="text-3xl font-ld">A Better Way to Live</h1>
                <p className="mt-4 text-lg">Increase concentration during work time or relax more effectively. Our challenges help to improve quality of life along with getting extra rewards.</p>
                <p>Start building the habits you deserve.</p>
                <button className="mt-4 px-10 py-3 bg-orange-600 text-white">Start Now</button>
            </div>

            <div className="mt-6">
                <div className="text-center max-w-xl m-auto">
                    <h2 className="text-2xl font-bold">Have fun while achieving</h2>
                    <p className="mt-2 text-lg">Our gameplay will give you the utimate push to achieve. Compete with others and earn higher rewards.</p>
                </div>
                <div className="mt-4 flex justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-center">Join a Challenge</h3>
                        <p>Option to stake token (Dai, eth) when joining the challenge.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-center">Complete tasks</h3>
                        <p>Complete task regulary to stay in the challenge. Feel proud as you hit your life goals.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-center">Watch rewards accrue</h3>
                        <p>As players leave the game, their tokens are distributed to the remaining players.</p>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <div className="text-center max-w-xl m-auto">
                <h2 className="text-2xl font-bold">Hit your goals and win</h2>
                <p>Players who complete a challenge get back their staked tokens. Players who leave the challenge unfinished do not get back their tokens. Those are distributed equally among the players who completed the challenge. Players who complete the challenge are also minted an nft.</p>
            </div>
            </div>
        </div>
    )
}