import { collection, DocumentData, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useQuiz } from "../../contexts/quiz-context";
import { db } from "../../firebase.config";
import "./leaderboard.css";

export const LeaderBoard = () => {
  const {
    quizState: { quizCategory },
  } = useQuiz();

  const [usersQuizData, setUsersQuizData] = useState<DocumentData[]>([]);
  let leaderBoardData = [...usersQuizData].sort(
    (a, b) => b.data[quizCategory]?.score - a.data[quizCategory]?.score
  );

  useEffect(() => {
    (async () => {
      const docRef = await getDocs(collection(db, "users"));
      docRef.forEach((doc) => {
        const id = doc.id;
        const data = doc.data();
        setUsersQuizData((prev) => [...prev, { id, data }]);
      });
    })();
  }, []);

  return (
    <div>
      <h1 className="text-center pt-1">{quizCategory} Leaderboard</h1>
      <table className="leaderboard-table">
        <thead className="thead">
          <tr className="tr">
            <th className="p-1">User</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderBoardData.map(({ id, data }, index) => {
            if (data[quizCategory]) {
              return (
                <tr key={index} className="tr">
                  <td className="p-1">{id}</td>
                  <td className="text-center">{data[quizCategory]?.score}</td>
                </tr>
              );
            }
            return "";
          })}
        </tbody>
      </table>
    </div>
  );
};
