import { describe, expect, test } from "vitest";
import { renderWithProviders } from "../../utils/renderWithProviders";
import { ExerciseView } from "@/views/Exercise/ExerciseView";
import { worker } from "../mocks/browser";
import { http, HttpResponse } from "msw";
import { globalUserId } from "@/utils/globalUserId";

const API_URL = import.meta.env.VITE_API_URL;

describe("ExerciseView", () => {
  describe("static", () => {
    test("should render exercise name and description after loading", async () => {
      const exerciseId = crypto.randomUUID();
      const screen = await renderWithProviders(<ExerciseView />, {
        route: `/exercise/${exerciseId}`,
        path: "/exercise/:id",
      });

      await expect
        .element(screen.getByRole("heading", { name: "Bench Press" }))
        .toBeVisible();

      await expect
        .element(screen.getByText("Flat barbell press for chest"))
        .toBeVisible();
    });

    test("should show error message when the request fails", async () => {
      const exerciseId = crypto.randomUUID();
      worker.use(
        http.get(`${API_URL}/exercises/:exerciseId`, () => {
          return HttpResponse.json(
            {
              message: "Exercise not found",
              status: 404,
              name: "NotFoundException",
            },
            { status: 404 },
          );
        }),
      );

      const screen = await renderWithProviders(<ExerciseView />, {
        route: `/exercises/${exerciseId}`,
        path: "/exercises/:id",
      });

      await expect
        .element(screen.getByText("Failed to load exercise."))
        .toBeVisible();
    });

    test("should show loading state while fetching data", async () => {
      const exerciseId = crypto.randomUUID();
      let releaseResponse: () => void;
      const gate = new Promise<void>((resolve) => {
        releaseResponse = resolve;
      });

      worker.use(
        http.get(`${API_URL}/exercises/:exerciseId`, async ({ params }) => {
          await gate;
          return HttpResponse.json({
            id: params.exerciseId,
            userId: globalUserId,
            name: "Bench Press",
            description: "Flat barbell press for chest",
          });
        }),
      );

      const screen = await renderWithProviders(<ExerciseView />, {
        route: `/exercises/${exerciseId}`,
        path: "/exercises/:id",
      });

      await expect
        .element(screen.getByTestId("exercise-skeleton"))
        .toBeVisible();

      releaseResponse!();

      await expect
        .element(screen.getByRole("heading", { name: "Bench Press" }))
        .toBeVisible();
      await expect
        .element(screen.getByTestId("exercise-skeleton"))
        .not.toBeInTheDocument();
    });
  });
  describe("editing", () => {
    test("should reveal inputs pre-filled with current values after clicking Edit", async () => {
      const exerciseId = crypto.randomUUID();
      const screen = await renderWithProviders(<ExerciseView />, {
        route: `/exercises/${exerciseId}`,
        path: "/exercises/:id",
      });

      await expect
        .element(screen.getByRole("heading", { name: "Bench Press" }))
        .toBeVisible();
      await screen.getByRole("button", { name: "Edit" }).click();

      await expect
        .element(screen.getByTestId("exercise-name-input"))
        .toHaveValue("Bench Press");
      await expect
        .element(screen.getByTestId("exercise-description-input"))
        .toHaveValue("Flat barbell press for chest");
    });
    test("should revert changes without saving when clicking Cancel", async () => {
      const exerciseId = crypto.randomUUID();
      const screen = await renderWithProviders(<ExerciseView />, {
        route: `/exercises/${exerciseId}`,
        path: "/exercises/:id",
      });

      await expect
        .element(screen.getByRole("heading", { name: "Bench Press" }))
        .toBeVisible();
      await screen.getByRole("button", { name: "Edit" }).click();

      const nameInput = screen.getByTestId("exercise-name-input");
      await nameInput.fill("Changed Name");
      await screen.getByRole("button", { name: "Cancel" }).click();

      await expect
        .element(screen.getByRole("heading", { name: "Bench Press" }))
        .toBeVisible();
      await expect
        .element(screen.getByText("Changed Name"))
        .not.toBeInTheDocument();
    });

    test("should show the new value immediately via optimistic update when saving", async () => {
      type UpdateExerciseBody = {
        name: string | undefined;
        description: string | undefined;
      };

      worker.use(
        http.patch<{ exerciseId: string }, UpdateExerciseBody>(
          `${API_URL}/exercises/:exerciseId`,
          async ({ request, params }) => {
            const body = await request.json();
            return HttpResponse.json({
              id: params.exerciseId,
              userId: globalUserId,
              ...body,
            });
          },
        ),
      );

      const exerciseId = crypto.randomUUID();
      const screen = await renderWithProviders(<ExerciseView />, {
        route: `/exercises/${exerciseId}`,
        path: "/exercises/:id",
      });

      await expect
        .element(screen.getByRole("heading", { name: "Bench Press" }))
        .toBeVisible();
      await expect
        .element(screen.getByText("Flat barbell press for chest"))
        .toBeVisible();
      await screen.getByRole("button", { name: "Edit" }).click();

      const nameInput = screen.getByTestId("exercise-name-input");
      await nameInput.fill("Incline Bench Press");

      let releaseInvalidate: () => void;
      const invalidateGate = new Promise<void>((resolve) => {
        releaseInvalidate = resolve;
      });
      worker.use(
        http.get(`${API_URL}/exercises/:exerciseId`, async ({ params }) => {
          await invalidateGate;
          return HttpResponse.json({
            id: params.exerciseId,
            userId: globalUserId,
            name: "Incline Bench Press",
            description: "Flat barbell press for chest",
          });
        }),
      );

      await screen.getByRole("button", { name: "Save" }).click();

      await expect
        .element(screen.getByText("exercise edited succesfully"))
        .toBeVisible();

      await expect
        .element(screen.getByRole("heading", { name: "Incline Bench Press" }))
        .toBeVisible();
      await expect
        .element(screen.getByText("Flat barbell press for chest"))
        .toBeVisible();

      releaseInvalidate!();
    });

    test("should roll back to previous value when save fails", async () => {
      const exerciseId = crypto.randomUUID();
      worker.use(
        http.patch(`${API_URL}/exercises/:exerciseId`, async () => {
          return HttpResponse.json(
            {
              message: "Server error",
              status: 500,
              name: "InternalServerError",
            },
            { status: 500 },
          );
        }),
      );

      const screen = await renderWithProviders(<ExerciseView />, {
        route: `/exercises/${exerciseId}`,
        path: "/exercises/:id",
      });

      await expect
        .element(screen.getByRole("heading", { name: "Bench Press" }))
        .toBeVisible();
      await screen.getByRole("button", { name: "Edit" }).click();

      const nameInput = screen.getByTestId("exercise-name-input");
      await nameInput.fill("Incline Bench Press");
      await screen.getByRole("button", { name: "Save" }).click();

      // After failure: reverted back to the original name, plus error toast
      await expect
        .element(screen.getByText("there was an error"))
        .toBeVisible();
      await expect
        .element(screen.getByRole("heading", { name: "Bench Press" }))
        .toBeVisible();
    });
  });
});
