import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

export const ToastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'green' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{fontSize: 15, fontWeight: '500' }}/>),
    error: (props) => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: 'red' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{ fontSize: 12, fontWeight: '500' }} />)
  };

export const ShowToast = (result) => {
    Toast.show({
      type: result.isCompleted ? "success" : "error",
      text1: result.title,
      text2: result.body
    });
  }

export const GetFailedToast = (message) => {
  ShowToast({isCompleted: false, title: "Failed", body: message ? message : "Something went wrong."})
}

export const GetSuccessToast = (message) => {
  ShowToast({isCompleted: true, title: "Success", body: message ? message : "Successfully changed."})
}