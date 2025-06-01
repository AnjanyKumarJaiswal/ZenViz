// import { FaTwitter, linked } from "lucide-react";
import { Linkedin , Twitter, Github } from "lucide-react";


const Footer = () => {
  return (
    <footer className="bg-[#1C1A1D] text-white py-10 px-6 font-satoshi">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">

        <div>
          <h2 className="text-xl font-bold flex items-center space-x-2">
            <span className="text-indigo-400 text-2xl">{`</>`}</span>
            <span>ZenViz</span>
          </h2>
          <p className="mt-4 text-sm text-gray-300 italic">
            “In the flow of code, find your zen. In the clarity of visualization, find your vision.”
          </p>
          <p className="mt-4 text-sm text-gray-400">
            We're building tools to help developers understand, debug, and grow with their code.
            Join us on the journey.
          </p>
          <p className="mt-2 text-sm">
            Feedback or bugs? Write to us at{" "}
            <a href="mailto:zenviz0508@gmail.com" className="text-indigo-400 hover:underline">
              zenviz0508@gmail.com
            </a>
          </p>
          <div className="flex space-x-4 mt-4 text-gray-300">
            <a href="https://x.com/_ZenViz_" target="_blank" rel="noopener noreferrer">
              <Twitter className="hover:text-white" />
            </a>
            <a href="https://linkedin.com/company/zenviz" target="_blank" rel="noopener noreferrer">
              <Linkedin className="hover:text-white" />
            </a>
          </div>
        </div>

        <div className="md:text-right font-satoshi">
          <h3 className="font-semibold text-base mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/about" className="hover:text-white">About ZenViz</a></li>
            <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
