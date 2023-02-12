import React from 'react';
import './index.scss';
import { Collection } from './Collections';
import axios from 'axios';

const cats = [
  { "name": "All" },
  { "name": "Naruto" },
  { "name": "One Piece" },
  { "name": "Hunter X Hunter" },
]

function App() {
  const [categoryId, setCategoryId] = React.useState(0)
  const [page, setPage] = React.useState(1)
  const [isLoading, setIsLoading] = React.useState(true)
  const [searchValue, setSearchValue] = React.useState('')
  const [collections, setCollections] = React.useState([])

  React.useEffect(() => {
    setIsLoading(true)

    const category = categoryId ? `category=${categoryId}` : ''

    axios
      .get(`https://63e08d9159bb472a742402db.mockapi.io/photo_collections?page=${page}&limit=9&${category}`)
      .then(({ data }) => {
        setCollections(data)
      })
      .catch((err) => {
        console.log(err)
        alert('ERROR TO GET PHOTO')
      })
      .finally(() => setIsLoading(false))
  }, [categoryId, page])

  return (
    <div className="App">
      <h1>My favorite manga</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((obj, i) => (
            <li
              onClick={() => setCategoryId(i)}
              className={categoryId === i ? 'active' : ''}
              key={obj.name}>
              {obj.name}
            </li>
          ))}
        </ul>
        <input value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Search..."
        />
      </div>
      <div className="content">
        {isLoading ? <h2>Loading...</h2> :
          collections.filter(obj => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
            .map((obj, index) => (
              <Collection key={index} name={obj.name} images={obj.photos} />
            ))}
      </div>
      <ul className="pagination">
        {[...Array(2)].map((_, i) => (
          <li
            key={i}
            onClick={() => setPage(i + 1)}
            className={page === i + 1 ? 'active' : ''}>
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
