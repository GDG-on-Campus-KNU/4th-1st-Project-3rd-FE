export default function checkIsMobile() {
  // @ts-expect-error opera 속성이 있을 수 있음
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return (
    /android/i.test(userAgent) ||
    /iphone|ipod/i.test(userAgent) ||
    /windows phone/i.test(userAgent)
  );
}
