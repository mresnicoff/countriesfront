import React from 'react'
import styles from "./Form.module.css"
import { connect } from 'react-redux';
import validation from "./validation";
import { filterbyContinent, filterSelectedCountries, orderCards } from "../redux/actions.js"
import axios from "axios";
export const Form = (props) => {
    const [selectedContinent, setSelectedContinent] =React.useState("") 
    const[selectedCountries, setSelectedCountries]=React.useState([])
    const[unSelectedCountries, setUnSelectedCountries]=React.useState([])
    const[tried,setTried]=React.useState(0)
    const [activity, setActivity] = React.useState({
      countries: [],
      name: '',
      difficulty: '',
      duration: '',
      season: '',
      })
    const [errors, setErrors] = React.useState({
      countries: ``,
      name: '',
      difficulty: '',
      duration: '',
      season: '',
      })
    const[to,setTo]=React.useState([])
    const handleRadio=(e)=>{setSelectedContinent(e.target.value)
        props.filterbyContinent(e.target.value)
        props.orderCards("AA")
        props.filterSelectedCountries(to)
        setSelectedCountries([])
    }
    const changeTo=()=>{
    setTo(to.concat(selectedCountries))
    setActivity({...activity,countries: to.concat(selectedCountries)})
    if(tried===1){setErrors(validation({...activity, countries: to.concat(selectedCountries) })) 
    props.filterSelectedCountries(selectedCountries) }

}
const changeBack=()=>{
  const filteredTo=to.filter(country =>!unSelectedCountries.includes(country))
  setActivity({...activity,countries:to})
  props.filterbyContinent(selectedContinent)
  props.orderCards("AA")
  props.filterSelectedCountries(filteredTo)
  if(tried===1){setErrors(validation({...activity, countries: filteredTo })) }
  setTo(filteredTo) 


}

    const handleSubmit = async(e) => {
        e.preventDefault();
        setTried(1)
        setErrors(validation(activity))
      console.log(errors)
      if (!validation(activity).countries && !validation(activity).difficulty && !validation(activity).duration && !validation(activity).name && !validation(activity).season){
   setTried(0)
      await axios
      .post(`http://localhost:3001/activities/`, activity)
   
  setActivity({...activity, name:"", season:"", duration:"", difficulty:"", countries:[]})
  setTo([])
  }}
      

        const changeActivity=(e)=>
        { setActivity({...activity,[e.target.name]: e.target.value })
        console.log(tried)
        if (tried===1){
      setErrors(validation({...activity,[e.target.name]: e.target.value })) 
     }}



    const handleSelectedCountries=(e)=>{
        const options=e.target.options
        const selected=[]
        for(let i=0;i<options.length;i++){
            if (options[i].selected && options[i].value!=="Nothing"){
                selected.push(options[i].value)

            }
        }
        setSelectedCountries(selected)
    }

    const handleUnSelectedCountries=(e)=>{
      const options=e.target.options
      const selected=[]
      for(let i=0;i<options.length;i++){
          if (options[i].selected && options[i].value!=="Nothing"){
              selected.push(options[i].value)

          }
      }
      setUnSelectedCountries(selected)
  }

  return (
<div>
      <h1>Create Activity</h1>
      <form onSubmit={handleSubmit}>

<div className={styles.container}>
              <label>Name</label>
              <input 
                type="text" 
                placeholder="Activity Name" 
                name="name" 
                onChange={changeActivity} 
                value={activity.name}/>
          <label>Difficulty</label>
          <select name="difficulty" onChange={changeActivity} value={activity.difficulty}>
          <option value="Select">Please select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <label>Season</label>
          <select name="season" onChange={changeActivity} value={activity.season}>
            <option value="Select">Please select</option>
            <option value="Winter">Winter</option>
            <option value="Spring">Spring</option>
            <option value="Summer">Summer</option>
            <option value="Autumm">Autumn</option>
          </select>
          <label>Duration</label>
          <input type="text" onChange={changeActivity} placeholder="duration in hours" name="duration" value={activity.duration}/>   
          </div>
          <div  className={styles.container}>
            <div width="40%"  className={styles.error}>     {errors.name && <div>{errors.name}</div> }</div>
            <div width="15%" className={styles.error}>     {errors.difficulty && <div >{errors.difficulty}</div> }</div>
            <div width="15%" className={styles.error}>     {errors.season && <div>{errors.season}</div> }</div>
            <div width="30%" className={styles.error}>     {errors.duration && <div>{errors.duration}</div> }</div>
          </div>
        <fieldset className={styles.container}>  
            <legend>Select a continent</legend>

        <div><input type="radio" id="Europe" name="continent" value="Europe" onChange={handleRadio} checked={selectedContinent==="Europe"} />
        <label for="Europe">Europe</label></div>    
        <div><input type="radio" id="Americas" name="continent" value="Americas" onChange={handleRadio} checked={selectedContinent==="Americas"} />
        <label for="Americas">Americas</label></div>
        <div><input type="radio" id="Antarctic" name="continent" value="Antarctic" onChange={handleRadio} checked={selectedContinent==="Antarctic"}/>
        <label for="Antartic">Antartic</label></div>   
        <div><input type="radio" id="Africa" name="continent" value="Africa" onChange={handleRadio} checked={selectedContinent==="Africa"}/>
        <label for="Africa">Africa</label></div>
        <div><input type="radio" id="Asia" name="continent" value="Asia"onChange={handleRadio} checked={selectedContinent==="Asia"}/>
        <label for="Asia">Asia</label></div>
        <div><input type="radio" id="Oceania" name="continent" value="Oceania"onChange={handleRadio} checked={selectedContinent==="Oceania"}/>
        <label for="Oceania">Oceania</label></div>

        </fieldset>
        <div className={styles.container}>
          <div className={styles.vertical} width="40%">
        <label style={styles.label}for="fROM">Select countries:</label>
        <select name="from" id="from" size="10" multiple value={selectedCountries} onChange={handleSelectedCountries}>
            {props.countries.length ? props.countries.map(country=> <option value={country.name}>{country.name}</option>):<option value="Nothing">Nothing here left!</option> }
        </select>
        </div>
        <div className={styles.vertical}  width="20%">
        <input className={styles.submit} type="button" onClick={changeTo} value={`>>`} />
        <input className={styles.submit} type="button" onClick={changeBack} value={`<<`} />
        </div>
        <div className={styles.vertical}  maxWidth="40%">
        <label for="to">Selected countries:</label>
        <select name="to" id="to" size="10"multiple value={unSelectedCountries} onChange={handleUnSelectedCountries}>
        {to.length ? to.map(country=> <option value={country}>{country}</option>): <option value="nothing">Nothing here yet!</option>}
        </select>
        </div>
        </div>
        <div className={styles.container} >
        <div width="70%"  className={styles.error}></div>
        <div width="30%" className={styles.error}>     {errors.countries && <div>{errors.countries}</div> }</div>
        </div>

        <input type="submit" value="Save Activity" className={styles.submit}/>
    </form>
    </div>
  )
}

export function mapDispatchToProps(dispatch) {
    return {

      orderCards: function(id) {
        dispatch(orderCards(id));
      },
      filterbyContinent: function(id) {
        dispatch(filterbyContinent(id));
      },
      filterSelectedCountries: function(countriesArray) {
        dispatch(filterSelectedCountries(countriesArray));
      },


    }
 
 }

 export function mapStateToProps(state) {
    return {
      countries: state.countries,
    };}

export default connect(mapStateToProps, mapDispatchToProps)(Form);