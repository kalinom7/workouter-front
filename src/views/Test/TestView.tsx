import { useNavigate } from "react-router-dom";

function TestView() {
    const navigate = useNavigate();
    return(
        <div>
            <h1>Test domain</h1>
            <button onClick={() => navigate('/test/exercise')}>exercise</button>
        </div>
        
    )
}

export default TestView;