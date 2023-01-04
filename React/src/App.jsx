import { useState } from 'react'
import uContactLogo from './assets/icons/uContact.png'
import reactLogo from './assets/icons/react.svg'
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
        <img alt="uContactLogo" src={uContactLogo} width="40" />
        <h2 style={{'textAlign': 'center', flex: 1}}>
          uContact Form
        </h2>
        <img
          alt="reactLogo"
          src={reactLogo}
          width="40"
          style={{ marginLeft: 'auto' }}
        />
      </div>
      <Form interaction={interaction ? interaction : {}} />
    </>
  )
}

export default App
