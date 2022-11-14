import { useEffect, useState, useMemo } from 'react';
import Pagination from './Pagination';

function Table() {
  //data is original data from api call
  let [data, setData] = useState([]);

  //tableData is copy of data for filter/pagination purposes, and cloning to prevent too much api calling purposes
  let [tableData, setTableData] = useState([]);

  //for select dropdown dynamic data based on retrieved value
  let [availableCategories, setAvailableCategories] = useState([]);

  //trigger loading animation
  let [loading, setLoading] = useState(false);

  //pagination elements
  let [currentPage, setCurrentPage] = useState(1);
  let offset = 10;
  let start = (currentPage - 1) * offset;
  let end = currentPage * offset;
  let [totalPage2, setTotalPage2] = useState(0);
  let [filter, setFilter] = useState('');

  //retrieve initial data
  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((json) => {
        setData(json.posts);
        setTableData(json.posts.slice(start, end));
        setTotalPage2(json.posts.length);
        let uniqueCategory = [];
        json.posts.forEach((post) => {
          post.categories.filter((p) => {
            if (!uniqueCategory.includes(p.name)) {
              uniqueCategory.push(p.name);
            }
          });
        });
        setAvailableCategories(uniqueCategory);
        // setCurrentPage(1);
      });
  }, []);

  //   useEffect(() => {
  //     //slice data
  //     //to trim data for pagination purposes
  //     // setTableData(data.slice(start, end));
  //   }, [currentPage]);
  //   useEffect(() => {

  //   }, [filter, currentPage])

  useEffect(() => {
    handleFilter();
    // setCurrentPage(1);
  }, [filter]);

  useEffect(() => {
    setTableData(data.slice(start, end));
  }, [currentPage]);

  function handleFilter() {
    let filterMatchedData = [];
    console.log(filter);
    if (!filter) {
      console.log('ntg');
      data.forEach((post) => {
        filterMatchedData.push(post);
      });
      setTotalPage2(filterMatchedData.length);
    }
    if (data && filter) {
      data.forEach((post) => {
        post.categories.filter((p) => {
          if (p.name.match(filter)) {
            filterMatchedData.push(post);
          }
        });
      });
      setCurrentPage(1);
      setTotalPage2(filterMatchedData.length);
    }

    //spotted some duplicating data on certain filter, apply removing duplicate value before pushing to state value
    setTableData([...new Set(filterMatchedData)]);
  }

  function onPageClick(page) {
    setCurrentPage(page);
  }

  function onPrevClick() {
    setCurrentPage(currentPage - 1);
  }

  function onNextClick() {
    // console.log(currentPage);
    //will trigger bug if more than maximum allowed
    // if (currentPage + 1 > Math.ceil(totalPages / offset))
    setCurrentPage(currentPage + 1);
  }
  function applyFilter(e) {
    setFilter(e.target.value === 'DEFAULT' ? '' : e.target.value);
  }

  return (
    <div>
      <h1>Info List</h1>
      <label>Filter By Categories: </label>
      <select onChange={applyFilter} defaultValue={'DEFAULT'}>
        <option value="DEFAULT">-- select an option --</option>

        {availableCategories.map((c, i) => (
          <option key={i}>{c}</option>
        ))}
      </select>

      {!loading ? (
        <Pagination
          currentPage={currentPage}
          tableData={tableData}
          data={data}
          applyFilter={applyFilter}
          onPageClick={onPageClick}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          totalPage2={totalPage2}
          offset={offset}
          className="main-content"
        />
      ) : (
        <div className="loader"></div>
      )}
    </div>
  );
}

export default Table;
