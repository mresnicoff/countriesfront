
import styles from './NavBar.module.css'
import { NavLink } from "react-router-dom";

export default  function NavBar ()  {

  return (
  
<div className={styles.nav}>

      <NavLink className={({ isActive }) => (isActive ? styles.active : styles.inactive) }to="/countries">Countries</NavLink>
      <NavLink className={({ isActive }) => (isActive ? styles.active : styles.inactive) } to="/newActivity">Create Avtivity</NavLink>
</div>
)}

    

    
    
    

