import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import { MdLocationOn, MdEmail, MdPhone } from 'react-icons/md';
import Logo from '../../../assets/logo.png';
import MasterCard from '../../../assets/icon/mastercard.png';
import Visa from '../../../assets/icon/visa.png';
import American from '../../../assets/icon/amiricanexpress.png';
import Discover from '../../../assets/icon/discover.png';

function Footer() {
  const paymentMethod = [
    { name: 'masterCard', link: MasterCard },
    // { name: 'bitPay', link: 'src/assets/icon/bitpay.png' },
    { name: 'visa', link: Visa },
    { name: 'american express', link: American },
    { name: 'discover', link: Discover },
    // { name: 'sofort', link: 'src/assets/icon/sofort.png' },
    // { name: 'google pay', link: 'src/assets/icon/googlepay.png' },
    // { name: 'apple pay', link: 'src/assets/icon/applepay.png' },
    // { name: 'paypal', link: 'src/assets/icon/paypal.png' },
    // { name: 'maestro', link: 'src/assets/icon/maestro.png' },
  ];

  return (
    <footer className="bg-white py-8">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <img src={Logo} alt="Logo" className="mb-4 sm:mb-0 h-20 w-32" />
          <div className="flex justify-center items-center gap-3">
            <div className="p-1 rounded-full border-black border-2">
              <MdPhone className="text-[#0A0A0A] font-medium text-xl" />
            </div>
            <p className="text-[#0A0A0A] font-medium text-xl">Need help? Call us</p>
            <h1 className="text-[#494949] font-extrabold text-xl">1-800-222-8888</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Contact Us */}
          <div>
            <div className="mb-4">
              <MdLocationOn className="inline mr-2 text-lg" />
              <span>151 Nakhon Phatom Road, Dusit, Dusit District, Bangkok 10300, Thailand</span>
            </div>
            <div className="mb-4">
              <span className="block">Hours: 8:00 - 17:00, Mon - Sat</span>
            </div>
            <div className="mb-4">
              <MdEmail className="inline mr-2 text-lg" />
              <span>EliteCashConsulting@gmail.com</span>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="/faqs" className="text-gray-700 hover:underline">
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="https://www.elitecashflowconsulting.com/"
                  target="_blank"
                  className="text-gray-700 hover:underline"
                >
                  About Us
                </a>
              </li>
              <li>
                <a href="/privacy-policy?page=advert" className="text-gray-700 hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms-and-conditions?page=advert" className="text-gray-700 hover:underline">
                  Terms and Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Language and Currency */}
          <div>
            {/* <div className="mb-4">
              <h3 className="font-semibold">Language</h3>
              <LanguageDropdown />
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">Currency</h3>
              <CurrencyDropdown />
            </div> */}

            {/* Payment Methods */}
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Payment methods possible</h3>
              <div className="flex flex-wrap gap-2">
                {paymentMethod.map((pay, index) => (
                  <img key={index} src={pay.link} alt={pay.name} className="w-10 h-6" />
                ))}
              </div>
            </div>
          </div>

          {/* Sign Up Section */}
          {/* <div>
            <h3 className="font-semibold mb-4">Sign Up as a Partner</h3>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 border border-gray-300 w-full rounded-md outline-none"
              />
              <button className="px-4 py-2 bg-gray-800 text-white rounded-md whitespace-nowrap">Join Us</button>
            </form>
          </div> */}
        </div>

        {/* Footer Bottom */}
        <div className="border-t mt-8 pt-6 text-center flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">© 2024 EliteCashConsulting. All rights reserved.</p>

          {/* Social Icons */}
          <div className="flex justify-center mt-4 sm:mt-0 space-x-4 text-gray-700">
            <div className="rounded-full p-2 bg-black">
              <FaFacebookF className="text-xl text-white" />
            </div>
            <div className="rounded-full p-2 bg-black">
              <FaTwitter className="text-xl text-white" />
            </div>
            <div className="rounded-full p-2 bg-black">
              <FaInstagram className="text-xl text-white" />
            </div>
            <div className="rounded-full p-2 bg-black">
              <FaYoutube className="text-xl text-white" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
