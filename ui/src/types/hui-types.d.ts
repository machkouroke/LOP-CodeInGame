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
        ) => JSX.Element;
        path: string;
        fullpath: string;
        protected: boolean;
        roles: string[];
    }

    interface Competition {
        name: string;
        owner_name: string;
        participators: string[];
        image?: any,
        start: Date;
        end: Date;
        created_at?: Date;
        Type: string;
        id: string;
    }

    interface IAuthState {
        loading: boolean,
        userToken: string | null,
        error: any,
        success: boolean,
    }

    interface LoginResponse {
        auth_token: string
    }

    interface LoginRequest {
        mail: string,
        password: string
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
        Type?: string,
        rank?: number,
    }

    interface CompetitionSchedule {
        startDate: string,
        startTime?: string,
        endTime?: string,
        endDate: string,
        competitionId: string,
    }
    interface CompetitionPost {
        name: string,
        language: string,
        Type: string,
    }

}
