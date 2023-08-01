const USER_ERROR_IDS: Record<string, string[]> = {
  already_subscribed: ['email']
}

class EventErrorService {
  errors: string[]

  constructor(initialErrors?: string[]) {
    this.errors = initialErrors || []
  }

  addError(error: string) {
    this.errors.push(error)
    return this.errors
  }

  isUserError(error: string) {
    return Object.keys(USER_ERROR_IDS).includes(error)
  }

  removeIrrelevantErrors(changedDataKeys: string[]): string[] {
    const updatedErrors = Object.entries(USER_ERROR_IDS).reduce(
      (updatedErrorIds, [errorId, dataKeys]) => {
        if (dataKeys.some((dataKey) => changedDataKeys.includes(dataKey)))
          return updatedErrorIds.filter((error: string) => error !== errorId)
        return updatedErrorIds
      },
      this.errors
    )
    this.errors = updatedErrors
    return updatedErrors
  }
}

export default EventErrorService
