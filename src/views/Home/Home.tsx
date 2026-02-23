import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const userId = "123e4567-e89b-12d3-a456-426614174000";
export const Home = () => {
  const navigate = useNavigate();
  return (
    <main>
      <h1>Welcome user!</h1>
      <section> Prepare for workout </section>
      <Button onClick={() => navigate(`/workout-templates?userId=${userId}`)}>
        Workout templates
      </Button>
      <Button onClick={() => navigate(`/exercises?userId=${userId}`)}>
        Exercises
      </Button>
      <Button>Workout schedule (WIP)</Button>

      <section> Footer </section>
    </main>
  );
};
