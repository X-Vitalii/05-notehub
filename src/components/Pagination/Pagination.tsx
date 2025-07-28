import React from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  onSubmit: (query: string) => void;
}
