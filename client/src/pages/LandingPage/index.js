import React, { useEffect, useState } from 'react'
import CardMedia from '@material-ui/core/CardMedia'
import moneyImg from './img/money.png'
import Paper from '@material-ui/core/Paper'
import auth from '../../services/authService'

export function LandingPage() {

  const [userLogged, setUserLogged] = useState();

  useEffect(() => {
    try {
    const userData = auth.getCurrentUser()
    setUserLogged(userData)
  } catch (ex) {}
  }, [])

    return (
      <>
        {userLogged ? 
        
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
              <Paper elevation={6} style={{ marginTop: '2%', textAlign:"center", padding:"2%" }}>
                <h1>{`Welcome Back ${userLogged.email}`}!</h1>
                <div className="row justify-content-center" style={{marginTop:"2%"}}>
                  <div className="col-lg-8">
                  <h5>Use the navbar to the left to visit the TrendHealth Sector Page, or your Personal Watchlist</h5>
                  </div>
                </div>
                </Paper>
              </div>
            </div>
          </div>
        
        :

        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                  <Paper elevation={6} style={{ marginTop: '2%', textAlign:"center", padding:"2%" }}>
                      <h1>Welcome to Trend Health!</h1>

                        <div  className="row justify-content-around" style={{marginTop:"2%"}}>
                        <div className="col-lg-6">
                            <CardMedia src={moneyImg} component='img' title='money' style={{width:"60%", margin:"auto"}}/>
                          </div>

                          <div className="col-lg-6 ml-auto">
                            <div className="row justify-conent-around" style={{marginTop:"30%"}}>
                              <div className="col-lg-6">
                                <div>
                                <a href="/login"> <button type="button" className="btn btn-primary btn-lg btn-block">Login</button></a>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div>
                                  <a href="/signup"><button type="button" className="btn btn-primary btn-lg btn-block">Signup</button></a>
                                </div>
                              </div>
                            </div>
                          </div> 
        
                      </div>
                    </Paper>
                </div>
          </div>
        </div>
      }
      </>
    )
  }

