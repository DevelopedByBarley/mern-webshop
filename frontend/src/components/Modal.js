

export  function Modal({onApprove, onDecline, message}) {
  return (
    <div className="modal-container">
      <div className="modal-header">
        <h1>{message}</h1>
        <button onClick={onApprove}>Elfogad</button>
        <button onClick={onDecline}>Mégsem</button>
      </div>
    </div>
  )
}
