import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import TextInput from './components/text_input';
import Login from './components/login';
import Dashboard from './components/dashboard';
import Faqs from './components/faq';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <BrowserRouter>
    
           <Switch>
           <Route path="/" exact>
                <Faqs/>
            </Route>
            <Route path="/login" render={Login} />
               
           <Route path="/dashboard" >
                <Dashboard/>
           </Route>
           <Route path="/contact" >
                <TextInput/>
           </Route>
           </Switch>
           
     </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
