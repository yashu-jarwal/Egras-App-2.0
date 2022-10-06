import { showMessage } from "react-native-flash-message";
import { Platform } from "react-native";
import Toast from 'react-native-toast-message';
class _CommonMethods {

    showError = (message) => {
        showMessage({
            message: message,
            type: 'danger',
            icon: 'info',
            duration: 3000,
            style: { bottom: Platform.OS == 'ios' ? 20 : 70, marginHorizontal: 50, borderRadius: 10 }
        });
    }

    showSuccess = (message) => {
        showMessage({
            message: message,
            type: 'success',
            icon: 'info',
            duration: 3000,
            style: { bottom: Platform.OS == 'ios' ? 20 : 70, marginHorizontal: 50, borderRadius: 10 }

        });
    }
}

const CommonMethods = new _CommonMethods();
export default CommonMethods;