import { useState, useEffect } from "react";

type CoinData = {
  id: string;
  name: string;
  quotes: {
    USD: {
      price: number;
    };
  };
  symbol: string;
};

function App() {
  const [loading, setloading] = useState<boolean>(true);
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [id, setId] = useState<string>("");
  const [symbol, setSymbol] = useState<string>("");
  const [price, setPrice] = useState<number>();

  function roundPrice(price: number) {
    if (price) {
      const newPrice: number = Math.round(price);
      setPrice(newPrice);
    }
  }

  function searchBit(bitname: string) {
    coins.map((v: CoinData) => {
      if (v.name === bitname) {
        setId(v.id);
        setSymbol(v.symbol);
        roundPrice(v.quotes.USD.price);
      }
    })
  }

  function selectOnClick(event: React.ChangeEvent<HTMLSelectElement>) {
    searchBit(event.target.value);
  }

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setloading(false);
        console.log(json);
      })
  }, []);

  useEffect(() => {
    if (!loading) {
      searchBit("Bitcoin");
    }

  }, [loading]);

  return (
    <div>
      {/* loading */}
      <h1>{loading ? "loading..." : ""}</h1>
      {/* select */}
      <select
        onChange={selectOnClick}
      >
        {coins.map((v: CoinData) => {
          return (
            <option key={v.id}>{v.name}</option>
          )
        })}
      </select>
      {/* view */}
      {loading ? "" : <div>
        <div className="id">코인 이름 : {id}</div>
        <div className="price">가격 : {price} USD</div>
        <div className="symbol">symbol : {symbol}</div>
      </div>}
    </div>
  )


}


export default App;


