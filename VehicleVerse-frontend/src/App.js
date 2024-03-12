import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home';
import Rental from './rent';
import DetailsPage from './sell_details';
import RentalDetails from './rent_details';
import Visit from './visit_home';
import VisitRent from './visit_rent';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:username?" element={<Home />} />
          <Route path="/s/home" element={<Visit />} />
          <Route path="/details/:id" element={<DetailsPage />} />
          <Route path="/s/rental" element={<VisitRent />} />
          <Route path="/rental" element={<Rental />} />
          <Route path="/rental/:id" element={<RentalDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;