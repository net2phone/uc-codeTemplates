import { useState, useEffect } from 'react'
import uContactLogo from './assets/icons/uContact.png'
import reactLogo from './assets/icons/react.svg'
import Form from './components/Form'
import './css/header.css'
import { useIframe } from './utils';

function App() {
  const [interaction, setInteraction] = useState({})

  useEffect(() => {
    let init = async () => {
      let i = await useIframe().getInteraction();
      setInteraction({...i});
    }
    init();
  }, []);

  return (
    <>
      <div className="header">
        <img alt="uContactLogo" src={uContactLogo} width="40" />
        <h2 style={{'textAlign': 'center', flex: 1}}>
          {interaction.form ?
            interaction.form.split("/")[
              interaction.form.split("/").length - 2
            ]
            : 'uContact Form'}
        </h2>
        <img
          alt="reactLogo"
          src={reactLogo}
          width="40"
          style={{ marginLeft: 'auto' }}
        />
      </div>
      <Form interaction={interaction} />
    </>
  )
}

export default App
