import React from 'react'
import styles from './Paginator.module.css'
import { gotoPage } from "../redux/actions.js"
import { connect } from 'react-redux';
export const Paginator = (props) => {
    const [paginas, setPaginas]= React.useState([])
    React.useEffect(() => {
        setPaginas(Array.from({ length:props.pages }, (v, i) => i))
},[props.pages])

    const textWidth=`${props.pages*4}%`
  return (
    <div className={styles.master}>          
        <div  className={styles.pagination}>
          {props.activePage>1 && <a onClick={()=>props.gotoPage(props.activePage-1)}>&laquo;</a>}
            {paginas.map(pagina=> <a onClick={()=>props.gotoPage(pagina+1)} className={props.activePage===pagina+1? styles.active:''} >{pagina+1}</a>)}
          {props.activePage<props.pages &&  <a onClick={()=>props.gotoPage(props.activePage+1)}>&raquo;</a> } 
          </div> <div className={styles.pagination}> <a onClick={()=>props.gotoPage(1)}>&laquo; &laquo; First Page</a> <a onClick={()=>props.gotoPage(props.pages)}>Last Page &raquo; &raquo; </a></div>
        
  </div>
  )
}
export function mapDispatchToProps(dispatch) {
    return {

      gotoPage: function(page) {
        dispatch(gotoPage(page));
      },

    }
 
 }

export default connect(null, mapDispatchToProps)(Paginator);