export function formatUrl(url: string, params: any[]) {
  return url.replace(/{(\d+)}/g, (match, number) => {
    return typeof params[number] != "undefined" ? params[number] : match;
  });
}
