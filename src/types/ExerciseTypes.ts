export type Exercise = {
    id: string;
    userId: string;
    name: string;
    description?: string;
}

export type CreateExercisePayload = {
    name: string;
    description?: string;
}

export type UpdateExercisePayload = Partial<CreateExercisePayload>;