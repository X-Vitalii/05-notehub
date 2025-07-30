import React from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  onSubmit: (query: string) => void;
}

const [currentPage, setCurrentPage] = useState(1);

const queryData = useQuery({
  queryKey: ["articles", topic, currentPage],
});
