export interface RateLimiterOptions {
  /**
   * The maximum number of simultaneous requests.
   * If not specified, defaults to 1.
   */
  concurrency?: number

  /**
   * Interval in milliseconds before the interval count resets.
   */
  interval: number

  /**
   * Maximum number of requests that can be made in the interval.
   */
  intervalCap: number
}
