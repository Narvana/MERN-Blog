import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from 'react-redux'
import ThemeProvider from './component/ThemeProvider.jsx'
import {store, persistor} from './redux/store/store.js'
import {PersistGate} from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <PersistGate persistor={persistor}>
    <Provider store={store}>
     <ThemeProvider>
      <App />
     </ThemeProvider>
    </Provider>
  </PersistGate>
  
  // </React.StrictMode>,
)
