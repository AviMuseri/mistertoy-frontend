import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { Link, useParams } from "react-router-dom"

// const { useEffect, useState } = React
// const { Link, useParams } = ReactRouterDOM


export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => {

                setToy(toy)
            })
            .catch(err => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }
    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <h2>toy name : {toy.name}</h2>
            <h2>toy id : {toy._id}</h2>
            <h2>Price: ${toy.price}</h2>
            <h2>Labels:</h2>
            <ul className="label-list">
                {toy.labels.map(label => (
                    <li key={label}>
                        <h3 href="">{label}</h3>
                    </li>
                ))}
            </ul>
            <h2>In Stock:{toy.inStock ? ' Yes' : ' No'}</h2>
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
            <Link to={`/toy`}>Back</Link>
        </section>
    )
}