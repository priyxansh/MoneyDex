const formatter = Intl.NumberFormat("en", {
  notation: "compact",
  compactDisplay: "short",
});

/**
 * Format number to compact notation.
 * @param value Number to format.
 * @returns Formatted string with compact notation.
 */
export const formatNumberCompact = (value: number | string): string => {
  return formatter.format(Number(value));
};
