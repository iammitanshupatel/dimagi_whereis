import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./containers/Dashboard";
import Form from "./containers/Form";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/new-data" element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
