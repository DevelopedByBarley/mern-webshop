import ClipLoader from "react-spinners/ClipLoader";


export function ButtonSpinner( ) {



  return (
    <div className="spinner">
      <ClipLoader
        color={"#9b3b40"}
        size={34}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}