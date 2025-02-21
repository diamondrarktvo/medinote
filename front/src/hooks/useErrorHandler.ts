import { ErrorResponse } from "_utils";
import { Helpers } from "./../utils/helper";
import { useEffect, useState } from "react";

export const useErrorHandler = (initialError: ErrorResponse | null = null) => {
  const [error, setError] = useState<ErrorResponse | null>(initialError);

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [error]);

  const handleError = (err: any) => {
    if (isErrorResponse(err)) {
      const message = err.data.success
        ? "Une erreur inattendue s'est produite."
        : err.data.message;
      Helpers.showToast("error", message);
    } else if (err instanceof Error) {
      Helpers.showToast("error", err.message);
    } else if (typeof err === "string") {
      Helpers.showToast("error", err);
    } else {
      Helpers.showToast("error", "Une erreur inconnue s'est produite.");
    }
  };

  return;
};

function isErrorResponse(error: any): error is ErrorResponse {
  return (
    typeof error === "object" &&
    error !== null &&
    typeof error.data === "object" &&
    error.data !== null &&
    typeof error.data.message === "string" &&
    typeof error.data.success === "boolean" &&
    typeof error.status === "number"
  );
}
