export const getFormatOptions = (
  parsedDate: Date,
  groupType?: 'day' | 'month' | 'year'
): Intl.DateTimeFormatOptions => {
  if (groupType === 'year') {
    return {
      timeZone: 'UTC',
      year: 'numeric',
    };
  }

  if (groupType === 'month') {
    return {
      timeZone: 'UTC',
      year:
        new Date().getFullYear() !== parsedDate.getFullYear()
          ? 'numeric'
          : undefined,
      month: 'long',
    };
  }

  if (groupType === 'day') {
    return {
      year:
        new Date().getFullYear() !== parsedDate.getFullYear()
          ? 'numeric'
          : undefined,
      month: 'long',
      day: '2-digit',
      weekday: 'long',
    };
  }

  return {};
};
