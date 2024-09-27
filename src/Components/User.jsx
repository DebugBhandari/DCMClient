import "./index.css";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useZuStore from "../zuStore";
import { axiosInstance } from "../../services/axiosService";
function User({ learner }) {
  const setActiveLearner = useZuStore((state) => state.setActiveLearner);
  const activeLearner = useZuStore((state) => state.activeLearner);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/api/now/table/sys_user/${learner.user_id}`)
      .then((res) => {setUsername(res.data.result.name), setLoading(false)});
  }, [learner.learner_id]);
  return (
    <div className="userContainer">
      {loading?<h3>Loading names...</h3>:<h3>{username}</h3>}
      {activeLearner.learner_id === learner.learner_id ? (
        <button className="activeButton">Active User</button>
      ) : (
        <button
          onClick={() =>
            setActiveLearner({
              learner_id: learner.learner_id,
              user_id: learner.user_id,
              name: username
            })
          }
        >
          Select User
        </button>
      )}
    </div>
  );
}
User.propTypes = {
  learner: PropTypes.object.isRequired
};
export default User;