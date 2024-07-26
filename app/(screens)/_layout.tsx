import { router, Stack } from 'expo-router';
import React from 'react';
import { Colors } from '@/constants/Colors';
import {Ionicons} from '@expo/vector-icons'
import { useColorScheme } from '@/hooks/useColorScheme';
import { TouchableOpacity } from 'react-native';

// export default function TabLayout() {
//   const colorScheme = useColorScheme();
//   const backToIndex = () =>{
//     router.replace('/')
//   }

//   return (
//     <Stack>
//       <Stack.Screen name='index' options={{headerShown:false}}/>
//       <Stack.Screen name='explore' options={{headerLeft: ()=>(
//         <TouchableOpacity onPress={backToIndex}>
//           <Ionicons name='arrow-back' color={"#000"} size={20} />
//         </TouchableOpacity>
//       )}} />
//     </Stack>
//   );
// }
