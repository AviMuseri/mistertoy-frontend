import { useDispatch, useSelector } from 'react-redux'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, saveToy, setFilterBy } from '../store/actions/toy.actions.js'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SET_FILTER_BY } from '../store/reducers/toy.reducer.js'

export function ToyIndex() {

    const toys = useSelector(storeState => storeState.toyModule.toys)
    const maxPage = useSelector(storeState => storeState.toyModule.maxPage)
    const isLoading = useSelector(storeState => storeState.toyModule.flag.isLoading)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)


    const dispatch = useDispatch()

    useEffect(() => {
        console.log(filterBy)
        loadToys(filterBy).then()
            .catch(err => {
                showErrorMsg('Cannot load toys!', err)
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


    function onChangePageIdx(diff) {
        let newPageIdx = +filterBy.pageIdx + diff
        if (newPageIdx < 0) newPageIdx = maxPage - 1
        if (newPageIdx >= maxPage) newPageIdx = 0
        dispatch({ type: SET_FILTER_BY, filterBy: { pageIdx: newPageIdx } })
    }

    if (!toys) return <div>Loading...</div>
    return (
        <section className='toy-index'>
            <h3>Toys App</h3>
            <main>
                <Link to="/toy/edit">Add Toy</Link>
                <button className='add-btn' onClick={onAddToy}>Add Random Toy ⛐</button>
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                {!isLoading && <ToyList
                    toys={toys}
                    onRemoveToy={onRemoveToy}
                />}
                <hr />
            </main>
            <div className="pagination">
                <button onClick={() => onChangePageIdx(-1)} disabled={filterBy.pageIdx === 0}>
                    Previous
                </button>
                {filterBy.pageIdx + 1}
                <button onClick={() => onChangePageIdx(1)}>Next</button>
            </div>
        </section>
    )
}

