import { Link } from "react-router-dom";
import "./Home.css";

function Home() {

    return (
        <div className="home">

            <section className="hero-section">

                <h1>
                    Welcome to Ecommerce Store
                </h1>

                <p>
                    Discover the latest products at the best prices.
                </p>

                <Link
                    to="/products"
                    className="shop-btn"
                >
                    Shop Now
                </Link>

            </section>

            <section className="features-section">

                <div className="feature-card">
                    🚚
                    <h3>Fast Delivery</h3>
                    <p>
                        Quick and reliable shipping.
                    </p>
                </div>

                <div className="feature-card">
                    🔒
                    <h3>Secure Payments</h3>
                    <p>
                        Razorpay powered checkout.
                    </p>
                </div>

                <div className="feature-card">
                    ⭐
                    <h3>Quality Products</h3>
                    <p>
                        Carefully selected products.
                    </p>
                </div>

            </section>

        </div>
    );
}

export default Home;