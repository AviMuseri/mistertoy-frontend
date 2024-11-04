
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
                <h2>Shop by Labels</h2>
                <div className="category-list">
                    <div className="category">On wheels</div>
                    <div className="category">Box game</div>
                    <div className="category">Art</div>
                    <div className="category">Baby</div>
                    <div className="category">Doll</div>
                    <div className="category">Puzzle</div>
                    <div className="category">Outdoor</div>
                    <div className="category">Battery Powered</div>
                </div>
            </section>
        </div>
    )
}