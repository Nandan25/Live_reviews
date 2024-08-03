import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import ListReviews from './pages/ListReviews';
import Review from './pages/Review';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ListReviews />} />
        <Route path="/add-review" element={<Review type={'New'} />} />
        <Route path="/modify-review/:id" element={<Review type={'Edit'} />} />
      </Routes></BrowserRouter>

  );
}

export default App;
