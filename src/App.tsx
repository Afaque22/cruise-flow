import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "./pages/Home";
import { SearchResults } from "./pages/SearchResults";
import { CruiseDetails } from "./pages/CruiseDetails";
import { CabinSelection } from "./pages/CabinSelection";
import { Checkout } from "./pages/Checkout";
import { BookingConfirmation } from "./pages/BookingConfirmation";
import About from "./pages/About";
import Support from "./pages/Support";
import Destinations from "./pages/Destinations";
import Deals from "./pages/Deals";
import { ScrollToTop } from "./components/layout/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/search" element={<SearchResults />} />

        <Route path="/cruises/:cruiseId" element={<CruiseDetails />} />

        <Route path="/cruises/:cruiseId/cabin" element={<CabinSelection />} />

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        <Route path="/about" element={<About />} />
        <Route path="/support" element={<Support />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/deals" element={<Deals />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
