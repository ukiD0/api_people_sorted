import React from "react";
import { Collection } from "./collection";
import './index.css'

  const cats = [
    {"sex":"all"},
    {"sex":"true"}, //female
    {"sex":"false"} //male
  ] 

function App() {

  const[categoryId, setCategoryID] = React.useState(0); //sex
  const[page, setPage] = React.useState(1); //cтраницы
  const[isLoading, setIsLoading] = React.useState(true); //загрузка
  const[searchValue, setSearchValue] =React.useState(''); //poisk
  const[collection, setCollection] = React.useState([]);

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId ? `sex=${cats[categoryId]["sex"]}` : '' ;
    fetch(`https://6533a863e1b6f4c590461afe.mockapi.io/user?limit=8&${category}`)
    //
    //console.log(url);
    .then((res) => res.json())
    .then((json) => {
      console.log(Object.keys(json).l)
      setCollection(json); 
    })
    .catch((err) => {
      console.warn(err);
      alert('Ошибка получения данных')
    }).finally(() => setIsLoading(false));
  }, [categoryId, page]);

  return (
    <div className="App">
      <h1 className="h1">ВсеКонтактыРУ</h1> 
      <div className="top">
        <ul className="tags">
        {
            cats.map((obj, i) => (
              <li onClick={() => setCategoryID(i)} className={categoryId === i ? 'active' : ''}
                key={obj.name}>{categoryId}</li>            
            ))}
        </ul>
        <input
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Поиск name and surname"/>
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Идет загрузка</h2>
        ) : (
          collection
            .filter((obj) =>  obj.name.toLowerCase().includes(searchValue.toLowerCase())))
            .map((obj, index) => <Collection key={index} name={obj.name} images={obj.images} 
            sex={obj.sex ? "femele" : "male"} 
            country={obj.country}/>
          )}
      </div> 

      <ul className="pagination"> 
        {[...Array(5)].map((_,i) => (
            <li onClick={() => setPage(i + 1)} className= {page === i + 1 ? 'active' : ''}>
              {i + 1}
            </li>
          ))}
      </ul>
    </div>
  );
}


export default App;
