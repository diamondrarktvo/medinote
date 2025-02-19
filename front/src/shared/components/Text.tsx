import { createText } from "@shopify/restyle";
import { ThemeT } from "_theme";

const Text = createText<ThemeT>();

Text.defaultProps = {
  color: "text",
};

export default Text;
