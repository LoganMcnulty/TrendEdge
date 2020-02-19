import React, { useState } from 'react'
import  { OptionsTable } from 'components'
import Paper from '@material-ui/core/Paper'
import $ from 'jquery'
import { apiUrl } from '../../config.json'
import http from '../../services/httpService'


export const ActiveOptions = () => {
  const style = {
    jumbotron: {
      background: "#3f51b5",
      backgroundSize: "cover",
      backgroundColor: "#4682B4",
      marginBottom: "0"
    }
  }
  const [optionsData, setOptionsData] = useState()
  const [searchTerm, setSearchTerm] = useState()
  const [searchTermConst, setSearchTermConst] = useState()

  const handleOptionSearch = (e) => {
    e.preventDefault();
    try {
      let apiEndpoint = apiUrl + '/optionsPull/' + searchTerm;
      http.get(apiEndpoint).then(({data}) => {
      console.log(data)
      setOptionsData(data)
      })
      setSearchTermConst(searchTerm.toUpperCase())
      $(".search_input").val("")
    } catch (err) {
      alert('stock ticker not found - ' + err)
    }
  }

  return (
    <>
      <div className="jumbotron" style={style.jumbotron}>
        <div className="container for-about">
        <h1 style={{textAlign:"center", color:"white"}}>Active Options Dashboard</h1>
        </div>
      </div>

      <div className="container">
        <div className="d-flex justify-content-center h-100" style={{padding:"2%"}}>
          <div className="searchbar">
            <input onChange={e => {
              setSearchTerm(e.target.value)
              }} className="search_input" type="text" name="" placeholder="Search..." />
            <a onClick={handleOptionSearch} href="#" className="search_icon"><i className="fas fa-search"></i></a>
          </div>
        </div>
      </div>

      <div className="container">
        <Paper elevation={6} style={{ marginBottom: '2%', paddingTop:"2%" }}>
          <div className="row justify-content-around">
            <div className="col-lg-10">
              { !optionsData ? 
              <>
              <h2 style={{textAlign:"center"}}>Enter a ticker to see today's most actively traded options</h2>
              <br></br>
              <h6 style={{textAlign:"center", fontStyle:"italic"}}>This feature is unavailable outside of options market hours</h6>
              <h6 style={{textAlign:"center", fontStyle:"italic"}}>If no results are returned during market hours, the ticker may be illiquid, or not yet actively trading for the day</h6>
              </>
              :
              <>
              <h1 style={{textAlign:"center"}}>{searchTermConst}</h1>
              <OptionsTable optionsData={optionsData}/>
              </>
              } 
            </div>
          </div>
        </Paper>
      </div>
    </>
    )
  }




  