import { toyService } from "../../services/toy.service.js";
import {
    ADD_TOY,
    REMOVE_TOY,
    SET_FILTER_BY,
    SET_IS_LOADING,
    SET_MAX_PAGE,
    SET_TOYS,
    UPDATE_TOY,
} from '../reducers/toy.reducer'
import { store } from '../store'

export function loadToys() {
    const { filterBy } = store.getState().toyModule

    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    return toyService
        .query(filterBy)
        .then(({ toys, maxPage }) => {
            store.dispatch({ type: SET_TOYS, toys })
            store.dispatch({ type: SET_MAX_PAGE, maxPage })
        })
        .catch(err => {
            console.log('toy action -> Cannot load toys')
            throw err
        })
        .finally(() => {
            setTimeout(() => {
                store.dispatch({ type: SET_IS_LOADING, isLoading: false })
            }, 350)
        })
}
export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY, toyId })
        })
        .catch(err => {
            console.log('toy action -> Cannot remove toy', err)
            throw err
        })
}

export function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    return toyService.save(toy)
        .then(savedToy => {
            store.dispatch({ type, toy: savedToy })
            return savedToy
        })
        .catch(err => {
            console.log('toy action -> Cannot save toy', err)
            throw err
        })
}

export function setFilterBy(filterBy = toyService.getDefaultFilter()) {
    store.dispatch({ type: SET_FILTER_BY, filterBy: filterBy })
}