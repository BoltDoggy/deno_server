export const useDefine = <T>() => (d: T) => d;

export const useDefineObject = <T>(complete: (d: Partial<T>) => T) =>
  (d: Partial<T>) => complete(d);
