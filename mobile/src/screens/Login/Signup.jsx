import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { register } from '../../redux/actions/userActions'
import { useNavigation } from '@react-navigation/native'
const Signup = () => {
    const navigation = useNavigation();
    const [fullname, setFullname] = React.useState('')
    const [username, setUsername] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const dispatch = useDispatch();
    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo } = userRegister;

    useEffect(() => {
        if (userInfo) {
            navigation.navigate('Home')
        }
    }, [userInfo])
    const handleSubmit = () => {
        if (fullname === '' || username === '' || email === '' || phone === '' || password === '' || confirmPassword === '') {
            alert('Please fill all the fields')
        }
        else if (password !== confirmPassword) {
            alert('Passwords do not match')
        }
        else {
            dispatch(register(fullname, username, email, password, phone, navigation));
        }
    }
    return (
        <View className="mt-20">
            <ScrollView>
                <View className="items-center">
                    <Text className="text-4xl font-bold text-violet-500 mb-10">Sign up</Text>
                </View>
                <View className='mb-5 mr-5 ml-5'>
                    <TextInput placeholder="Fullname" className='border-2 p-2 border-gray-300 rounded-2xl w-full mx-auto' 
                    onChangeText={(text) => setFullname(text)}
                    />
                </View>
                <View className='mb-5 mr-5 ml-5'>
                    <TextInput placeholder="Username" className='border-2 p-2 border-gray-300 rounded-2xl w-full mx-auto'
                    onChangeText={(text) => setUsername(text)}
                     />
                </View>
                <View className='mb-5 mr-5 ml-5'>
                    <TextInput placeholder="Email" className='border-2 p-2 border-gray-300 rounded-2xl w-full mx-auto' 
                    onChangeText={(text) => setEmail(text)}
                    />
                </View>
                <View className='mb-5 mr-5 ml-5'>
                    <TextInput placeholder="Phone number" keyboardType='phone-pad' className='border-2 p-2 border-gray-300 rounded-2xl w-full mx-auto' 
                    onChangeText={(text) => setPhone(text)}
                    />
                </View>
                <View className='mb-5 mr-5 ml-5'>
                    <TextInput placeholder="Password" secureTextEntry={true} className='border-2 p-2 border-gray-300 rounded-2xl w-full mx-auto' 
                    onChangeText={(text) => setPassword(text)}
                    />
                </View>
                <View className='mb-10 mr-5 ml-5'>
                    <TextInput placeholder="Confirm password" secureTextEntry={true} className='border-2 p-2 border-gray-300 rounded-2xl w-full mx-auto' 
                    onChangeText={(text) => setConfirmPassword(text)}
                    />
                </View>
                <View className='items-center'>
                    <TouchableOpacity className='bg-violet-500 rounded-2xl px-20 py-3'
                        onPress={handleSubmit}
                    >
                        <Text className='font-bold text-white text-xl'>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default Signup