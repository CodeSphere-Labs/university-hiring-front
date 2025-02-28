import ReactDOM from 'react-dom/client'

import { App } from '@/app/App'
import { appStarted } from '@/shared/config/init'

const root = ReactDOM.createRoot(document.querySelector('#root')!)

appStarted()

root.render(<App />)
