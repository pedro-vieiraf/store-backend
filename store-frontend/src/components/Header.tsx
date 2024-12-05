import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="fixed top-0 left-0 w-full shadow-lg z-50 bg-eeire-black-200">
          <nav className="px-6 py-3">
            <div className="container mx-auto flex items-center justify-between">
              {/* Botão de Login */}
              <Link
                to="/"
                className="text-saffron-200 text-2 font-bold"
              >
                Login
              </Link>
              
              {/* Links centralizados */}
              <ul className="flex flex-row gap-8 text-lg font-semibold">
                <li>
                  <Link
                    to="/products"
                    className="text-saffron-200 hover:text-white hover:bg-saffron-500 px-4 py-2 rounded-md transition duration-300"
                  >
                    Store
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cart"
                    className="text-saffron-200 hover:text-white hover:bg-saffron-500 px-4 py-2 rounded-md transition duration-300"
                  >
                    Shopping Cart
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="text-saffron-200 hover:text-white hover:bg-saffron-500 px-4 py-2 rounded-md transition duration-300"
                  >
                    Profile
                  </Link>
                </li>
              </ul>
              
              {/* Espaço vazio para balancear */}
              <div className="hidden sm:block w-12"></div>
            </div>
          </nav>
        </header>
    );
      
}

export default Header;