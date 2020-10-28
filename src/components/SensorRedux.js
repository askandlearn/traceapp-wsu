export const startScan = () => {
  return (dispatch, getState, DeviceManager) => {
    const subscription = DeviceManager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        dispatch(scan());
        subscription.remove();
      }
    }, true);
  };
};
