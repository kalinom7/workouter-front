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

type UpdateExercisePayload = Partial<CreateExercisePayload>;