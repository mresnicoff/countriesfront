import React from 'react'
import Card from './Card.jsx';
import Paginator from './Paginator.jsx'
import styles from './Cards.module.css'
import SearchBar from "./SearchBar.jsx";
import { useDispatch } from 'react-redux';
import {orderCards, filterbyContinent, filterbyActivity} from "../redux/actions.js"

const Cards = (props) => {
  React.useEffect(() => {
   props.getActivities();
    }, []);
  const [sort,setSort]=React.useState(props.filters.sort)
  const [clearSearchName,setClearSearchName]=React.useState("No borrar")
  const [filterContinent,setFilterContinent]=React.useState(props.filters.continent)
  const [chosenActivity,setChosenActivity]=React.useState(props.filters.activity)
  const dispatch = useDispatch()
function ordenar(e){
  setSort(e.target.value) 
  props.filterApp("sort", e.target.value)
  dispatch(orderCards(e.target.value))}

  function filtrar(e){
  setFilterContinent(e.target.value)
  props.filterApp("continent", e.target.value)
  setClearSearchName("Rs")
  setChosenActivity("Rs")
  dispatch(filterbyContinent(e.target.value))}
  
  const resetSearchbar=()=>{
    setClearSearchName("")
  }
function filtrerActivity(e){
  setChosenActivity(e.target.value)
  props.filterApp("activity", e.target.value)
  setClearSearchName("Rs")
  setFilterContinent("Rs")
  dispatch(filterbyActivity(e.target.value))
}
const resetAllFilters=(input)=>{
props.filterApp("name", input)
}
  return (
    <div className={styles.master}>
      <h3>Select Countries</h3>
      <div className={styles.filters}>
      <SearchBar passedValue={props.filters.name} clearSearch={clearSearchName} resetSearchbar={resetSearchbar} resetAllFilters={resetAllFilters} />
      <label >or Filter by Continent:</label>
    <select onChange={filtrar} value={filterContinent} name="FilterC" id="FilterC">
    <option value="Africa">Africa</option>
    <option value="Americas">Americas</option>
    <option value="Antarctic">Antarctic</option>
    <option value="Asia">Asia</option>
    <option value="Europe">Europe</option>
    <option value="Oceania">Oceania</option>
    <option value="Rs">No Filter</option>
    </select>
    <label className="input texto">or Filter by Activity:</label>
    <select className="input" onChange={filtrerActivity} value={chosenActivity} name="FilterC" id="FilterC">
    {!props.activities.length ? <option value="nothing">No activities!</option> : <option value="Rs">No Filter</option>  }
    {props.activities.length && props.activities.map(activity=> <option value={activity.name}>{activity.name}</option>)}
    </select>

      </div>
    
     <div><label>Sorted by:</label>
    <select className="input" onChange={ordenar} value={sort} name="name" >
    <option value="AA" >A-Z</option>
    <option value="AD" >Z-A</option>
    <option value="PA" >Population Asc</option>
    <option value="PD" >Population Des</option>
    <option value="Rs">Not sorted</option>
    </select>
        </div>
<div className={styles.cards}>
    {props.countries.map(country => (
    <Card
    key={country.id}
    name={country.name}
    flag={country.flagImage}
    continent={country.continent}
    id={country.id}
    />))} </div>
<Paginator pages={props.pages} activePage={props.activePage}/>
  </div>
  
  )
}
export default Cards;
