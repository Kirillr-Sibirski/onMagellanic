import Layout from "../../components/layout";
import { challengesData } from "../../challengesData";
import { useAuth } from "../../components/authProvider";
import FAQ from "../../components/faq";

export default function Challenge({ challengeData }) {

    const { currentAccount } = useAuth()

    return (
        <Layout>
            <h1 className="text-3xl font-bold">{challengeData.name}</h1>
            {/* <h4 className="text-lg text-red-600 mt-2">Staking Pool closes for new challengers on 17:30 1 Oct GMT+5:30</h4> */}
            <div className="mt-2"><i class='far fa-calendar-alt' /><span className="ml-2">{challengeData.durationInDays} days</span></div>
            <div className="mt-4">
                <button className="px-4 py-2 bg-green-500">Start without staking</button><button className="ml-6 px-4 py-2 bg-green-500">Stake and start</button>
            </div>
            <FAQ />
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
