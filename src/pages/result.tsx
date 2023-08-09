import { Link } from "react-router-dom";
import { useQuizScoreStore } from "../stores/scoreStore";

const Result = () => {
  const overallTestScore = useQuizScoreStore((state) => state.overallTestScore);

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Quiz Result</h2>
      <p className="text-lg">
        Overall Test Score: {overallTestScore[0]}/{overallTestScore[1]}
      </p>
      <Link
        to="/"
        className="mt-4 block w-full text-center bg-indigo-700 text-white text-lg uppercase font-semibold py-3 rounded-lg hover:bg-indigo-600 transition duration-300"
      >
        Start New Quiz
      </Link>
    </div>
  );
};

export default Result;
