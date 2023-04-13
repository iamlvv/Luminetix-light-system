import { View, Text, TextInput, Image, Pressable, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/actions/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
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

const Login = ({ navigation }) => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo, error, loading } = userLogin;

    useEffect(() => {
        if (userInfo) {
            navigation.navigate('Home')
        }
    }, [userInfo, dispatch, navigation]);

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
            //     url: "http://10.0.126.116:5000/api/users/login",
            //     headers: headers,
            //     data: {
            //         email: email,
            //         password: password,
            //     },
            // })
            //     .then(res => {
            //         console.log(res.data);
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     });
            dispatch(login(email, password, navigation));
        }
    }
    return (
        <View className='mt-20 h-full'>
            <ScrollView className='flex-1'>
                <View className='items-center'>
                    <Text className="text-4xl text-violet-500 font-bold mb-5">Login</Text>
                    <Text className='mb-20 font-bold'>Let's start our journey</Text>
                </View>
                <Pressable>
                    <View className='mb-10 mr-5 ml-5'>
                        <TextInput placeholder="Email" className='border-2 p-2 border-gray-300 rounded-2xl w-full mx-auto'
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>
                    <View className='mb-10 mr-5 ml-5'>
                        <TextInput placeholder="Password" className='border-2 p-2 border-gray-300 rounded-2xl w-full mx-auto' secureTextEntry={true}
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
                <View className='flex-1 mt-72'>
                    <Image source={require('../../images/login.png')} style={styles.bottomView} className='' />
                </View>
            </ScrollView>

        </View>
    )
}

export default Login