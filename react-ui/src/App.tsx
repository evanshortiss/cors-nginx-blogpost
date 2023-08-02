import reactLogo from './assets/react.svg'
import quarkusLogo from './assets/quarkus.svg'
import nginxLogo from './assets/nginx.svg'
import openshiftLogo from './assets/openshift.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useState } from 'react'

const UI_ROUTE_PREFIX = 'react-ui'
const BACKEND_ROUTE_PREFIX = 'quarkus-backend'
const ENDPOINT = '/hello'

function App() {
  const [name, setName] = useState('Red Hat')

  async function request (url: URL) {
    url.searchParams.set('name', name)

    try {
      const res = await fetch(url)
      const text = await res.text()
      alert(`Response from the HTTP API: ${text}`)
    } catch (e: unknown) {
      console.log(e)
      alert('Request to the HTTP API Failed. This is the expected outcome if it was a CORS request. Check the DevTools console for more details.')
    }
  }

  function sameOriginRequest () {
    request(new URL(ENDPOINT, window.location.origin))
  }

  function crossOriginRequest () {
    const { origin, hostname } = window.location

    if (hostname === 'localhost') {
      // Send the request directly to the Quarkus application instead of
      // routing through the Vite proxy
      request(new URL(ENDPOINT, 'http://localhost:8080'))
    } else {
      // When running on OpenShift, both the UI and backend are deployed into
      // the same namespace. We can infer the URL be replacing the prefix
      // portion, e.g react-ui-your-namespace.openshiftapps.com is transformed
      // into backend-your-namespace.openshiftapps.com becomes
      request(new URL(ENDPOINT, origin.replace(UI_ROUTE_PREFIX, BACKEND_ROUTE_PREFIX)))
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
        Use the button below to perform a request to the Quarkus HTTP API, either via NGINX (same-origin) or directly to the API (cross-origin).
      </p>
      <p className="read-the-docs">
        The HTTP API will echo back the value in the text field.
      </p>
      <input type="text" autoComplete="off" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      <div className="card">
        <button onClick={() => sameOriginRequest()}>
          Same-Origin Request
        </button>
        <button onClick={() => crossOriginRequest()}>
          Cross-Origin Request
        </button>
      </div>
      <small className="read-the-docs">
        Click on the logos to learn more!
      </small>
    </>
  )
}

export default App
