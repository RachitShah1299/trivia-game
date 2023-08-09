import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { QuizConfig } from "../stores/quizStore";

type QuizFormProps = {
  onSubmit: (formData: QuizConfig) => void;
}

const QuizForm = ({ onSubmit }: QuizFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the API
    axios
      .get("https://opentdb.com/api_category.php")
      .then((response) => {
        setCategories(response.data.trivia_categories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleFormSubmit = (data: any) => {
    const formData: QuizConfig = {
      category: Number(data.category),
      difficulty: data.difficulty,
    };

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-xl font-semibold mb-6">Quiz Configuration</h2>

      <div className="mb-6">
        <label htmlFor="category" className="block text-lg font-medium mb-2">
          Category
        </label>
        <select
          {...register("category")}
          id="category"
          className="bg-white border border-indigo-600 text-black text-base rounded-lg focus:ring-indigo-400 focus:border-indigo-400 block w-full p-2.5"
        >
          {categories.map((category: { id: number; name: string }) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="difficulty" className="block text-lg font-medium mb-2">
          Difficulty
        </label>
        <select
          {...register("difficulty")}
          id="difficulty"
          className="bg-white border border-indigo-600 text-black text-base rounded-lg focus:ring-indigo-400 focus:border-indigo-400 block w-full p-2.5"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className="w-full mt-4 bg-indigo-700 text-white text-lg uppercase font-semibold py-3 rounded-lg hover:bg-indigo-600 transition duration-300"
      >
        Start Quiz
      </button>
    </form>
  );
};

export default QuizForm;
