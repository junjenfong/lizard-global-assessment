import { Link } from 'react-router-dom';
function Table(props) {
  let pageData = props.pageData || [];
  let currentPage = props.currentPage;
  let offset = props.offset;
  let pageCount = props.pageCount || 1;

  const pages = [];
  //to make an array for total number of pages
  for (let x = 1; x <= pageCount; x++) {
    pages.push(x);
  }

  function handlePrevClick() {
    props.onPrevClick();
  }

  function handleNextClick() {
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

  const tableRows = pageData.map((info, index) => {
    return (
      <tr key={index}>
        <td>{offset * (currentPage - 1) + index + 1}</td>
        <td>{info.title}</td>
        <td>{info.summary}</td>

        <td>
          {info.categories.map((category, index) => (
            <button
              key={index}
              className={
                'category-button ' + dynamicColorFormatting(category.name)
              }
            >
              {category.name}
            </button>
          ))}
        </td>

        <td>{info.publishDate}</td>
        <td>{info.author.name}</td>
        <td>
          <Link to={`/details/${info.id}`}>View details</Link>
        </td>
      </tr>
    );
  });

  function dynamicColorFormatting(categoryName) {
    let splitted = categoryName.replace(/\s+/g, '-').toLowerCase();
    return splitted;
  }

  return (
    <div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Summary</th>
              <th>Categories</th>
              <th>Publish Date</th>
              <th>Author</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
      <ul className="pagination">
        {currentPage > 1 && (
          <li onClick={handlePrevClick} className="cursor-btn">
            ❮
          </li>
        )}

        {pageNumbers}
        {currentPage !== pages[pages.length - 1] && (
          <li onClick={handleNextClick}> ❯</li>
        )}
      </ul>
    </div>
  );
}

export default Table;
