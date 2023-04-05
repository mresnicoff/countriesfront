import {React, useEffect, useState}  from 'react'
import { onSearch } from "../redux/actions.js"
import { connect } from 'react-redux';
import styles from './SearchBar.module.css'

export const SearchBar = (props) => {
const [input,setInput]=useState(props.passedValue)


const  handleChange=(e)=> {
  const { value } = e.target
  setInput(value)}

  const handleKeyDown=(e)=>{
    if (e.key==="Enter"){
      props.resetAllFilters(input)
      props.onSearch(input)}
  }
  
  useEffect(() => {
console.log(props.clearSearch)
if(props.clearSearch==="Rs"){
  setInput("")
  props.resetSearchbar()}
    }, [props.clearSearch]);
  return (
    <div className="input">
      <label >Filter by name:</label>
    <input  type='search' 
            value={input}
            placeholder='Country name or part'  
            onKeyDown={handleKeyDown }
            onChange={handleChange} 
            className={props.error===1? styles.error:''}/>
 </div>
  )
}



export function mapDispatchToProps(dispatch) {

  return {

    onSearch: function(input) {
      dispatch(onSearch(input));
    },

  }

}
export function mapStateToProps(state) {
  return {
error:state.error
  }};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);