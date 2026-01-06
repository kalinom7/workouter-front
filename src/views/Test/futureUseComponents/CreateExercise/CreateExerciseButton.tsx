import CreateExerciseModal from "./CreateExerciseModal";
import { useState } from "react";
import {testUserId} from "../../testUserId";

type CreateExerciseData = {
  name: string;
  description?: string;
};

function CreateExerciseButton() {
    const [showModal, setShowModal] = useState(false);

    const handleClick = () =>{
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleSubmitModal = async (data: CreateExerciseData) => {
    try {
      const response = await fetch(
        `http://localhost:3000/exercises?userId=${testUserId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create exercise");
      }

      const createdExercise = await response.json();
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