// import React from "react";

// function Pagination({ currentPage, totalPages, onPageChange }) {

//     // Go to selected page
//     const goToPage = (page) => {
//         if (page >= 1 && page <= totalPages) {
//             onPageChange(page);
//         }
//     };

//     // All page numbers list
//     const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

//     // Pre-rendered page number elements
//     const renderedPageButtons = pageNumbers.map((pageNum) => (
//         <li
//             key={pageNum}
//             className={`page-item ${currentPage === pageNum ? "active" : ""}`}
//         >
                
//             <button className="page-link" onClick={() => goToPage(pageNum)}>
//                 {pageNum}
//             </button>
//         </li>
//     ));

    
//     return (
//         <>
//             <div className="pagination-container d-flex justify-content-center mt-4">
//                 <ul className="pagination modern-pagination">

//                     {/* Prev Button */}
//                     <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
//                         <button className="page-link" onClick={() => goToPage(currentPage - 1)}>
//                             ◀ Prev
//                         </button>
//                     </li>

//                     {/* Page Buttons (Rendered Outside) */}
//                     {renderedPageButtons}

//                     {/* Next Button */}
//                     <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
//                         <button className="page-link" onClick={() => goToPage(currentPage + 1)}>
//                             Next ▶
//                         </button>
//                     </li>

//                 </ul>
//             </div>
//         </>
//     );
// }

// export default Pagination;