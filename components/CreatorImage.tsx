import Image from 'next/image'
import creatorImage from '/public/creator.png'

const CreatorImage = () => {
  return (
    <Image
      src={creatorImage}
      alt="creator"
      width={30}
      height={30}
      className="rounded-full"
    />
  )
}

export default CreatorImage
