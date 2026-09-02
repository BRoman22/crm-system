interface DirtyValuesResult<T> {
  dirtyValues: Partial<T>;
  dirtyCount: number;
}

export default function getDirtyValues<T extends object>(
  values: T,
  original: T
): DirtyValuesResult<T> {
  const dirtyValues: Partial<T> = {};
  let dirtyCount = 0;

  (Object.keys(values) as (keyof T)[]).forEach((key) => {
    if (values[key] !== original[key]) {
      dirtyValues[key] = values[key];
      dirtyCount++;
    }
  });

  return { dirtyValues, dirtyCount };
}
