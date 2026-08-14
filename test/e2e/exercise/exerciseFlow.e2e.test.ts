import type { Exercise } from "@/types/ExerciseTypes";
import { test, expect } from "@playwright/test";

const TEST_USER_ID = "123e4567-e89b-12d3-a456-426614174000";

test("user navigates to exercises, creates exercise and is navigated back to exercises", async ({ page }) => {
  const API_URL = process.env.VITE_API_URL;
  
  let createdExercise: Exercise | null = null;


  await page.route(`${API_URL}/exercises?userId=${TEST_USER_ID}`, async (route) => {
    const request = route.request();
    const method = request.method();

    if (method === "GET") {
      const exercises: Exercise[] = createdExercise ? [createdExercise] : [];
      await route.fulfill({
        json: exercises,
        status: 200,
      });
    } else if (method === "POST") {
      const body = JSON.parse(request.postData() || "{}");
      
      createdExercise = {
        id: crypto.randomUUID(),
        userId: TEST_USER_ID,
        name: body.name,
        description: body.description || "",
      };

      await route.fulfill({
        json: createdExercise,
        status: 201,
      });
    } else {
      return route.continue();
    }
  });

  await page.goto("/exercises");
  await expect(page.locator("h1")).toContainText("Exercises");

  await page.click("button:has-text('Create New Exercise')");

  await page.waitForURL("**/exercises/create");

  await page.fill("input[placeholder='Exercise Name']", "Squat");
  await page.fill("textarea[placeholder='description (optional)']", "Lower body exercise");

  await page.click("button:has-text('Create Exercise')");

  await page.waitForURL(`**/exercises?userId=${TEST_USER_ID}`);
  
 
  await expect(page.locator('[data-slot="card-title"]').getByText("Squat")).toBeVisible();
  await expect(page.getByText("Lower body exercise")).toBeVisible();
});