import {createRoot} from 'react-dom/client'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import MainPage from './js/components/MainPage.tsx'
import PrivacyTermsPage from './js/components/PrivacyTermsPage.tsx'
import './css.tsx'
import Config from "./js/utils/Config.tsx"
import {GlobalProvider} from "./js/utils/GlobalProvider.tsx";

createRoot(document.getElementById('root')!).render(
    <GlobalProvider>
        <Router>
            <Routes>
                <Route path={Config.urls.main} element={<MainPage/>}/>
                <Route path={Config.urls.policy} element={<PrivacyTermsPage/>}/>
            </Routes>
        </Router>
    </GlobalProvider>
)