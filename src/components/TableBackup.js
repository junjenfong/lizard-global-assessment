import { useEffect, useState, useMemo } from 'react';
import Pagination from './Pagination';
function Table() {
  //data is original data from api call
  let [data, setData] = useState([]);

  //tableData is copy of data for filter/pagination purposes, and cloning to prevent too much api calling purposes
  let [tableData, setTableData] = useState([]);

  let [availableCategories, setAvailableCategories] = useState([]);
  let [filter, setFilter] = useState('');

  let [showCount, setShowCount] = useState(10);

  let [loading, setLoading] = useState(true);
  //retrieve initial data
  useEffect(() => {
    setLoading(true);
    fetch('/api/posts')
      .then((res) => res.json())
      .then((json) => {
        setData(json.posts);
        setTableData(json.posts);
        let uniqueCategory = [];
        json.posts.forEach((post) => {
          post.categories.filter((p) => {
            if (!uniqueCategory.includes(p.name)) {
              uniqueCategory.push(p.name);
            }
          });
        });

        setAvailableCategories(uniqueCategory);
        setLoading(false);
      });
  }, []);

  //data after applying filter
  useEffect(() => {
    let filterMatchedData = [];
    //filter data based on the filter applied, add if to execute only when it has data
    if (data) {
      data.forEach((post) => {
        post.categories.filter((p) => {
          if (p.name.includes(filter)) {
            filterMatchedData.push(post);
          }
        });
      });

      //spotted some duplicating data on certain filter, apply removing duplicate value before pushing to state value
      setTableData([...new Set(filterMatchedData)]);
      if (showCount !== 10) {
        setShowCount(10);
      }
    }
  }, [filter]);

  // useEffect(() => {
  //   const copyData = [...tableData];
  //   if (copyData >= 10) {
  //     copyData.splice(10);
  //   }
  //   setTableData(copyData);
  // }, [tableData]);

  function applyFilter(e) {
    setFilter(e.target.value);
  }
  function loadMoreButton() {
    console.log('do ntg now');
    setShowCount(showCount + 10);
  }

  return (
    <div>
      <label>Filter By Categories: </label>
      <select onChange={applyFilter} defaultValue={'DEFAULT'}>
        <option disabled value="DEFAULT">
          -- select an option --
        </option>

        {availableCategories.map((c, i) => (
          <option key={i}>{c}</option>
        ))}
      </select>
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
          {tableData.slice(0, showCount).map((user, index) => (
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
          ))}
        </tbody>
      </table>
      {showCount < tableData.length && (
        <div stlye="dispaly: flex; align-items: center">
          <button onClick={loadMoreButton}>Load More</button>
        </div>
      )}
    </div>
  );
}

export default Table;
