import { describe, expect, test } from "vitest";
import { renderWithProviders } from "../utils/renderWithProviders";
import { AllExercisesView } from "@/views/Exercise/AllExercises/AllExercisesView";
import { worker } from "../mocks/browser";
import { http, HttpResponse } from "msw";

const API_URL = import.meta.env.VITE_API_URL;

describe("AllExercisesView", () => {
  test("should render search bar, exercises and create button", async () => {
    const screen = await renderWithProviders(<AllExercisesView />, {
      route: "/exercises",
      path: "/exercises",
    });

    await expect
      .element(screen.getByRole("heading", { name: "Exercises" }))
      .toBeVisible();
    await expect
      .element(screen.getByPlaceholder("Search for exercise"))
      .toBeVisible();

    await expect.element(screen.getByText("exercise1")).toBeVisible();
    await expect
      .element(screen.getByText("description of exercise 1"))
      .toBeVisible();

    await expect.element(screen.getByText("exercise2")).toBeVisible();
    await expect
      .element(screen.getByText("description of exercise 2"))
      .toBeVisible();

    await expect.element(screen.getByText("exercise3")).toBeVisible();
    await expect
      .element(screen.getByText("description of exercise 3"))
      .toBeVisible();

    await expect
      .element(screen.getByRole("button", { name: "Create New Exercise" }))
      .toBeVisible();
  });
  test("should show loading state", async () => {
    let release: () => void;
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });
    worker.use(
      http.get(`${API_URL}/exercises`, async () => {
        await gate;
        return HttpResponse.json(null);
      }),
    );

    const screen = await renderWithProviders(<AllExercisesView />, {
      route: "/exercises",
      path: "/exercises",
    });

    await expect.element(screen.getByText("Loading...")).toBeVisible();
    await expect
      .element(screen.getByRole("heading", { name: "Exercises" }))
      .not.toBeInTheDocument();
    await expect
      .element(screen.getByPlaceholder("Search for exercise"))
      .not.toBeInTheDocument();
    await expect.element(screen.getByText("exercise1")).not.toBeInTheDocument();

    release!();
  });
  test("should show error message when fetch fails", async () => {
    worker.use(
      http.get(`${API_URL}/exercises`, async () => {
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

    const screen = await renderWithProviders(<AllExercisesView />, {
      route: "/exercises",
      path: "/exercises",
    });

    await expect
      .element(screen.getByText("Error loading exercises."))
      .toBeVisible();
    await expect
      .element(screen.getByRole("heading", { name: "Exercises" }))
      .not.toBeInTheDocument();
    await expect
      .element(screen.getByPlaceholder("Search for exercise"))
      .not.toBeInTheDocument();
    await expect.element(screen.getByText("exercise1")).not.toBeInTheDocument();
    await expect
      .element(screen.getByRole("button", { name: "Create New Exercise" }))
      .not.toBeInTheDocument();
  });
  test("should filter the visible list when typing in the search bar", async () => {
    const screen = await renderWithProviders(<AllExercisesView />, {
      route: "/exercises",
      path: "/exercises",
    });

    await expect.element(screen.getByText("exercise1")).toBeVisible();

    const searchInput = screen.getByPlaceholder("Search for exercise");
    await searchInput.fill("exercise2");

    await expect.element(screen.getByText("exercise2")).toBeVisible();
    await expect.element(screen.getByText("exercise1")).not.toBeInTheDocument();
  });
});
