// Function to control the triggering of events
export const debounce = <T extends any[]>(
  callback: (...args: T) => void,
  wait: number
): ((...args: T) => void) => {
  let timeoutId: NodeJS.Timeout | null = null;
  return (...args: T): void => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      callback(...args);
    }, wait);
  };
};
