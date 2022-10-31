export interface Constructor<T = unknown> extends Function {
  new (...args: any[]): T
}

export interface Dictionary<T = any> {
  [key: string]: T
}
