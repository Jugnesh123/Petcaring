import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext, useState } from 'react';
import { StatusBar, View } from 'react-native';
import Home from './component/Home';
import OrganizationProfile from './component/OrganizationProfile';
import SignIn from './component/SignIn';
import SignUp from './component/SignUp';
import AlertMessage from './component/utils/AlertMessage';
import AppBar from './component/utils/AppBar';
import Loading from './component/utils/Loading';
import AppContext from './context/AppContext';
import NoInternet from './component/NoInternet';
import { useNetInfo } from '@react-native-community/netinfo';
import ServiceProfile from './component/ServicePofile';
import Booking from './component/Booking';
import { petorganization_breed } from './interface';
export type RootStackParamList = {
    home: undefined;
    signin: undefined;
    signup: undefined;
    organizationprofile: { id: string};
    serviceprofile: {value: petorganization_breed},
    booking: {
        service: string,
        petorganization: string,
        orgservice: string,
    },
};
export const baseurl = "http://192.168.118.30:8000";
export const imagebaseurl = baseurl;
export const randomimage = "https://picsum.photos/720";
export const randomdescription="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci expedita voluptatum cupiditate iusto alias nulla unde saepe doloribus dolore molestiae quisquam porro atque, explicabo veritatis. Quos perferendis error laboriosam aliquam aperiam accusantium deleniti nam mollitia incidunt! Voluptates doloremque deleniti quaerat ad ex nulla incidunt repudiandae iusto, velit in laboriosam repellendus consequatur odit dignissimos praesentium optio tempora magni dolorem possimus blanditiis minima, totam vitae molestiae. Sed nihil commodi, fugiat voluptate autem molestias distinctio voluptatem cum ad, suscipit possimus deleniti. Voluptatum in rem provident perferendis dolores quisquam, dolorum adipisci culpa totam nobis amet. Facilis impedit repellat aspernatur vero sapiente atque illo sed in esse est minus magnam laborum qui eum assumenda, beatae cupiditate culpa commodi aliquid? Delectus ullam vero fugiat, omnis optio accusamus numquam iste officiis pariatur corrupti inventore corporis possimus consequatur! Maiores sint vitae, at blanditiis praesentium amet et sed rem delectus quasi facilis, ex sunt deleniti quae. Molestiae, asperiores vitae eius nihil praesentium odit consequatur totam minima corrupti earum id debitis odio eligendi perspiciatis harum quas consequuntur nemo magni commodi recusandae dolorum quod? Rem perspiciatis amet earum obcaecati, magnam distinctio temporibus molestias vitae odio aliquam asperiores officiis harum nostrum? Repellat aperiam tenetur temporibus illum dicta. Veritatis maiores cum magni in debitis dolor laudantium non, dolorum beatae quas, ducimus officiis! Asperiores doloribus voluptatibus temporibus excepturi nulla. Repellat laudantium est adipisci quas quaerat cumque exercitationem. Dolore maiores perspiciatis, laudantium sit architecto veritatis ut ex voluptas vel repellendus, qui quas velit";
const Root = (): JSX.Element => {
    const RootStack = createNativeStackNavigator<RootStackParamList>();
    const appState = useContext(AppContext);
    const alert = appState?.alert;
    const netinfo = useNetInfo();
    if(appState?.signIn == undefined)
        appState?.loginCheck();
    return (
        <View
            style={{
                height: '100%',
                backgroundColor: appState?.colorValue.backgroundSubtle,
            }}>
            <StatusBar
                animated={true}
                barStyle={appState?.darkMode ? 'light-content' : 'dark-content'}
                backgroundColor={appState?.colorValue.background}
            />
            {
                appState?.alert &&
                <AlertMessage title={alert?.title} description={alert?.description} buttons={alert?.buttons} />
            }
            {
                appState?.showLoading &&
                <Loading />
            }
            {
                netinfo.isConnected == null ?
                    <Loading /> :
                    netinfo.isConnected ?
                        <NavigationContainer>
                            <RootStack.Navigator initialRouteName="home" screenOptions={{ contentStyle: { backgroundColor: appState?.colorValue.backgroundSubtle } }}>
                                <RootStack.Screen
                                    name="home"
                                    component={Home}
                                    options={{
                                        header: ({ navigation, route, options, back }) => (
                                            <AppBar
                                                title="Pet Caring"
                                                actionbuttons={[
                                                    {
                                                        icon: 'search',
                                                        onPress: () => {
                                                            appState?.setModalVissible(true);
                                                        }
                                                    },
                                                    {
                                                        icon: appState?.signIn ? 'person' : 'login',
                                                        onPress: () => {
                                                            navigation.navigate('signin');
                                                        },
                                                    },
                                                ]}
                                            />
                                        ),
                                    }}
                                />
                                <RootStack.Screen
                                    name="signin"
                                    component={SignIn}
                                    options={{
                                        headerShown: false,
                                    }}
                                />
                                <RootStack.Screen
                                    name="signup"
                                    component={SignUp}
                                    options={{
                                        header: ({ navigation, route, options, back }) => (
                                            <AppBar
                                                title=''
                                                actionbuttons={[{ value: "Sign In" }]}
                                                backpress={() => navigation.pop()}
                                                back
                                            />
                                        ),
                                    }}
                                />
                                <RootStack.Screen
                                    name='organizationprofile'
                                    component={OrganizationProfile}
                                    options={{
                                        headerShown: false,
                                    }}
                                />
                                <RootStack.Screen 
                                    name='serviceprofile'
                                    component={ServiceProfile}
                                    options={{
                                        headerShown: false,
                                    }}
                                />
                                <RootStack.Screen
                                    name='booking'
                                    component={Booking}
                                    options={{
                                        headerShown: false,
                                    }}
                                />
                            </RootStack.Navigator>
                        </NavigationContainer>
                        :
                        <NoInternet />
            }
        </View>
    );
};

export default Root;
