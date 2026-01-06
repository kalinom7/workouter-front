export interface Exercise {
    id: string;
    userId: string;
    name: string;
    description?: string;
}

export interface CreateExercisePayload {
    name: string;
    description?: string;
}

export type UpdateExercisePayload = Partial<CreateExercisePayload>;