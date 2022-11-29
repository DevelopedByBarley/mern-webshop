
export function Toast({setToastActive, toastMessage, duration, color}) {
  
  setTimeout(() => {
    setToastActive(false)
  },duration)

  const toastStyle = {
    background: color,
    width: "20%",
    padding: "1rem",
    position: "fixed",
    top: "15%",
    right: "-6px",
    color: "white",
    borderRadius: "20px" 
  }

  return (
    <div className="toast" style={toastStyle}>
      <h1>{toastMessage}</h1>
    </div>
  )
  
}