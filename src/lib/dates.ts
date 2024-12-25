export const getFutureDate = (offsetMs: number): string => {
  return new Date(Date.now() + offsetMs).toISOString();
};