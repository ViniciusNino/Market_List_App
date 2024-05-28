 export const isTextMatch = (source: string, target: string) => {
  source = noAccent(source.toLowerCase());
  target = noAccent(target.toLowerCase());
  return source.startsWith(target);
};

const noAccent = (s: string) => {

  if (!s || s.length === 0) {
    return s;
  }
  const r = s
  .replace(/[àáâãäå]/g, 'a')
  .replace(/æ/g, 'ae')
  .replace(/ç/g, 'c')
  .replace(/[èéêë]/g, 'e')
  .replace(/[ìíîï]/g, 'i')
  .replace(/ñ/g, 'n')
  .replace(/[òóôõö]/g, 'o')
  .replace(/œ/g, 'oe')
  .replace(/[ùúûü]/g, 'u')
  .replace(/[ýÿ]/g, 'y')
  .replace(/[ÀÁÂÃÄÅ]/g, 'A')
  .replace(/Æ/g, 'AE')
  .replace(/Ç/g, 'C')
  .replace(/[ÈÉÊË]/g, 'E')
  .replace(/[ÌÍÎÏ]/g, 'I')
  .replace(/Ñ/g, 'N')
  .replace(/[ÒÓÔÕÖ]/g, 'O')
  .replace(/Œ/g, 'OE')
  .replace(/[ÙÚÛÜ]/g, 'U')
  .replace(/[ÝŸ]/g, 'Y');

  return r;
};

export function formatUrl(url: string, params: any[]) {
  return url.replace(/{(\d+)}/g, (match, number) => {
      return typeof params[number] != 'undefined' ? params[number] : match;
  });
}
