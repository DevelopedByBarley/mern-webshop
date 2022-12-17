import '../styles/components/Modal.css'

export function Modal({ onApprove, onDecline, children }) {
  return (
    <div className="modal-container">
      <div className="modal-header">
        {children}
      </div>
      <div className="modal-button-container">
        <button onClick={onApprove}>Elfogad</button>
        <button onClick={onDecline}>Mégsem</button>
      </div>
    </div>
  )
}
