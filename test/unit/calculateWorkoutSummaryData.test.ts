import { describe, it, expect } from "vitest";
import { calculateWorkoutSummaryData } from "@/views/Workout/helper/WorkoutSummaryData";
import type { Workout } from "@/types/WorkoutTypes";

describe("calculateWorkoutSummaryData", () => {
  const createMockWorkout = (
    overrides?: Partial<Workout>,
  ): Workout => ({
    id: "workout-1",
    userId: "user-1",
    startTime: new Date("2026-08-13T10:00:00"),
    endTime: new Date("2026-08-13T10:30:00"),
    exercises: [],
    ...overrides,
  });

  it("should return zero values when workout has no endTime", () => {
    const workout = createMockWorkout({ endTime: null });
    const result = calculateWorkoutSummaryData(workout);

    expect(result).toEqual({
      workoutTime: "00:00:00",
      exercisesDone: 0,
      totalWeightLifted: 0,
    });
  });

  it("should calculate correct workout time", () => {
    const startTime = new Date("2026-08-13T10:00:00");
    const endTime = new Date("2026-08-13T10:30:45");
    const workout = createMockWorkout({
      startTime,
      endTime,
    });

    const result = calculateWorkoutSummaryData(workout);
    expect(result.workoutTime).toBe("00:30:45");
  });

  it("should count exercises correctly", () => {
    const workout = createMockWorkout({
      exercises: [
        {
          exercise: { id: "ex-1", name: "Bench Press" },
          sets: [],
          order: 1,
          isCompleted: true,
        },
        {
          exercise: { id: "ex-2", name: "Squats" },
          sets: [],
          order: 2,
          isCompleted: true,
        },
        {
          exercise: { id: "ex-3", name: "Deadlifts" },
          sets: [],
          order: 3,
          isCompleted: true,
        },
      ],
    });

    const result = calculateWorkoutSummaryData(workout);
    expect(result.exercisesDone).toBe(3);
  });

  it("should calculate total weight lifted correctly with single exercise", () => {
    const workout = createMockWorkout({
      exercises: [
        {
          exercise: { id: "ex-1", name: "Bench Press" },
          sets: [
            {
              weight: 100,
              reps: 10,
              order: 1,
              isCompleted: true,
            },
            {
              weight: 100,
              reps: 8,
              order: 2,
              isCompleted: true,
            },
            {
              weight: 95,
              reps: 6,
              order: 3,
              isCompleted: true,
            },
          ],
          order: 1,
          isCompleted: true,
        },
      ],
    });

    const result = calculateWorkoutSummaryData(workout);
    // (100 * 10) + (100 * 8) + (95 * 6) = 1000 + 800 + 570 = 2370
    expect(result.totalWeightLifted).toBe(2370);
  });

  it("should calculate total weight lifted correctly with multiple exercises", () => {
    const workout = createMockWorkout({
      exercises: [
        {
          exercise: { id: "ex-1", name: "Bench Press" },
          sets: [
            {
              weight: 100,
              reps: 10,
              order: 1,
              isCompleted: true,
            },
          ],
          order: 1,
          isCompleted: true,
        },
        {
          exercise: { id: "ex-2", name: "Squats" },
          sets: [
            {
              weight: 150,
              reps: 8,
              order: 1,
              isCompleted: true,
            },
          ],
          order: 2,
          isCompleted: true,
        },
      ],
    });

    const result = calculateWorkoutSummaryData(workout);
    // (100 * 10) + (150 * 8) = 1000 + 1200 = 2200
    expect(result.totalWeightLifted).toBe(2200);
  });

  it("should handle workout lasting over an hour", () => {
    const startTime = new Date("2026-08-13T09:15:30");
    const endTime = new Date("2026-08-13T11:45:45");
    const workout = createMockWorkout({
      startTime,
      endTime,
    });

    const result = calculateWorkoutSummaryData(workout);
    expect(result.workoutTime).toBe("02:30:15");
  });

  it("should include all data in summary", () => {
    const startTime = new Date("2026-08-13T10:00:00");
    const endTime = new Date("2026-08-13T10:45:00");
    const workout = createMockWorkout({
      startTime,
      endTime,
      exercises: [
        {
          exercise: { id: "ex-1", name: "Bench Press" },
          sets: [
            {
              weight: 100,
              reps: 10,
              order: 1,
              isCompleted: true,
            },
          ],
          order: 1,
          isCompleted: true,
        },
      ],
    });

    const result = calculateWorkoutSummaryData(workout);

    expect(result).toEqual({
      workoutTime: "00:45:00",
      exercisesDone: 1,
      totalWeightLifted: 1000,
    });
  });

  it("should handle empty sets array", () => {
    const workout = createMockWorkout({
      exercises: [
        {
          exercise: { id: "ex-1", name: "Bench Press" },
          sets: [],
          order: 1,
          isCompleted: true,
        },
      ],
    });

    const result = calculateWorkoutSummaryData(workout);
    expect(result.exercisesDone).toBe(1);
    expect(result.totalWeightLifted).toBe(0);
  });

  it("should calculate complex workout correctly", () => {
    const startTime = new Date("2026-08-13T08:00:00");
    const endTime = new Date("2026-08-13T09:20:30");
    const workout = createMockWorkout({
      startTime,
      endTime,
      exercises: [
        {
          exercise: { id: "ex-1", name: "Bench Press" },
          sets: [
            { weight: 100, reps: 10, order: 1, isCompleted: true },
            { weight: 100, reps: 8, order: 2, isCompleted: true },
            { weight: 95, reps: 6, order: 3, isCompleted: true },
          ],
          order: 1,
          isCompleted: true,
        },
        {
          exercise: { id: "ex-2", name: "Squats" },
          sets: [
            { weight: 150, reps: 8, order: 1, isCompleted: true },
            { weight: 150, reps: 6, order: 2, isCompleted: true },
          ],
          order: 2,
          isCompleted: true,
        },
        {
          exercise: { id: "ex-3", name: "Deadlifts" },
          sets: [
            { weight: 200, reps: 5, order: 1, isCompleted: true },
          ],
          order: 3,
          isCompleted: true,
        },
      ],
    });

    const result = calculateWorkoutSummaryData(workout);
    expect(result.workoutTime).toBe("01:20:30");
    expect(result.exercisesDone).toBe(3);
    // Bench: (100*10) + (100*8) + (95*6) = 2370
    // Squats: (150*8) + (150*6) = 2100
    // Deadlifts: (200*5) = 1000
    // Total: 5470
    expect(result.totalWeightLifted).toBe(5470);
  });
});
