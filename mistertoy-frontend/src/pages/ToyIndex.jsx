import { useSelector } from 'react-redux'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, saveToy } from '../store/actions/toy.actions.js'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export function ToyIndex() {

    const toys = useSelector(storeState => storeState.toyModule.toys)
    const [filterBy, setFilterBy] = useState(toyService.getDefaultFilter())
    const navigate = useNavigate()


    useEffect(() => {
        loadToys(filterBy)
            .catch(err => {
                showErrorMsg('Cannot load toys!')
            })
    }, [filterBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    function onAddToy() {
        const toyToSave = toyService.getRandomToy()
        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy added (id: ${savedToy._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot add toy')
            })
    }


    return (
        <div>
            <h3>Toys App</h3>
            <main>
                <Link to="/toy/edit">Add Toy</Link>
                <button className='add-btn' onClick={onAddToy}>Add Random Toy ⛐</button>
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                <ToyList
                    toys={toys}
                    onRemoveToy={onRemoveToy}
                />
                <hr />
            </main>
        </div>
    )
}

