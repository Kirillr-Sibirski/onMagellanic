// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NFTStorage, File } from 'nft.storage'

export default async function generateNFT(user, challenge) { // Generate and upload metadata to ipfs
  const image = await getExampleImage(challenge)

  const nft = {
    image, // use image Blob as `image` field
    name: challenge,
    description: `User ${user} has completed onMagellanic challenge '${challenge}'.`,
  }

  const client = new NFTStorage({ token: process.env.NEXT_PUBLIC_NFT_STORAGE_KEY })
  const metadata = await client.store(nft)
  console.log(JSON.stringify(metadata.url));
  return JSON.stringify(metadata.url);
}

async function getExampleImage(challenge) {
  const firstPart = "../challenges/"
  const imageOriginUrl = firstPart.concat(challenge,".png")
  const r = await fetch(imageOriginUrl)
  if (!r.ok) {
    throw new Error(`error fetching image: [${r.statusCode}]: ${r.status}`)
  }
  return r.blob()
}