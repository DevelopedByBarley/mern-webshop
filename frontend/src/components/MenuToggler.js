import '../styles/components/MenuToggler.css'

export function MenuToggler({ setMenuToggle, isMenuToggle }) {

  return (
    <div className='menu-toggle' onClick={() => { setMenuToggle(!isMenuToggle) }}>
      <div className={`top-line ${isMenuToggle ? "active" : ""}`}></div>
      <div className={`bottom-line ${isMenuToggle ? "active" : ""}`}></div>
    </div>
  )
}
