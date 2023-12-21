import { STORAGE } from './services/email.service';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';

import { EmailIndexPage } from './pages/EmailIndexPage';
import { EmailDetails } from './pages/EmailDetails';
import { useState } from 'react';

export function App() {
    const [emailFolder, setEmailFolder] = useState(STORAGE.EMAILS)
    return (
        <Router>

            <section className='main-app'>
                <header className="app-header">
                    <section className="container">
                        <h1>Bmail</h1>
                    </section>
                </header>
                
                <main className='container'>
                    <Routes>
                        <Route path="email/:id" element={ <EmailDetails emailFolder={emailFolder}/>}/>
                        <Route path='*' element={ <EmailIndexPage emailFolder={emailFolder} setEmailFolder={setEmailFolder}/>}/>
                    </Routes>
                </main>

                <footer>
                    <section className="container">
                        Mails 2023 &copy;
                    </section>
                </footer>
            </section>
        </Router>


    )
}

