export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  const formatter = new Intl.DateTimeFormat("en-EN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formatter.format(date);
};
