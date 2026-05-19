import { useGetAllExercises } from "@/api/exercise/hooks/useGetAllExercises";
import { ExercisesList } from "./components/ExercisesList";
import { globalUserId } from "@/utils/globalUserId";
import { CreateExerciseButton } from "./components/CreateExerciseButton";
import { ExercisesSearchBar } from "./components/ExercisesSearchBar";
import { Footer } from "@/views/Home/components/Footer";
import { useState } from "react";

export const AllExercisesView = () => {
  const { data, isLoading, isError } = useGetAllExercises(globalUserId);
  const [search, setSearch] = useState("");

  if (isError) return <>Error loading exercises.</>;
  if (isLoading || !data) return <>Loading...</>;

  const exercises = data;

  return (
    <>
      <div className="relative min-h-screen pb-28">
        <h1>Exercises</h1>
        <ExercisesSearchBar search={search} setSearch={setSearch} />
        <ExercisesList exercises={exercises} search={search} />
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2">
          <CreateExerciseButton />
        </div>
      </div>
      <Footer />
    </>
  );
};
