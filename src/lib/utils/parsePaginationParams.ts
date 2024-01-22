type Options = {
  page?: string;
  perPage?: string;
};

export const parsePaginationParams = ({ page, perPage }: Options) => {
  const parsedPage = page ? +page : 1;
  const parsedPerPage = perPage ? +perPage : 10;

  return {
    parsedPage,
    parsedPerPage,
  };
};
