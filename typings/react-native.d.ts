// typings/react-native.d.ts
import { ViewStyle } from "react-native";

declare module "react-native" {
  interface ViewStyle {
    className?: string;
  }

  // Add similar declarations for other styles as needed
}
