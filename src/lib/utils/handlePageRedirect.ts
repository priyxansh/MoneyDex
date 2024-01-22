"use server";

import { redirect } from "next/navigation";

type Options = {
  page: number;
  perPage: number;
  redirectURL: string;
};

export const handlePageRedirect = ({ page, perPage, redirectURL }: Options) => {
  if (isNaN(page) || isNaN(perPage)) {
    return redirect(redirectURL);
  }

  if (page < 1 || perPage < 1) {
    return redirect(redirectURL);
  }
};
