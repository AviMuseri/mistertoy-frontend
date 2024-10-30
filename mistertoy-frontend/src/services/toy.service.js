import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const TOY_KEY = 'toyDB'
const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
    'Outdoor', 'Battery Powered']

_createToys()

export const toyService = {
    query,
    getById,
    get,
    remove,
    save,
    getDefaultFilter,
    getRandomToy,
    getEmptyToy

}
// For Debug (easy access from console):
window.cs = toyService

function query(filterBy = {}) {
    return storageService.query(TOY_KEY)
        .then(toys => {
            if (filterBy.name) {
                const regExp = new RegExp(filterBy.name, 'i')
                toys = toys.filter(toy => regExp.test(toy.name))
            }

            if (filterBy.inStock !== 'all') {
                toys = toys.filter(toy => (filterBy.inStock === 'Yes' ? toy.inStock : !toy.inStock))
            }

            return toys
        })
}

function getById(toyId) {
    return storageService.get(TOY_KEY, toyId)
}

function get(toyId) {
    return storageService.get(TOY_KEY, toyId)
        .then(toy => {
            toy = _setNextPrevToyId(toy)
            return toy
        })
}

function remove(toyId) {
    return storageService.remove(TOY_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(TOY_KEY, toy)
    } else {
        return storageService.post(TOY_KEY, toy)
    }
}

function _createToys() {
    let toys = utilService.loadFromStorage(TOY_KEY)
    if (!toys || !toys.length) {
        toys = []
        const names = ['SnuggleSquad', 'CozyCritters', 'Hugger Heroes', 'BattleMasters', 'ArtLab Kids']
        for (let i = 0; i < 10; i++) {
            const name = names[utilService.getRandomIntInclusive(0, names.length - 1)]
            toys.push(_createToy(name, utilService.getRandomIntInclusive(80, 300)))
        }
        utilService.saveToStorage(TOY_KEY, toys)
    }
}

function getEmptyToy(price = 10, labels = ['Box game', 'Art'], inStock = true) {
    return { price, labels, inStock }
}

function _createToy(name, price, labels, inStock) {

    const toy = getEmptyToy(price, labels, inStock)
    toy.name = name
    toy._id = utilService.makeId()
    toy.createdAt = Date.now()
    return toy
}

function getDefaultFilter() {
    return { name: '', inStock: 'all', toyLabel: '' }
}

// TODO: make it random
function getRandomToy() {
    return {
        _id: 't101',
        name: 'Talking Doll',
        price: 123,
        labels: ['Doll', 'Battery Powered', 'Baby'],
        createdAt: 1631031801011,
        inStock: true,
    }
}