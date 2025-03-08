async function startMSW() {
  if (typeof window === 'undefined') {
    const { server } = await import('./server');
    server.listen();
  } else {
    const { worker } = await import('./browser');
    await worker.start({
      // 로그 끄기
      // quiet: true,
    });
  }
}
export default startMSW;
