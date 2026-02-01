import { useMemo } from "react";

export default function usePagination({ currentPage, totalPages }) {

  const pageNumbers = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [totalPages]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      return page;
    }
    return currentPage;
  };

  return { pageNumbers, goToPage };
}
