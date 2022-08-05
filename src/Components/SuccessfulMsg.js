import React from "react";

export default function SuccsessfulMsg({ errorMessage }) {

    // this code does not work
    const successfulMessage = () => {
        if (errorMessage === null) {
            return null
        }
    }
    return (
        <div>
            {successfulMessage}
        </div>
    )
}