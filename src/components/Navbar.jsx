import { Footer } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/Logo.png";

export function Navbar() {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/All/${category}`);
  };

  return (
    <Footer container className="bg-blue-600 text-white p-6">
      <div className="w-full">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">

          <Link to="/" className="flex items-center mb-4 sm:mb-0">
            <img src={Logo} alt="News Logo" className="w-20 h-20" />
            <span className="ml-2 text-lg font-bold">News</span>
          </Link>

          <Link to="/newCr" className="mt-4 sm:mt-0 sm:ml-4 ">
            <button
              type="button"
              className="  text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Maqola qo‘shish +
            </button>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {["Uzb", "Jxn", "Spt"].map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(category)}
                className="text-white hover:text-gray-200 transition-colors duration-200"
              >
                {category === "Uzb" && "O'zbek"}
                {category === "Jxn" && "Jahon iqtisodiyot"}
                {category === "Spt" && "Sport"}
              </button>
            ))}
            <Link to="/login">
              <button
                type="button"
                className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Login
              </button>
            </Link>
            
            <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 rounded-full"
              src="https://icons8.com/icon/23265/user"
              alt="userPhoto"
            />
          </button>
          <div
            className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
            id="user-dropdown"
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">
                Bonnie Green
              </span>
              <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                name@flowbite.com
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Earnings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        
      
          </nav>

        </div>


        <nav className="fixed z-50 bottom-0 left-0 w-full bg-blue-700 text-white flex items-center justify-around px-4 py-3 md:hidden shadow-md">
          {["Uzb", "Jxn", "Spt"].map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(category)}
              className="flex flex-col items-center"
            >
              <img
                className="w-6 h-6 transition-transform duration-200 hover:scale-110"
                src={
                  category === "Uzb"
                    ? "https://th.bing.com/th?id=OIP.Fwwc8Cp-5P7Gm87zsVjhXwHaFj&w=288&h=216&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
                    : category === "Jxn"
                    ? "https://th.bing.com/th/id/OIP.Tp1ymy-58K9OzhLaCND7zAHaH5?rs=1&pid=ImgDetMain"
                    : "https://th.bing.com/th?id=OIP.f_V3BIGWyq4LAgZdZ5X9ZAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
                }
                alt={category}
              />
              <span className="text-xs">
                {category === "Uzb" && "O'zbek"}
                {category === "Jxn" && "Jahon"}
                {category === "Spt" && "Sport"}
              </span>
            </button>
          ))}
      
        </nav>


        <Footer.Divider className="my-6 border-gray-400" />


        <Footer.Copyright
          href="/"
          by="News™"
          year={2024}
          className="text-gray-200 text-center"
        />
      </div>
    </Footer>
  );
}
