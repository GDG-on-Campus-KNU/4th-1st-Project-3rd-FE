export default function getCookiesStr(
  cookies: Record<string, string>,
  options?: { sets?: [string, string][]; deleteKeys?: string[] },
) {
  const filteredCookiesTuple = Object.entries<string>(cookies).filter(
    ([cookieKey]) =>
      options?.sets?.every(([addKey]) => addKey !== cookieKey) &&
      !options?.deleteKeys?.includes(cookieKey),
  );
  if (options?.sets)
    options.sets.forEach((tuple) => filteredCookiesTuple.push(tuple));
  return filteredCookiesTuple
    .map(([key, value]) => `${key}=${value}`)
    .join(';');
}
