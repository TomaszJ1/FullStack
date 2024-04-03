const PersonForm = ({ handlePersonChange, handleNumberChange, addPerson }) => {
    return (
        <>
        <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handlePersonChange} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      </>
    )
}

export default PersonForm