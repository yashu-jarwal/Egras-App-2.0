import { constants } from 'buffer'
import Constants from '../Component/Constant'
const ApiUrl = {

    //Auth Services
    LOG_IN: Constants.AuthService + 'login',
    Signup: Constants.AuthService + 'SinUp',
    NMPIN: Constants.AuthService + 'InsertMPIN',
    MPIN: Constants.AuthService + 'CheckMPIN',
    Signupverify: Constants.AuthService + 'MobileVerify_VerifyOTP',
    Verifyotp: Constants.AuthService + 'OTPVerify',
    Resendotp: Constants.AuthService + 'MobileVerify_GenerateOTP',
    CheckUser: Constants.AuthService + 'CheckUserExist',
    Checkexistuser: Constants.AuthService + 'CheckExistingUserMobile',
    SendMessage: Constants.AuthService + 'SendMessage',
    ChangePassword: Constants.AuthService + 'ChangePwd',

    // Home Services
    GetUserDetail: Constants.MainService + 'GetUserFullName',
    Transactionlist: Constants.MainService + 'Last10Transactions',

    // Challan Services
    DepartmentService: Constants.MainService + 'ServiceDepartmentList',
    ServiceList: Constants.MainService + 'ServiceList',
    DistrictList: Constants.MainService + 'Districts',
    OfficeList: Constants.MainService + 'OfficeList',
    // TreasuryList: Constants.MainService + 'Treasury',
    TreasuryList: Constants.MainService + 'SelectTreasuryByOffice',
    Challan_Service: Constants.MainService + 'ServiceChallanCreate_Ability',
    ChallanDetails: Constants.MainService + 'CreateChallanDetailData',
    DivisionList: Constants.MainService + 'DivisionList',
    PayeeDetails: Constants.MainService + 'EditProfileDetail',
    CreateServiceSchemas: Constants.MainService + 'CreateServiceSchemas',
    CreateChallanSchemas: Constants.MainService + 'CreateChallanSchemas',
    RepeatcreateSchmeas: Constants.MainService + 'ChallanSchemas',
    BankDetails: Constants.MainService + 'BanksList',
    CreateNewChallan: Constants.MainService + 'CreateNewChallan',
    MajorHead: Constants.MainService + 'MajorHeadList',
    BudgetHeadList: Constants.MainService + 'BudgetHeadList',
    CreateNewProfile: Constants.MainService + 'InsertProfile',
    GetProfileLIst: Constants.MainService + 'ProfileList',
    SchemaName: Constants.MainService + 'FillUserSchema',
    NewChallanCreate_Ability: Constants.MainService + 'NewChallanCreate_Ability',
    GRN_Repeatability: Constants.MainService + 'Repeatability',
    ViewGrnDetails: Constants.MainService + 'GRNDetail',
    SearchGRN: Constants.MainService + 'SearchGRN',
    BankSubmit: Constants.MainService + 'InsertPaymentDetail',
    Upiverify: Constants.MainService + 'VerifyUPIDetails',
    GetGRNPDF: Constants.MainService + 'GeneratePDF',
}
export default ApiUrl