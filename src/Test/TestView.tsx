import { useNavigate } from "react-router-dom";
import './TestView.css'

function TestView() {
    const navigate = useNavigate();
    return(
        <div>
            <h1>Test domain</h1>
            <h2>Choose a view to test:</h2>
            <button onClick={() => navigate('/test/exercise')}>exercise</button>
            <button onClick={() => navigate('/test/workout')}>workout</button>
            <button onClick={() => navigate('/test/workoutschedule')}>workout schedule</button>
            <button onClick={() => navigate('/test/workouttemplate')}>workout template</button>

        </div>
        
    )
}

export default TestView;