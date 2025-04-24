import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { TbWorldWww } from 'react-icons/tb';
import Logo from '../../../assets/logo.png';
import MasterCard from '../../../assets/icon/mastercard.png';
import Visa from '../../../assets/icon/visa.png';
import American from '../../../assets/icon/amiricanexpress.png';
import Discover from '../../../assets/icon/discover.png';
import { getPageCopyright } from '../../../utils';

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
      <div className="container mx-auto px-4 flex flex-col md:flex-row md:justify-between w-full text-sm lg:text-lg">
        <div className="flex flex-col items-left mb-8">
          <div className="flex flex-col items-left mb-2">
            <img src={Logo} alt="Logo" className="mb-4 sm:mb-0 h-32 w-52" />

            <div className="flex flex-col item-left gap-3 pt-5">
              <p className="text-[#0A0A0A] font-medium text-3xl">Need help?</p>
              <p className="text-[#0A0A0A] font-medium">We’ve got you covered with email support </p>
              <div className="mb-4 flex items-center gap-1">
                <TbWorldWww className="inline mr-2 text-lg" />
                <a
                  href="https://www.elitecashflowproducts.com/"
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  www.elitecashflowproducts.com
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col item-left gap-2 pt-2">
            <h1 className="font-extrabold text-xl">Mailing address: </h1>
            <p className="text-[#0A0A0A] font-medium">Bishop Ranch 3</p>
            <p className="text-[#0A0A0A] font-medium">2603 Camino Ramon, Suite 200</p>
            <p className="text-[#0A0A0A] font-medium">San Ramon, CA 94583</p>
            <p className="text-[#0A0A0A] font-medium">USA</p>
          </div>
        </div>
        <div className="flex flex-col items-left mb-8">
          <h3 className="font-semibold mb-2">Company</h3>
          <ul className="space-y-2">
            {/* <li>
                <a href="/faqs" className="text-gray-700 hover:underline">
                  FAQs
                </a>
              </li> */}
            <li>
              <a href="/about-elite?page=advert" className="text-gray-700 hover:underline">
                About Elite
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
        <div className="flex flex-col items-left mb-8">
          <h3 className="font-semibold mb-2">Payment methods possible</h3>
          <div className="flex flex-wrap gap-2">
            {paymentMethod.map((pay, index) => (
              <img key={index} src={pay.link} alt={pay.name} className="w-10 h-6" />
            ))}
          </div>
        </div>
      </div>
      {/* Footer Bottom */}
      <div className="border-t mt-8 p-6 text-center flex flex-col sm:flex-row justify-between items-center">
        <p>{getPageCopyright('true')}</p>

        {/* Social Icons */}
        <div className="flex justify-center mt-4 sm:mt-0 space-x-4 text-gray-700">
          {/* <div className="rounded-full p-2 bg-black">
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
          </div> */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
