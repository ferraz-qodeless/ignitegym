import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { AuthContext } from "@contexts/AuthContext";
import { Box } from "@gluestack-ui/themed";
import { useContext } from "react";
import { gluestackUIConfig } from '../../config/gluestack-ui.config';
import { AuthRoutes } from "./auth.routes";

export function Routes() {
  const conntextData = useContext(AuthContext);
  console.log(conntextData);

  const theme = DefaultTheme;
  theme.colors.background = gluestackUIConfig.tokens.colors.gray700;

  return (
    <Box flex={1} bg="$gray700">
      <NavigationContainer theme={theme}>
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  );
}