import "./index.css";
import User from "./User";
import useZuStore from "../zuStore";
import { useEffect } from "react";

function Users() {
  // Rest of the code

  const learners = useZuStore((state) => state.learners);

  const setLearners = useZuStore((state) => state.setLearners);
  useEffect(() => {
    setLearners();
  }, []);

  return (
    <div className="userPage">
      {learners &&
        learners.map((learner) => (
          <div className="userDiv" key={learner.learner_id}>
            <User learner={learner} />
          </div>
        ))}
    </div>
  );
}

export default Users;
