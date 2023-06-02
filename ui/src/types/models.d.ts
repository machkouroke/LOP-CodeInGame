export {};

declare global {
     interface Exercise {
        name: string;
        owner_name: string;
        participators: string[];
        image?: any,
        start: Date;
        end: Date;
        created_at?: Date;
        status?: ExerciseStatusType;
        kind: string;
        id: string;
    }
    interface User {
        id?: string,
        name: string,
        surname: string,
        mail: string,
        password: string,
        fullname?: string,
        exos?: string[],
        experience?: number,
        nbr_participation?: number,
        role?: ROLEType,
        rank?: number,
    }
}