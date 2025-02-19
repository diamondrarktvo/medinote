import { useState } from "react";

import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import { ThemeCodeSupportedT } from "_utils";
import { useAppDispatch } from "_store";
import { setTheme } from "../themeSlice";

export const useChangeTheme = (theme: ThemeCodeSupportedT) => {
  const [selected, setSelected] = useState(theme);
  const { dismiss } = useBottomSheetModal();
  const dispatch = useAppDispatch();

  const onConfirm = () => {
    dispatch(setTheme(selected));
    dismiss();
  };

  return { setSelected, onConfirm, selected };
};
