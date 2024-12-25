import React from 'react';
import Logo from '../images/Logo.png';

const Footer = () => {
  return (
    <div>
      <footer className="bg-blue-600 text-white p-6 rounded-lg shadow dark:bg-gray-900  ">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
              <img
                src={Logo}
                alt="News Logo"
                className="w-20 h-20"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">News</span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0 dark:text-gray-400">
              <li>
                <a href="/uzb" className="hover:underline me-4 md:me-6">O'zbek</a>
              </li>
              <li>
                <a href="/jhn" className="hover:underline me-4 md:me-6">Jahon iqtisodiyot</a>
              </li>
              <li>
                <a href="/sprt" className="hover:underline">Sport</a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        </div>
      </footer>
    </div>
  );
}

export default Footer;
