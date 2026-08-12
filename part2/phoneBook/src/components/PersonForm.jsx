const PersonForm = ({ newName, handleInputName, newNumber, handleInputNumber, handleSubmit }) => {

    return(
        <form>
            <div>
                name: <input value={newName} onChange={handleInputName} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleInputNumber} />
            </div>
            <div>
                <button type="submit" onClick={handleSubmit}>add</button>
            </div>
        </form>
    )
}

export default PersonForm