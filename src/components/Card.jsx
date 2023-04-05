
import { connect } from 'react-redux';
import React, {useState, useEffect} from "react"
import styles from './Card.module.css'
import {Link} from "react-router-dom"
export function Card(props) {
   return (
      <Link to={`/countries/detail/${props.id}`} className={styles.card} >
            
    <div className={styles.truncate}>{props.name}</div>
    <div>
         <img className={styles.flag} src={props.flag} alt="img not found" />

            {props.continent}
            </div>
         </Link>
   );
}



export default connect(null, null)(Card);