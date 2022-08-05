import React from "react";
import axios from "axios";

export default function Forms({ filter, setFilter, newName, setNewName, newNumber, setNewNumber, persons, setPersons }) {

  // this code adds names from input

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }
    setPersons([...persons, personObject])
    setNewName("")
    setNewNumber("")

    axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
      })

    // setNewName("")
    // setNewNumber("")
  }

  const handleChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const handleChange2 = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }


  const handleChange3 = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }

  return (
    <form>
      <div>
        filter shown with: <input value={filter}
          onChange={handleChange3}
        />
        <br />
        name: <input value={newName}
          onChange={handleChange}
        />
        <br />
        number: <input value={newNumber}
          onChange={handleChange2}
        />

      </div>
      <div>
        <button onClick={addPerson}>add</button>
      </div>
    </form>
  )
}