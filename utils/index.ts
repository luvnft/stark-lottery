// eclipse middle string
export function ellipseMiddle(
  target: string,
  charsStart = 4,
  charsEnd = 4
): string {
  return `${target.slice(0, charsStart)}...${target.slice(
    target.length - charsEnd
  )}`;
}
// regex match number
export const checkIsNumber = (query: string) => query.match(/^[0-9]+$/);

// Setting Store Data into cookie
export   function convertBigIntsToNumbers(obj: any) {
    for (const key in obj) {
      if (
        typeof obj[key] === 'bigint' &&
        key !== 'user' &&
        key !== 'lotteryAddress'
      ) {
        obj[key] = Number(obj[key]);
      } else if (Array.isArray(obj[key])) {
        obj[key] = obj[key].map((item: any) =>
          typeof item === 'bigint' ? Number(item) : item
        );
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        convertBigIntsToNumbers(obj[key]);
      }
    }
  }


 export const convertTimestampToFormattedDate = (dateConvert: string) => {
  // Convert given timestamp to a Date object
  const givenDate = new Date(dateConvert);

  // Format the desired date and time
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).format(givenDate);

  // Combine the formatted date, time, and meridiem
  const result = `${formattedDate}`;

  return result;
};
