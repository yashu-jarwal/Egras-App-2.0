import { Platform } from 'react-native';

export default Constants = {
    //Url 
    // Base_Url: "http://10.130.34.232/",
    Base_Url: "http://172.22.32.107/",
    AuthService: 'AppService/eservice/EgrasAppLoginService.svc/',
    // AuthService: 'EgrasLatest/eservice/EgrasAppLoginService.svc/',

    MainService: "AppService/eservice/EgrasAndroidAppService.svc/",

    // Web_url
    // WebUrl: 'http://10.130.34.152/EgrasLatest/',  
    WebUrl: 'http://172.22.32.109/EgrasLatest/',

    Payurl: 'webpages/EgAppPaymentRedirect.aspx',

    // WebUrl: 'http://10.130.34.232/AppService/',
    // Payurl: 'webpages/EgAppPaymentRedirect.aspx',



    //Methods
    POST: "POST",
    GET: "GET",
    PUT: "PUT",
    DELETE: "DELETE",

    POST_UPLOAD: "POST_UPLOAD",
    TRUE: 'True',
    FALSE: 'False',
    SUCCESS: "Success",
    UserStatus: "Y",
    DeviceType: Platform.OS == 'android' ? 'Android' : 'IOS',
    USER_DATA: 'user_data',
    TOKEN: 'token',
    Remember_Me: 'RememberMe',
    Profile: 'Profile',
    Deactivated: 'deactivated',
    TOKEN: 'token'
}
