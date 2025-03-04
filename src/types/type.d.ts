type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type StatusCode =
  `${1 | 2 | 3 | 4 | 5}${Digit}${Digit}` extends `${infer Code extends number}`
    ? Code
    : never;
