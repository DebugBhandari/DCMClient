import './index.css';
import User from './User';
import useZuStore from '../zuStore';

function Users() {
    const learners = useZuStore((state) => ( state.learners ));
    
   
    
    return (
        <div className="userPage">
         {learners && learners.map((learner) => (
            <div className="userDiv" key={learner.learner_id}>
          
         <User learner={learner}  /></div>
         ))}
       
        </div>
    )
    }

export default Users;