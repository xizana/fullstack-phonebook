import React from "react";

export default function Display({ personsMap, numbersMap, filteredName, filter, persons, handleDelete }) {

    // this code displays all phonebook names if !filter
    // in allPersons variable button deletes contact information from db.json

    const allPersons = persons.map((value, key) => {
        return <div key={key}>
            <h2 >{value.name}</h2>
            <h2>{value.number}</h2>
            <button onClick={() => handleDelete(value.id)}>Delete</button>
        </div >
    })

    const displayPhonebook = filteredName ? filteredName : `${personsMap} ${numbersMap}`
    const allNames = filter ? "" : allPersons
    return (
        <div>
            {/* when !filter {allNames} phonebook is showing but 
                i have to fix this and show all names and numbers corectly
            */}
            <h2>{displayPhonebook}</h2>
            <h2>{allNames}</h2>

        </div>
    )
}