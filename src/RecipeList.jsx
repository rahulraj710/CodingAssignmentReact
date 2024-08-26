import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
// import "./App.css";
import axios from "axios";

function RecipeList() {
  const [recipe, setRecipe] = useState([]);
  const navigate = useNavigate();

  const handleClick = (rec) => {
    navigate(`/recipe/`+ rec.id);
  };

  useEffect(() => {
    axios
      .get("http://3.139.71.205:8000/recipe")
      .then((res) => {
        console.log(res.data);
        setRecipe(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <ul className="ul">
      {recipe.map((rec) => (
        <li key={rec.id} onClick={() => handleClick(rec)}>{rec.title}</li>
      ))}
    </ul>
  );
}


export default RecipeList