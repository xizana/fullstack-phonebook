import { React, useState, useEffect } from 'react'
import axios from 'axios'
import Display from './Display'
import Forms from './Forms'
import Alert from './Alert'

const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [persons, setPersons] = useState([{}])

  // this code deletes contanct information  

  const client = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/posts"
  });

  const handleDelete = (id) => {
    if (window.confirm(`Do you really want to delete ${persons.map(per => per.name)}?`)) {
      client.delete(`${id}`);
      setPersons(persons.filter((post) => { return post.id !== id; })
      );
    }

  };


  // this code sets setPersons state with db.json data

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons').then(response => setPersons(response.data)
      )
  }, [])

  // this code sets id for every name   
  // i have to fix it
  // i want to set next id value: {newId}
  // const [id, setId] = useState(1)
  // const newId = () => {
  //   setId(prevId => prevId + 1)
  // }

  console.log(persons)


  // this code filters names in searchbar

  const filtered = persons.filter((val) => {
    if (filter === "") {
      return ""
    } else if (val.name.toLowerCase().includes(filter.toLowerCase())) {
      return val
    }
  })

  const display = filtered.map((value, key) => {
    return <div key={key}>
      <h2 >{value.name}</h2>
      <h2>{value.number}</h2>
    </div >

  })

  // I need to display names from {persons} state 
  //  
  //       ||
  //       ||
  //       ||
  //       ||
  //     \\  //
  //      \\//
  //       \/
  //                       
  // personsMap displays names        ||
  // numebersMap displays numbers     ||
  //                                  ||
  //                                  ||
  //                                \\  //
  //                                 \\//
  //                                  \/

  const personsMap = persons.map(name => name.name)
  const numbersMap = persons.map(num => num.number)

  return (
    <div>
      <h2>Phonebook</h2>

      <Forms
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        filter={filter}
        setFilter={setFilter}
      />

      <h2>Numbers</h2>

      <Display
        persons={persons}
        personsMap={personsMap}
        numbersMap={numbersMap}
        filteredName={display}
        filter={filter}
        handleDelete={handleDelete}
      />

      <Alert
        personsMap={personsMap}
        numbersMap={numbersMap}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
    </div>
  )
}

export default App