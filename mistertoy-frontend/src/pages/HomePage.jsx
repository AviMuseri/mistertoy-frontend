
export function HomePage() {
    return (
        <div className="homepage">
            {/* Hero Section */}
            <section className="hero">
                <h1>Welcome to Joy Web Store!</h1>
                <p>Your one-stop shop for all things fun and joyful.</p>
                <button>Shop Now</button>
            </section>

            {/* Featured Products Section */}
            <section className="featured-products">
                <h2>Featured Products</h2>
                <div className="product-list">
                    <div className="product">Toy Car</div>
                    <div className="product">Building Blocks</div>
                    <div className="product">Plush Bear</div>
                    <div className="product">Puzzle Set</div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="categories">
                <h2>Shop by Category</h2>
                <div className="category-list">
                    <div className="category">Educational Toys</div>
                    <div className="category">Outdoor Fun</div>
                    <div className="category">Action Figures</div>
                    <div className="category">Creative Arts</div>
                </div>
            </section>
        </div>
    )
}