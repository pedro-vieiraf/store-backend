import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="fixed top-0 left-0 w-full shadow-lg z-50">
            <nav className="bg-eeire-black-200 px-6 py-3">
                <div className="container mx-auto flex justify-center items-center">
                    <ul className="flex flex-row gap-10 text-lg font-semibold">
                        <li>
                            <Link
                                to="/products"
                                className="text-saffron-200 hover:text-white hover:bg-saffron-500 px-3 py-1 rounded transition duration-300"
                            >
                                Store
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/cart"
                                className="text-saffron-200 hover:text-white hover:bg-saffron-500 px-3 py-1 rounded transition duration-300"
                            >
                                Shopping Cart
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/profile"
                                className="text-saffron-200 hover:text-white hover:bg-saffron-500 px-3 py-1 rounded transition duration-300"
                            >
                                Profile
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;