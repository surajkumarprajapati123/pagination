import "./styles.css";
import { useEffect, useState } from "react";

export default function App() {
  const [products, setproduct] = useState([]);
  const [page, setpage] = useState(1);
  const startPage = page * 10 - 10;
  const NextPage = page * 10;
  const locationpage = products.slice(startPage, NextPage);
  const fetcheProduct = async () => {
    const data = await fetch("https://dummyjson.com/products");
    const res = await data.json();
    if (res && res.products) {
      setproduct(res.products);
    }
  };
  useEffect(() => {
    fetcheProduct();
  }, []);
  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage !== page
    ) {
      setpage(selectedPage);
    }
  };
  return (
    <div className="App">
      <h1>App compontens</h1>
      {products.length > 0 && (
        <div className="products">
          {locationpage.map((prod) => {
            return (
              <span className="products__single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} /> {/* alt is imp */}
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}

      {products.length > 0 && (
        <div className="pagination">
          <span
            onClick={() => selectPageHandler(page - 1)}
            className={page > 1 ? "" : "pagination__disable"}
          >
            ◀
          </span>

          {[...Array(products.length / 10)].map((_, i) => {
            return (
              <span
                key={i}
                className={page === i + 1 ? "pagination__selected" : ""}
                onClick={() => selectPageHandler(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}

          <span
            onClick={() => selectPageHandler(page + 1)}
            className={page < products.length / 10 ? "" : "pagination__disable"}
          >
            ▶
          </span>
        </div>
      )}
    </div>
  );
}
