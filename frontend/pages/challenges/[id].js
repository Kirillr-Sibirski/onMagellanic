import Layout from "../../components/layout";
import { challengesData } from "../../challengesData";
import { useAuth } from "../../components/authProvider";
import FAQ from "../../components/faq";

export default function Challenge({ challengeData }) {

    const { currentAccount } = useAuth()

    return (
        <Layout>
            <h3 className="text-xl">{challengeData.name}</h3>
            <h2 className="text-2xl text-red-600">Staking Pool closes for new challengers on 17:30 1 Oct GMT+5:30</h2>
            {currentAccount && <p>Logged In</p>}
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
