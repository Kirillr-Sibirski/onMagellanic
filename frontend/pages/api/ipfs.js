// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NFTStorage, File } from 'nft.storage'

export default async function generateNFT(user) { // Generate and upload metadata to ipfs
  const image = await getExampleImage()

  const nft = {
    image, // use image Blob as `image` field
    name: "Great Sleep Regulator",
    description: `User ${user} has completed onMagellanic challenge 'Great Sleep Regulator' by sleeping for the same amount of time everyday for 14 days.`,
  }

  const client = new NFTStorage({ token: process.env.NEXT_PUBLIC_NFT_STORAGE_KEY })
  const metadata = await client.store(nft)

  return JSON.stringify(metadata.url);
}

async function getExampleImage() {
  const imageOriginUrl = "../challenges/GreatSleepRegulator.png"
  const r = await fetch(imageOriginUrl)
  if (!r.ok) {
    throw new Error(`error fetching image: [${r.statusCode}]: ${r.status}`)
  }
  return r.blob()
}