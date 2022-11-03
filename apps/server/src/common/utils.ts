/**
 * Funnels concurrent execution of a function to a single promise.
 */
export function funnel<T, F extends (...args: any[]) => Promise<T>>(fn: F): F {
  let promise: Promise<T> | undefined;

  return (async (...args) => {
    if (promise) {
      return promise;
    }

    promise = fn(args);

    try {
      return await promise;
    }
    finally {
      promise = undefined;
    }
  }) as F;
}
