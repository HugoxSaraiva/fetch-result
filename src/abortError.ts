export class AbortError extends Error {
  constructor() {
    super("The operation was aborted")
    this.name = "AbortError"
  }
}
