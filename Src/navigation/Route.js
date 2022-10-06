import * as React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Auth stack 
import usersignin from '../Screens/Auth/Login/index'
import UserRegistration from '../Screens/Auth/Signup/index';
import Mpin from '../Screens/Auth/Mpin/index'
import NMpin from '../Screens/Auth/NewPin/index'
import Splash from '../Screens/Splash';
import ForgotPassword from '../Screens/Auth/Forgot';
import Verification from '../Screens/Auth/Verification'
import ChangePassword from '../Screens/Auth/ChangePassword';

// Dashboard Stack
import Dashboard from '../Screens/Dashboard/index'
import SideMenu from '../Component/SideMenu';
import ViewChallan from '../Screens/Challan_Summery/index'

//Challan stack
import Challan from '../Screens/Challan/QuickChallan/index'
import Treasury from '../Screens/Challan/Treasury';
import PayDetails from '../Screens/Challan/PaymentDetails/index';
import Paymode from '../Screens/Challan/Paymod/index'
import HeadDetails from '../Screens/Challan/HeadDetails';


//Profile stack
import CreateProfile from '../Screens/Profile/CreateProfile/index'
import ContactUs from '../Screens/ContactUs/index'
import ProfileList from '../Screens/Profile/ProfileList/index'
import PaymentSuccess from '../Screens/Challan/Receipt_info/index'
const Drawer = createDrawerNavigator();

const MyDrawer = () => (
    <Drawer.Navigator
        drawerStyle={{ width: '64%', }}
        drawerPosition='left'
        drawerType="front"
        drawerContent={props => <SideMenu {...props} />}
    >
        <Drawer.Screen name="Dashboard" component={Dashboard} options={{
            swipeEnabled: false, // to disable swipe gesture
        }} />
    </Drawer.Navigator>
)

const Stack = createStackNavigator();

function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash">
                <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
                <Stack.Screen name="usersignin" component={usersignin} options={{ headerShown: false }} />
                <Stack.Screen name="UserRegistration" component={UserRegistration} options={{ headerShown: false }} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
                <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
                <Stack.Screen name="Verification" component={Verification} options={{ headerShown: false }} />
                <Stack.Screen name="Mpin" component={Mpin} options={{ headerShown: false }} />
                <Stack.Screen name="NMpin" component={NMpin} options={{ headerShown: false }} />
                <Stack.Screen name="Challan" component={Challan} options={{ headerShown: false }} />
                <Stack.Screen name="Treasury" component={Treasury} options={{ headerShown: false }} />
                <Stack.Screen name="PayDetails" component={PayDetails} options={{ headerShown: false }} />
                <Stack.Screen name="Paymode" component={Paymode} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={MyDrawer} options={{ headerShown: false }} />
                <Stack.Screen name="HeadDetails" component={HeadDetails} options={{ headerShown: false }} />
                <Stack.Screen name="CreateProfile" component={CreateProfile} options={{ headerShown: false }} />
                <Stack.Screen name="ContactUs" component={ContactUs} options={{ headerShown: false }} />
                <Stack.Screen name="ProfileList" component={ProfileList} options={{ headerShown: false }} />
                <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} options={{ headerShown: false }} />
                <Stack.Screen name="ViewChallan" component={ViewChallan} options={{ headerShown: false }} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export function handleNavigation(nav) {
    console.log("routtttt_", nav);
    // Perform navigation if the app has mounted

    switch (nav.type) {
        case 'push':
            nav.navigation.navigate(nav.page, nav.passProps);
            break;
        case 'setRoot':
            nav.navigation.reset({ index: 1, routes: [{ name: nav.page }] })
            break;
        case 'pop':
            nav.navigation.goBack();
            break;
        case 'popToTop':
            nav.navigation.popToTop();
            break;
    }
}

export default Routes;





