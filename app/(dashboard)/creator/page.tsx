import React from 'react'
import Link from 'next/link'

const Creator = () => {
  return (
    <div className="text-center p-8 h-[86vh] flex flex-col justify-center bg-gray-900 rounded-lg text-white">
      <h1 className="text-4xl font-bold mb-2">
        Hi there, I&apos;m Brian Otieno
      </h1>
      <div className="text-left  mx-auto mb-8">
        <ul className="list-none space-y-2 text-lg">
          <li>
            📫 How to reach me:{' '}
            <a
              href="mailto:brianotieno586@gmail.com"
              className="text-yellow-400"
            >
              brianotieno586@gmail.com
            </a>
          </li>
        </ul>
      </div>

      {/* Social Links */}
      <h3 className="text-2xl font-semibold mb-4">Connect with me:</h3>
      <div className="flex justify-center space-x-4 mb-8">
        <Link href="https://x.com/oluoko_" target="_blank">
          <img
            src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/twitter.svg"
            alt="X"
            className="w-8 h-8"
          />
        </Link>
        <Link
          href="https://linkedin.com/in/brian-otieno-64a902213"
          target="_blank"
        >
          <img
            src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg"
            alt="LinkedIn"
            className="w-8 h-8"
          />
        </Link>

        <Link href="https://instagram.com/that_guy.brian" target="_blank">
          <img
            src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/instagram.svg"
            alt="Instagram"
            className="w-8 h-8"
          />
        </Link>

        <Link href="https://medium.com/@brianotieno586" target="_blank">
          <img
            src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/medium.svg"
            alt="Medium"
            className="w-8 h-8"
          />
        </Link>
        <Link
          href="https://www.youtube.com/channel/UC1n8QvoeaVxwkxLQhQBnElw"
          target="_blank"
        >
          <img
            src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/youtube.svg"
            alt="YouTube"
            className="w-8 h-8"
          />
        </Link>
        <Link
          href="https://www.facebook.com/profile.php?id=100070284942061"
          target="_blank"
        >
          <img
            src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/facebook.svg"
            alt="Facebook"
            className="w-8 h-8"
          />
        </Link>
        <Link href="https://github.com/oluoko" target="_blank">
          <img
            src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/github.svg"
            alt="GitHub"
            className="w-8 h-8"
          />
        </Link>
      </div>

      {/* Support Section */}
      <div className="mt-8">
        <a
          href="https://www.buymeacoffee.com/brianotient"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
            alt="Buy Me A Coffee"
            className="mx-auto h-12"
          />
        </a>
      </div>
    </div>
  )
}

export default Creator
