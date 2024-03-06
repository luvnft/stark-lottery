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
