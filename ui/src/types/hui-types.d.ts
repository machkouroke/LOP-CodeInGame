import React from "react";

export {};

declare global {
    /**
     * Now declare things that go in the global namespace,
     * or augment existing declarations in the global namespace.
     */
    interface RoutesType {
        name: string;
        layout: string;
        component: (
            props: any
        ) => React.ReactElement | null;
        path: string;
        fullpath: string;
        protected: boolean;
        roles: string[];
    }


    interface IAuthState {
        loading: boolean,
        userToken: string | null,
        error: any,
        success: boolean,
    }

    type ExerciseRelationKindType = "subscriber" | "creator"
    type ROLEType = "student" | "teacher" | "user"
    type ExerciseKindType = "Salon privé" | "Exercice d'entrainement" | "Compétition"
    type ProgramingLanguageType = "Python"
    type ExerciseStatusType = "Not Scheduled" | "Not Started" | "In Progress" | "Finished"

}
