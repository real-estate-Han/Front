// 디바운스
export const debounce = (callback: Function, delay: number) => {
  let timerId: number | null;
  return (event: any) => {
    // delay가 경과하기 이전에 이벤트가 발생하면 이전 타이머를 취소하고 새로운 타이머를 재설정
    // delay보다 짧은 간격으로 이벤트가 발생하면 callback은 호출되지 않는다.
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(callback, delay, event);
  };
};

// 스로틀
export const throttle = (callback: Function, delay: number) => {
  let timerId: number | null;
  return (event: any) => {
    // delay가 경과하기 전에 이벤트가 발생하면 아무동작도 하지 않는다.
    // delay가 경과했을 때 이벤트가 발생하면서 새로운 타이머를 재설정한다.
    // 따라서 delay 간격으로 callback이 호출된다.
    if (timerId) return;
    timerId = setTimeout(
      () => {
        callback(event);
        timerId = null;
      },
      delay,
      event
    );
  };
};
