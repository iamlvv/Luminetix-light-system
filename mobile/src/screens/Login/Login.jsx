import { View, Text, TextInput, Image, Pressable, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/actions/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const styles = StyleSheet.create({
    containerMain: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomView: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', //Here is the trick
        bottom: 0, //Here is the trick
    },

});

const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('userInfo')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
        console.log("error reading value");
    }
}

const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const userDetails = useSelector((state) => state.userDetails)
    const { userInfo } = userLogin;
    const { user } = userDetails;

    const handleSubmit = async () => {
        if (email === '' || password === '') {
            alert('Please fill all the fields')
        }
        else {
            // const headers = {
            //     'Content-Type': 'application/json',
            // };
            // axios({
            //     method: "POST",
            //     url: "http://10.0.143.43:5000/api/users/login",
            //     headers: headers,
            //     data: {
            //         email: email,
            //         password: password,
            //     },
            // })
            //     .then(res => {
            //         console.log("hei")
            //         console.log(res.data);
            //         navigation.navigate('Home')
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     });
            dispatch(login(email, password, navigation))
        }
    }
    useEffect(() => {
        if (user) {
            navigation.navigate('Home')
        }
    }, [userInfo, dispatch, navigation]);
    return (
        <View className='mt-20 h-full'>
            <ScrollView className='flex flex-col'>
                <View className='items-center'>
                    <Text className="text-4xl text-violet-500 font-bold mb-5">LOGIN</Text>
                    <Text className='mb-20 font-bold'>Let's start our journey</Text>
                </View>
                <Pressable>
                    <View className='mb-10 mr-5 ml-5 '>
                        <TextInput placeholder="Email" className='border p-2 border-gray-300 w-full mx-auto bg-white rounded-xl'
                            onChangeText={(text) => setEmail(text)}
                            keyboardType='email-address'
                        />
                    </View>
                    <View className='mb-10 mr-5 ml-5 '>
                        <TextInput placeholder="Password" className='border p-2 border-gray-300 w-full mx-auto bg-white rounded-xl' secureTextEntry={true}
                            onChangeText={(text) => setPassword(text)}
                        />
                    </View>
                    <View className='items-center'>
                        <Text className='text-right mr-5'>Don't have an account?</Text>
                        <TouchableOpacity className='mb-5'
                            onPress={() => {
                                navigation.navigate('Signup')
                            }
                            }
                        >
                            <Text className=' font-bold text-violet-500'>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                    <View className='items-center mt-2'>
                        <TouchableOpacity className='bg-violet-500 rounded-2xl px-20 py-3'
                            onPress={handleSubmit}
                        >
                            <Text className='font-bold text-white text-xl'>Login</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
                <View className='mt-80'>
                    <Image source={require('../../images/login.png')} style={styles.bottomView} className='' />
                </View>
            </ScrollView>
        </View>
    )
}

export default Login