import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
function Details() {
  const infoId = useParams().infoId || '';
  const [infoDetails, setInfoDetails] = useState({
    author: { name: '', avatar: '' },
    categories: [{ name: '', id: '' }],
  });
  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((json) => {
        const infoById = json.posts.filter((datum) => datum.id === infoId);
        setInfoDetails(infoById[0]);
      });
  }, []);

  function dynamicColorFormatting(categoryName) {
    let splitted = categoryName.replace(/\s+/g, '-').toLowerCase();
    return splitted;
  }

  const categoryRow = infoDetails.categories.map((category, i) => {
    return (
      <button
        key={i}
        className={'category-button ' + dynamicColorFormatting(category.name)}
      >
        {category.name}
      </button>
    );
  });

  return (
    <div>
      <p>Name: {JSON.stringify(infoDetails.author.name)}</p>

      <p>
        Avatar: <img src={infoDetails.author.avatar}></img>
      </p>
      <p>{infoDetails.publishDate}</p>
      <p>{infoDetails.summary}</p>

      <p>{infoDetails.title}</p>
      <p>{categoryRow}</p>
    </div>
  );
}

export default Details;
