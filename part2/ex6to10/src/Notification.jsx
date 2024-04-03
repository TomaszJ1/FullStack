const Notification = ({ message, status }) => {
    if (message.length === 0) {
      return null
    }
  
    return (
      <div className={status === 0 ? 'error' : 'successful'}>
        {message}
      </div>
    )
  }

  export default Notification