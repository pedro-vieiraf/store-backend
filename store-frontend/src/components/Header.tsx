import { Link } from "react-router-dom";

function Header() {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/products">Store</Link></li>
                    <li><Link to="/cart">Shopping Cart</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;