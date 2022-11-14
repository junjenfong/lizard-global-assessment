import { useEffect } from 'react';

function Pagination(props) {
  let currentPage = props.currentPage;
  let tableData = props.tableData || [];
  let totalPages = props.tableData.length || 1;
  let offset = props.offset;
  let totalPage2 = props.totalPage2 || 1;

  //   let data = props.data.length;
  const pages = [];
  //to make an array for total number of pages
  for (let x = 1; x <= Math.ceil(totalPage2 / offset); x++) {
    pages.push(x);
  }

  function handlePrevClick() {
    props.onPrevClick();
  }

  function handleNextClick() {
    //will trigger bug if more than maximum allowed
    // if(currentPage + 1 > )
    console.log(pages.length, currentPage);
    props.onNextClick();
  }

  function handlePageClick(e) {
    props.onPageClick(Number(e.target.id));
  }

  const pageNumbers = pages.map((page) => {
    return (
      <li
        key={page}
        id={page}
        onClick={handlePageClick}
        className={currentPage === page ? 'active' : null}
      >
        {page}
      </li>
    );
  });
  return (
    <div>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Summary</th>
              <th>Categories</th>
              <th>Publish Date</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.title}</td>
                  <td>{user.summary}</td>

                  <td>
                    {user.categories.map((category, index) => (
                      <button key={index} className="category-button ">
                        {category.name}
                      </button>
                    ))}
                  </td>

                  <td>{user.publishDate}</td>
                  <td>{user.author.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* <ol>
          {tableData.map((user, index) => {
            return <li key={index}>{user.title}</li>;
          })}
        </ol> */}
      </div>
      <ul>
        <li>
          {pages[0]}
          <button onClick={handlePrevClick} disabled={currentPage === pages[0]}>
            Prev
          </button>
        </li>
        {pageNumbers}
        <li>
          {pages.length}
          <button
            onClick={handleNextClick}
            disabled={currentPage === pages[pages.length - 1]}
          >
            NExt
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
