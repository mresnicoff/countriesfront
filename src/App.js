import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { React, useEffect, useState } from "react";
import Footer from "./components/Footer.jsx";
import Detail from "./components/Detail.jsx";
import Form from "./components/Form.jsx";

import HomePage from "./components/HomePage.jsx";
import Cards from "./components/Cards.jsx";
import NavBar from "./components/NavBar.jsx";
import Error from "./components/Error.jsx";
import { connect } from "react-redux";
import { getCountries, orderCards, getActivities } from "./redux/actions";

export function App(props) {
  const [filters,setFilters]= useState({activity:"Rs",name:"", continent:"Rs",sort:"Rs" })
  function filterApp(filter,value){
    if(filter==="continent"){
      setFilters({activity:"Rs", name:"",continent:value})
    }
    if(filter==="activity"){
      setFilters({...filters, activity:value, name:"",continent:"Rs"})
    }
    if(filter==="name"){
      setFilters({...filters, activity:"Rs", name:value,continent:"Rs"})
    }
    if(filter==="name"){
      setFilters({...filters, activity:"Rs", name:value,continent:"Rs"})
    }
    if(filter==="sort"){
      setFilters({...filters, sort:value})
    }

  }
  const location=useLocation()
  useEffect(() => {
  props.getCountries();
  props.orderCards("AA");
 props.getActivities();
  }, []);

  return (
    <div>

        {location.pathname!=="/" &&<NavBar/>}
      <Routes>
        <Route exact path="/" element={<HomePage />} />

        <Route path="/countries"element={
            <Cards
              countries={props.countries}
              pages={props.pages}
              activePage={props.activePage}
              activities={props.activities}
              getActivities={props.getActivities}
              getCountries={props.getCountries}
              filters={filters}
              filterApp={filterApp}
            />
          }
        />
        <Route path="/newactivity" element={<Form />} />
        <Route path="/countries/detail/:id" element={<Detail />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export function mapDispatchToProps(dispatch) {
  return {
    getCountries: function (userData) {
      dispatch(getCountries(userData));
    },
    orderCards: function (id) {
      dispatch(orderCards(id));
    },
    getActivities: function () {
      dispatch(getActivities());
    },
  };
}
export function mapStateToProps(state) {
  return {
    countries: state.visibleCountries,
    pages: state.pages,
    activePage: state.activePage,
    activities: state.activities
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
