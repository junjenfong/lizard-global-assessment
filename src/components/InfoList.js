import { useEffect, useState } from 'react';
import Table from './Components/Table';
import Loader from './Components/Loader';
function InfoList() {
  //data is original data from api call
  const [data, setData] = useState([]);

  //pageData is copy of data for filter/pagination purposes, and cloning to prevent too much api calling purposes
  const [pageData, setPageData] = useState([]);

  //for select dropdown dynamic data based on retrieved value
  const [availableCategories, setAvailableCategories] = useState([]);

  //trigger loading animation
  const [isLoading, setIsLoading] = useState(true);

  //pagination/filter elements
  const [currentPage, setCurrentPage] = useState(1);
  const offset = 10;
  const start = (currentPage - 1) * offset;
  const end = currentPage * offset;
  const [pageCount, setPageCount] = useState(0);
  const [filter, setFilter] = useState('');

  //retrieve initial data
  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((json) => {
        setData(json.posts);
        setPageData(json.posts.slice(start, end));
        setPageCount(Math.ceil(json.posts.length / offset) || 1);

        let uniqueCategory = [
          ...new Set(
            json.posts
              .flatMap((post) => post.categories)
              .map((category) => category.name)
          ),
        ];

        setAvailableCategories(uniqueCategory);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    handleFilter();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [filter]);

  useEffect(() => {
    setIsLoading(true);
    setPageData(data.slice(start, end));
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [currentPage]);

  function handleFilter() {
    const filteredData = filter
      ? data.filter((datum) =>
          datum.categories.some((category) => category.name === filter)
        )
      : data;
    const totalCount = filteredData.length;

    setCurrentPage(1);
    setPageCount(Math.ceil(totalCount / offset) || 1);
    setPageData(filteredData.slice(0, offset));
  }

  function onPageClick(page) {
    setCurrentPage(page);
  }

  function onPrevClick() {
    setCurrentPage(currentPage - 1);
  }

  function onNextClick() {
    setCurrentPage(currentPage + 1);
  }
  function applyFilter(e) {
    setFilter(e.target.value === 'DEFAULT' ? '' : e.target.value);
  }

  const categoryFilterOptions = availableCategories.map((c, i) => {
    return <option key={i}>{c}</option>;
  });
  return (
    <div>
      <h1>Info List</h1>
      <label>Filter By Categories: </label>
      <select onChange={applyFilter} defaultValue={'DEFAULT'}>
        <option value="DEFAULT">-- select an option --</option>
        {categoryFilterOptions}
      </select>
      {!isLoading ? (
        <Table
          currentPage={currentPage}
          pageData={pageData}
          data={data}
          applyFilter={applyFilter}
          onPageClick={onPageClick}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          pageCount={pageCount}
          offset={offset}
          className="main-content"
        />
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default InfoList;
