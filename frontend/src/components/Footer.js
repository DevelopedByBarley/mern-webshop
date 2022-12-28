import '../styles/components/Footer.css'
import { AdminLoginButton } from "../components/AdminLoginButton";
import { BsFacebook, BsLinkedin, BsGithub } from 'react-icons/bs'

export function Footer() {
  return (
    <div className="footer">
      <div className='footer-content'>
        <h1 className='title'>Mern Webshop</h1>
        <p className='message'>
          Ez a weboldal munkakeresés céljából készült.
          Az oldal a jelenlegi tudásomat reprezentálja,
          a termékek és adatok csak illusztrációk, nem
          fedik a valóságot! Valós fizetés a weboldalon nem lehetséges!
          <br />
          <br />
          Köszönöm a megtekintést!
          <br />
          Ha esetleg valamelyik munkám megtetszett, az alábbi elérhetőségeken megtalál!


        </p>
        <div className='footer-icons'>
          <span><a href='https://www.facebook.com/arpad.szaniszlo.1'><BsFacebook className='icon' size={40} /></a></span>
          <span><a href=''><BsLinkedin className='icon' size={40} /></a></span>
          <span><a href='https://github.com/DevelopedByBarley'><BsGithub className='icon' size={40} /></a></span>
        </div>
      </div>
      <div className='admin-login'>
        <AdminLoginButton />
      </div>
    </div>
  )
}
