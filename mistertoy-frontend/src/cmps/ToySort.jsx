import { useEffect, useState } from 'react'

export function ToySort({ sortBy, onSetFilter }) {
    const [sortByToEdit, setSortByToEdit] = useState({ ...sortBy })

    useEffect(() => {
        onSetFilter({ sortBy: sortByToEdit })
    }, [sortByToEdit])

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        setSortByToEdit(prevSort => ({
            ...prevSort,
            [field]: field === 'desc' ? -prevSort.desc : value,
        }))
    }

    return (
        <form className="toy-sort">
            <select name="type" value={sortByToEdit.type} onChange={handleChange}>
                <option value="">Sort by</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="createdAt">Date</option>
            </select>
            <label>
                <input
                    type="checkbox"
                    name="desc"
                    checked={sortByToEdit.desc < 0}
                    onChange={handleChange}
                />
                Descending
            </label>
        </form>
    )
}
