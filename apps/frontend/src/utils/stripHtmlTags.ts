export const stripHtmlTags = (str?: string) => {
  return str?.replace(/<\/?[^>]+(>|$)/g, "");
};