export interface ApplicationState {
    error: ApplicationError | null
    promises: any[]
}

export interface ApplicationError {
    message: string
    code: string | number | null
}
