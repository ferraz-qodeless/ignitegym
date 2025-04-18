import { ButtonSpinner, Button as GluestackButton, Text } from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof GluestackButton> & {
  title: string;
  isLoading?: boolean;
}

export function Button({title, isLoading, ...rest }: Props) {
  return (
    <GluestackButton
      w="$full"
      h="$14"
      bg="$green700"
      borderWidth="$0"
      rounded="$md"
      disabled={isLoading}
      $active={{
        bg: "$green500"
      }}
      {...rest}
    >
      { isLoading ? (
        <ButtonSpinner color="$white" />
        ) : (
        <Text
          color="$white"
          fontFamily="$heading"
          fontSize="$sm"
        >
          {title}
        </Text>
      )}
    </GluestackButton>
  );
}