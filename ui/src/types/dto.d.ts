export {};

declare global {
    interface UserTable {
        name: string[],
        experience: number,
        rank?: number,

    }
    interface LoginResponse {
        detail: {
            auth_token: string,
        }
    }

    interface LoginRequest {
        mail: string,
        password: string
    }


    interface CompetitionSchedule {
        startDate: string,
        startTime?: string,
        endTime?: string,
        endDate: string,
        id: string,
    }

    interface CompetitionPost {
        name: string,
        language: string,
        kind: string,
    }
}