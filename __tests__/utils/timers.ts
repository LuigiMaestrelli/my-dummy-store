export const sleep = (timeMs: number = 100) =>
  new Promise(resolve => setTimeout(resolve, timeMs));
