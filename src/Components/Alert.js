import React from "react";

export default function Alert({ personsMap, numbersMap, newName, setNewName, newNumber, setNewNumber }) {

  // personsMap displays names        ||
  //                                  ||
  //                                  ||
  //                                  ||
  //                                \\  //
  //  Can't add same names with      \\//
  //  alertMessage function           \/

  const alertMessage = () => {
    if (personsMap.find(elem => elem === newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName("")
    }
  }
  // else if (numbersMap.find(num => num === newNumber)) {
  //     alert(`${newNumber} is already added to phonebook`)
  //     setNewNumber("")
  //   }
  return (
    <div>
      {alertMessage()}
    </div>
  )
}