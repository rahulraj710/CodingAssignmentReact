import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import "./App.css";
import axios from "axios";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [newComment, setNewComment] = useState('');
  useEffect(() => {
    axios
      .get(`http://3.139.71.205:8000/recipe/${id}`)
      .then((res) => {
        console.log(res.data);
        setRecipe(res.data);
      })
      .catch((err) => console.log(err.message));
  }, [id]);


  const comment = {
    recipe_id: id,
    comment: newComment,
  };

  const handlePostComment = () => {
    // Implement Axios POST request to save new comment
    axios.post(`http://3.139.71.205:8000/comment/`, comment)
      .then((res) => {
        // Update comments state with the new comment
        const updatedRecipe = { ...recipe };
        updatedRecipe.comments_set = [...updatedRecipe.comments_set, res.data]; // Assuming the response includes the newly added comment
        setRecipe(updatedRecipe);
        setNewComment('');
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <p>
      {recipe.title}
      
      <div className="recipe-container">
      <div className="ingredients">
      <p>Ingredients:</p>
      <ul>
        {recipe.ingredients_set &&
          recipe.ingredients_set.map((ingredient, index) => (
            <li key={index}>
              {ingredient.item} - {ingredient.quantity}
            </li>
          ))}
      </ul>
      </div>
      <div className="image-placeholder">
      {/* <img className="placeholder-image" src="" alt=""/> */}
      <p className="alt-text">Image Coming Soon</p>
      </div>
      
      </div>
      <p>Steps:</p>
      <ol>
        {recipe.steps_set &&
          recipe.steps_set.map((step, index) => (
            <li key={index}>{step.description}</li>
          ))}
      </ol>
      <p>Comments</p>
      <ul className="no-bullet">
        {recipe.comments_set &&
          recipe.comments_set.map((comment, index) => (
            <li key={index}>{comment.comment}</li>
          ))}
      </ul>
      <p className="container">
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Write your comment..."
      />
      <button onClick={handlePostComment}>Post</button>
      </p>
    </p>
  );
}

export default RecipeDetail;
