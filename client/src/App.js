import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./Components/Navbar";
import { Auth } from "./Pages/Authentication";
import { CreateRecipe } from "./Pages/Create";
import {Home} from './Pages/Home'
import { SavedRecipes } from "./Pages/Saved";
import { RecipePage } from "./Pages/RecipePage";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/:id" element={<RecipePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
