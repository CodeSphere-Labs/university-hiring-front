export const removeEmptyValues = (obj: Record<string, any>) =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== '' && value !== null && value !== undefined
    )
  );
