import React from 'react'
import styles from './HomePage.module.css'
import flags from '../utils/flag.png'
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div><h1>Visite los países del mundo</h1>

    <figure>
      <img  className={`${styles.imgagen} ${styles.ltr} `}src={flags}/>
      <Link to={`/countries`}> <figcaption>Haga click para comenzar</figcaption></Link>
    </figure></div>
  )
}

export default HomePage