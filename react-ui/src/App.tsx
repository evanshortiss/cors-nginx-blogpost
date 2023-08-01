import reactLogo from './assets/react.svg'
import quarkusLogo from './assets/quarkus.svg'
import nginxLogo from './assets/nginx.svg'
import openshiftLogo from './assets/openshift.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useState } from 'react'

function App() {
  const [name, setName] = useState('Red Hat')

  async function request () {
    const url = new URL('/hello', window.location.origin)

    url.searchParams.set('name', name)
    
    try {
      const res = await fetch(url)
      const text = await res.text()
      alert(`Response: ${text}`)
    } catch (e: unknown) {
      alert(`Request Failed: ${e?.toString()}`)
    }
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://quarkus.io" target="_blank">
          <img src={quarkusLogo} className="logo quarkus" alt="Quarkus logo" />
        </a>
        <a href="https://nginx.com" target="_blank">
          <img src={nginxLogo} className="logo nginx" alt="NGINX logo" />
        </a>
        <a href="https://redhat.com/openshift" target="_blank">
          <img src={openshiftLogo} className="logo openshift" alt="OpenShift logo" />
        </a>
      </div>
      <h1>Vite, React, Quarkus, NGINX, and OpenShift CORS Example</h1>
      <p className="read-the-docs">
        Use the button below to perform a request to the Quarkus backend via NGINX. It will echo back the value in the text field.
      </p>
      <input type="text" autoComplete="off" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      <div className="card">
        <button onClick={() => request()}>
          API Request
        </button>
      </div>
      <small className="read-the-docs">
        Click on the logos to learn more!
      </small>
    </>
  )
}

export default App
