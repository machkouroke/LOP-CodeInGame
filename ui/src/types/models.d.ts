import {ExerciseKindType} from "./hui-types";

export {};

declare global {
     interface Exercise {
        name: string;
        owner_name: string;
        subscribers: string[];
        image?: any,
        start: Date;
        end: Date;
        created_at?: Date;
        status?: ExerciseStatusType;
        kind: ExerciseKindType;
        id: string;
    }
    interface User {
        id?: string,
        name: string,
        surname: string,
        mail: string,
        password: string,
        fullname?: string,
        exercises?: ExerciseRelation[],
        experience?: number,
        nbr_participation?: number,
        role?: ROLEType,
        rank?: number,
    }
}