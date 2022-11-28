import PuffLoader from "react-spinners/PuffLoader";


export function Spinner() {

  const spinnerStyle =  {
    height: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "-2rem"
  }

  return (
    <div className="spinner" style={spinnerStyle}>
      <PuffLoader
        color={"#9b3b40"}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}