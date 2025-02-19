import React, { useMemo } from "react";

import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalProps } from "@gorhom/bottom-sheet";
import { SharedValue } from "react-native-reanimated";
import { useGetTheme } from "_hooks";

export type BottomSheetProps = Omit<BottomSheetModalProps, "snapPoints"> & {
  children: React.ReactNode;
  snapPoints?: (string | number)[] | SharedValue<(string | number)[]>;
};

const BottomSheet = React.forwardRef<BottomSheetModal, BottomSheetProps>(
  ({ children, snapPoints, ...rest }, ref) => {
    const { colors, spacing } = useGetTheme();

    const _snapPoints = useMemo(() => snapPoints ?? [1, "40%"], [snapPoints]);

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
        index={1}
        snapPoints={_snapPoints}
        handleIndicatorStyle={{
          backgroundColor: colors.primary,
          width: spacing.spacingXXL,
        }}
        backdropComponent={renderBackDrop}
      >
        <BottomSheetView
          style={{
            flex: 1,
          }}
        >
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

export default BottomSheet;
