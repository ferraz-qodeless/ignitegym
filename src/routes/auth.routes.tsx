import { createNativeStackNavigator } from "@react-navigation/native-stack"

const { Navigator, Screen } = createNativeStackNavigator()

import { SignIn } from "@screens/SignIn"
import { SignUp } from "@screens/SignUp"

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen 
        name="signIn" 
        component={SignIn}
      />
      <Screen 
        name="signUp" 
        component={SignUp}
      />
    </Navigator>
  )
}