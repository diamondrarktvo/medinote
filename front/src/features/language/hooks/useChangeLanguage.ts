import { useState } from "react";

import i18next from "i18next";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import { LanguageCodeSupportedT } from "_utils";

export const useChangeLanguage = (language: LanguageCodeSupportedT) => {
  const [selected, setSelected] = useState(language);
  const { dismiss } = useBottomSheetModal();

  const onConfirm = () => {
    i18next.changeLanguage(selected).then(() => {
      dismiss();
    });
  };

  return { setSelected, onConfirm, selected };
};
