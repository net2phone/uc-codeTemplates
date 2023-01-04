import { useState } from 'react'
import Form from './components/Form'
import './css/header.css'
import { useIframe } from './utils';

function App() {
  let interaction = null;
  let init = async () => {
    interaction = await useIframe().getInteraction();
  }
  return (
    <>
      <div className="header">
        <img alt="uContactLogo" src="./assets/icons/uContact.png" width="40" />
        <h2 style={{'textAlign': 'center', flex: 1}}>
          uContact Form
        </h2>
        <img
          alt="reactLogo"
          src="./assets/icons/react.svg"
          width="40"
          style={{ marginLeft: 'auto' }}
        />
      </div>
      <Form interaction={interaction ? interaction : {}} />
    </>
  )
}

export default App
