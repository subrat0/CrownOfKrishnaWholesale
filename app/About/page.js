import Link from "next/link";
import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-gradient-to-b from-black via-gray-900 to-black text-white py-20 px-6"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side Image */}
        <div className="flex justify-center">
          <Image
            src="/RealLogo.png" // your logo or relevant image
            alt="Crown of Krishna"
            width={384} // same as w-96 (tailwind 384px)
            height={384}
            className="rounded-2xl shadow-2xl w-72 md:w-96 hover:scale-105 transition-transform duration-500"
            priority
          />
        </div>

        {/* Right Side Content */}
        <div className="space-y-6">
          <h2 className="text-4xl font-extrabold leading-snug">
            About <span className="text-amber-400">Crown of Krishna</span>
          </h2>

          <p className="text-gray-300 leading-relaxed">
            Welcome to{" "}
            <span className="text-amber-400 font-semibold">
              Crown of Krishna
            </span>
            , founded by <span className="font-bold">Subrat Ghosh</span>. We are
            dedicated suppliers of <span className="font-semibold">Pagri</span>
            , <span className="font-semibold">Poshak</span>,{" "}
            <span className="font-semibold">Ghagra for Durga Mata Ji</span>, and
            all essential devotional products for Krishna ji. Our mission is to
            provide devotees with beautiful, high-quality items that bring
            divinity, tradition, and elegance together.
          </p>

          <p className="text-gray-300 leading-relaxed">
            At Crown of Krishna, you will find everything from traditional
            poshaks to fancy pagris, along with a wide variety of devotional
            essentials. Each product is carefully chosen to ensure that your
            worship and devotion is surrounded by beauty, comfort, and
            authenticity.
          </p>

          <p className="text-gray-300 leading-relaxed">
            Subrat Ghosh is passionately working to take Crown of Krishna to
            greater heights, making it a trusted name for devotees across India.
            Whether you are looking for wholesale supply or personal purchases,
            Crown of Krishna is here to serve you.
          </p>

          <p className="text-gray-400 italic">
            For inquiries, feel free to reach us at:{" "}
            <a
              href="mailto:crownofkrishna@gmail.com"
              className="text-amber-400 underline hover:text-amber-300"
            >
              crownofkrishna@gmail.com
            </a>
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/Contact"
              className="bg-amber-400 text-black font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-amber-500 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              Contact Us
            </Link>
            <Link
              href="/"
              className="border border-amber-400 text-amber-400 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-amber-400 hover:text-black hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              Explore Catalogue
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export const metadata = {
  title: "About COK",
  description:
    "At Crown of Krishna, you will find everything from traditional poshaks to fancy pagris along with a wide variety of devotional essentials. Each product is carefully chosen to ensure that your worship and devotion is surrounded by beauty, comfort, and authenticity.",
};
