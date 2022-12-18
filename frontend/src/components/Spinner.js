
export function Spinner({ color, size, isFullPage, SpinnerName }) {

  const spinnerStyle = {
    height: "80vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "-2rem"
  }

  return (
    <div className="spinner" style={isFullPage ? spinnerStyle : {}}>
      <SpinnerName
        color={color}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}
