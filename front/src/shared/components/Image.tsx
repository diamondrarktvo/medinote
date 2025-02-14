import React from "react";
import { Image as RNEImage, ImageProps as RNEImageProps } from "@rneui/themed";

const Image = ({ ...props }: RNEImageProps) => <RNEImage {...props} />;

export type ImageProps = React.ComponentProps<typeof Image>;
export default Image;
