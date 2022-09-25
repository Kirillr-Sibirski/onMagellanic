import { useState } from "react"

const faqsData = [
    {
        question: "What if I do not wish to stake for the challenge?",
        answer: "You can do so. Start anytime and you will be minted an NFT upon completion"
    },
    {
        question: "When can I start if I want to stake?",
        answer: "You can start anytime before staking pool closes. Your performance will be recorded independent of other players."
    },
    {
        question: "When will my stake be returned?",
        answer: "After the staking pool closes + number of days of challenge + 1 day. For example, if staking pool closes on 1 Oct and challenge is for 14 days, you can withdraw on 16 Oct. This is to let the person joining at the last moment to complete challenge. We have also kept a buffer of 1 day."
    },
    {
        question: "How much will I earn if I stake?",
        answer: "Players who finish receive the stake of players who do not finish. Your earnings depend on the performance of other players."
    }
]

export default function FAQ() {
    const [faqShow, setFaqShow] = useState(Array(faqsData.length))

    const handleFaqShowChange = (index) => {
        console.log("Inside handle faqshow change")
        let tempFaqShow = faqShow.slice()
        tempFaqShow[index] = tempFaqShow[index] ? false : true
        setFaqShow(tempFaqShow)
    }

    return (
        <div>
            <h3 className="text-xl mt-6">FAQS</h3>
            <div className="mt-4">
                {faqsData.map((faq, index) => (
                    <div>
                        <div onClick={() => handleFaqShowChange(index)} className="mt-2">{faq.question}<i className='fas fa-angle-down ml-6'></i></div>
                        {faqShow[index] && <div>{faq.answer}</div>}
                    </div>
                ))}
            </div>
        </div>
    )
}