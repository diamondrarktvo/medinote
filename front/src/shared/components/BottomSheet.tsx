import React, { useMemo } from "react";

import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useResponsiveProp } from "@shopify/restyle";
import Box from "./Box";
import { BottomSheetModalProps } from "@gorhom/bottom-sheet";
import { SharedValue } from "react-native-reanimated";
import { useGetTheme } from "_hooks";

export type BottomSheetProps = Omit<BottomSheetModalProps, "snapPoints"> & {
  children: React.ReactNode;
  snapPoints?: (string | number)[] | SharedValue<(string | number)[]>;
};

const BottomSheet = React.forwardRef<BottomSheetModalMethods, BottomSheetProps>(
  ({ children, snapPoints, ...rest }, ref) => {
    const { colors, borderRadii, sizes, spacing } = useGetTheme();
    const _snapPoints = useMemo(
      () => snapPoints ?? ["60%", "90%"],
      [snapPoints],
    );
    const marginHorizontal = useResponsiveProp({
      base: spacing.spacingNONE,
      sm: spacing.spacingS,
      md: spacing.spacingM,
      lg: spacing.spacingL,
      xl: spacing.spacingXL,
    });

    const renderBackDrop = (_props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {..._props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    );

    return (
      <BottomSheetModal
        {...rest}
        ref={ref}
        snapPoints={_snapPoints}
        handleIndicatorStyle={{
          backgroundColor: colors.mainBackground,
          width: spacing.spacingL,
          marginBottom: spacing.spacingM,
        }}
        backdropComponent={renderBackDrop}
        backgroundStyle={{
          backgroundColor: colors.mainBackground,
          borderTopEndRadius: borderRadii.borderRadiiMD,
          marginHorizontal,
        }}
      >
        <Box flex={1}>{children}</Box>
      </BottomSheetModal>
    );
  },
);

export default BottomSheet;
