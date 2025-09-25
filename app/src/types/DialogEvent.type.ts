type DialogEventType<T> = {
  onDialogHide: () => void;
  onDialogOK: (payload?: T) => void;
  onDialogCancel: () => void;
};
export default DialogEventType;
