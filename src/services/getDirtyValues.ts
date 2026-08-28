export default function getDirtyValues<T extends object>(values: T, original: T): Partial<T> {
  const dirtyValues: Partial<T> = {};

  (Object.keys(values) as (keyof T)[]).forEach((key) => {
    if (values[key] !== original[key]) {
      dirtyValues[key] = values[key];
    }
  });

  return dirtyValues;
}
