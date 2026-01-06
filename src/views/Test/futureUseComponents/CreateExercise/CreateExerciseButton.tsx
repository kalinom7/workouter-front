import CreateExerciseModal from "./CreateExerciseModal";
import { useState } from "react";
import {testUserId} from "../../testUserId";
import type { CreateExercisePayload } from "../../../../types/Exercise";
import { ExerciseApi } from "../../../../api/Exercise/exercise.api";



function CreateExerciseButton() {
    const [showModal, setShowModal] = useState(false);

    const handleClick = () =>{
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleSubmitModal = async (payload: CreateExercisePayload) => {
    try {
      const createdExercise = await ExerciseApi.createExercise(testUserId, payload);      
      console.log(createdExercise);

      setShowModal(false);

    } catch (error) {
      console.error(error);
    }
  };

    return (
        <div>
        <button onClick={handleClick}>Create Exercise</button>
        {showModal && (
            <CreateExerciseModal 
                onClose={handleCloseModal} 
                onSubmit={handleSubmitModal} 
            />
        )}
        </div>
    )
}
export default CreateExerciseButton;