import ReactDOM from 'react-dom/client'
import { attachReduxDevTools } from '@effector/redux-devtools-adapter'

import { App } from '@/app/App'
import { appStarted } from '@/shared/config/init'

const root = ReactDOM.createRoot(document.querySelector('#root')!)

appStarted()
attachReduxDevTools()

root.render(<App />)
