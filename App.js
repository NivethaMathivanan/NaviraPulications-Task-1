

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";


import store from "./Component/Menubar/Store";
import LoginPage from "./Component/Menubar/Login/Login";
import NavioMUISidebar from "./Component/Menubar/MenuHead_Page";




export default function App() {
  return (
    <Provider store={store}>

      <Router>
        <Routes>
               <Route path="/*" element={<NavioMUISidebar />} />
          <Route path="/login" element={<LoginPage />} />

          
        </Routes>
      </Router>
    </Provider>
  );
}