import { Link } from "react-router-dom";

export function ToyPreview({ toy, onRemoveToy }) {

    return (
        <article>
            <button onClick={() => onRemoveToy(toy._id)}>x</button>
            <h4>{toy.name}</h4>
            <h1>⛐</h1>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <h4 className={toy.inStock ? 'green' : 'red'}>
                In Stock:{toy.inStock ? ' Yes' : ' No'}
            </h4>
            <hr />
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp; | &nbsp;
            <Link to={`/toy/${toy._id}`}>Details</Link>

            <hr />

        </article>
    )
}