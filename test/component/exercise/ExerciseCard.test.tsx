import type { Exercise } from "@/types/ExerciseTypes";
import { globalUserId } from "@/utils/globalUserId";
import { ExerciseCard } from "@/views/Exercise/AllExercises/components/ExerciseCard";
import { expect, test } from "vitest";
import { render } from "vitest-browser-react";

test("should render ExerciseCard component with data", async () => {
  const exercise: Exercise = {
    id: crypto.randomUUID(),
    userId: globalUserId,
    name: "test exercise",
    description: "the description",
  };
  const screen = await render(
    <ExerciseCard exercise={exercise} onClick={() => {}} />,
  );

  await expect.element(screen.getByText("test exercise")).toBeVisible();
  await expect.element(screen.getByText("the description")).toBeVisible();
  await expect.element(screen.getByText("Difficulty level: ?")).toBeVisible();
  await expect.element(screen.getByText("Body part: ?")).toBeVisible();
});
