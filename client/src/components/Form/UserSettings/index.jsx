import React, { useState, useEffect } from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import AveragePeriod from './AveragePeriod'
import Weighting from './Weighting'
import { updateSettings, getSettings } from '../../../services/userService'

export function UserSettings({ user }) {
  const [key, setKey] = useState('AveragePeriod');
  const [fastSMA, setFastSMA] = useState();
  const [slowSMA, setSlowSMA] = useState();
  const [lookback, setLookback] = useState();
  const [weightObject, setWeightObject] = useState();
  const [currentUserSettings, setcurrentUserSettings] = useState();
  const [SMAError, setSMAError] = useState();
  const [weightError, setWeightError] = useState();

  useEffect(() => {
    try {
      getSettings(user.email).then((loadUserSettings) => {
        if (!weightObject) {
          setFastSMA(loadUserSettings.fastSMA);
          setSlowSMA(loadUserSettings.slowSMA);
          setLookback(loadUserSettings.lookback);
          setWeightObject({
            fastWeight: loadUserSettings.fastWeight,
            slowWeight: loadUserSettings.slowWeight,
            fastToSlowWeight: loadUserSettings.fastToSlowWeight,
            MACDWeight: loadUserSettings.MACDWeight,
            ADXWeight: loadUserSettings.ADXWeight
          })
          setcurrentUserSettings(
            {
              fastSMA: loadUserSettings.fastSMA,
              slowSMA: loadUserSettings.slowSMA,
              lookback: loadUserSettings.lookback,
              fastWeight: loadUserSettings.fastWeight,
              slowWeight: loadUserSettings.slowWeight,
              fastToSlowWeight: loadUserSettings.fastToSlowWeight,
              MACDWeight: loadUserSettings.MACDWeight,
              ADXWeight: loadUserSettings.ADXWeight
            }
          )
        }
      })
    } catch (ex) { }
  }, [user])

  const handleSave = () => {
    const userSettings = { ...weightObject, "fastSMA": fastSMA, "slowSMA": slowSMA, "lookback": lookback }
    updateSettings(user.email, userSettings);
  }

  const handleWeightChange = (newWeightObject) => {
    setWeightObject(newWeightObject);
  }

  const handleFastSMAChange = (newFastSMA) => {
    setFastSMA(newFastSMA);
  }

  const handleSlowSMAChange = (newSlowSMA) => {
    setSlowSMA(newSlowSMA);
  }

  const handleLookbackChange = (newLookback) => {
    setLookback(newLookback);
  }

  const handleSMAError = (newError) => {
    setSMAError(newError);
  }

  const handleWeightError = (newError) => {
    setWeightError(newError);
  }

  return (
    <React.Fragment>
      <Row className="align-items-center">
        <Col className="col-sm-auto">
          <h1>User Settings</h1>
        </Col>
        <Col>
          {!SMAError && !weightError && < button className="btn btn-primary" onClick={handleSave}>Save User Options</button>}
          {(SMAError || weightError) && <button className="btn btn-danger" disabled={true}>Save User Options</button>}
        </Col>
      </Row>
    <Tabs
      id='controlled-tab-example'
      activeKey={key}
      onSelect={k => setKey(k)}
    >
      <Tab eventKey='AveragePeriod' title='Average Period (Weekly)'>
        <AveragePeriod user={currentUserSettings} onFastSMAChange={handleFastSMAChange} onSlowSMAChange={handleSlowSMAChange} onLookbackChange={handleLookbackChange} onError={handleSMAError} />
      </Tab>
      <Tab eventKey='Weighting' title='Weighting (%)'>
        <Weighting user={currentUserSettings} onWeightChange={handleWeightChange} onError={handleWeightError} />
      </Tab>
    </Tabs>
    </React.Fragment >
  )
}
