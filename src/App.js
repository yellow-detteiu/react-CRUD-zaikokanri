import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [count, setCount] = useState("");
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");

  const submittable = (name !== "") & (price !== "") & (count !== "");
  const [isDisabled, setIsDisabled] = useState("ui disabled button");
  const [isError, setIsError] = useState("ui input error");

  function handleInputNameChange(e) {
    setName(e.target.value);
  }
  function handleInputPriceChange(e) {
    setPrice(e.target.value);
  }
  function handleInputCountChange(e) {
    setCount(e.target.value);
  }
  function handleInputDateChange(e) {
    setDate(e.target.value);
  }
  function handleInputCommentChange(e) {
    setComment(e.target.value);
  }

  function handleFormSubmit(e) {
    // 初期状態から入力欄の内容がリストに追加されるのを防ぐ
    e.preventDefault();

    if (submittable) {
      setItems([
        ...items,
        {
          id: items.length + 1,
          // 入力された内容から、空白を削除
          name: name.trim(),
          price: price.trim(),
          count: count.trim(),
          date: date.trim(),
          comment: comment
        }
      ]);
    }

    // 登録後、各入力欄を初期値に戻す
    setName("");
    setPrice("");
    setCount("");
    setDate("");
    setComment("");
    setIsDisabled("ui disabled button");
    setIsError("ui input error");
  }

  useEffect(() => {
    if (submittable) {
      setIsDisabled("ui primary button");
      setIsError("ui input");
    }
  }, [name, price, count]);

  return (
    <div className="App">
      <div className="ui container">
        <br />
        <h1 style={{ color: "maroon" }}>在庫管理システム</h1>
        <form
          style={{
            textAlign: "left",
            margin: "50px 20px"
          }}
        >
          <div className={isError}>
            商品名　　：　
            <input
              name="name"
              type="text"
              placeholder="商品名を入力してください"
              value={name}
              onChange={handleInputNameChange}
              style={{ width: "230px" }}
            />
          </div>
          <br />
          <div className={isError}>
            値段　　　：　
            <input
              name="price"
              type="number"
              placeholder="値段を入力してください"
              value={price}
              onChange={handleInputPriceChange}
              style={{ width: "230px" }}
            />
          </div>
          <br />
          <div className={isError}>
            在庫数　　：　
            <input
              name="count"
              type="number"
              placeholder="在庫数を入力してください"
              value={count}
              onChange={handleInputCountChange}
              style={{ width: "230px" }}
            />
          </div>
          <br />
          最終入荷日：　
          <input
            name="date"
            type="date"
            placeholder="最終入荷日を入力してください"
            value={date}
            onChange={handleInputDateChange}
          />
          <br />
          備考　　　：　
          <textarea
            name="comment"
            placeholder="備考を入力してください"
            value={comment}
            onChange={handleInputCommentChange}
            style={{ width: "300px", height: "50px" }}
          />
          <br />
          <button
            type="submit"
            onClick={handleFormSubmit}
            className={isDisabled}
            style={{ width: "200px", height: "40px", marginTop: "30px" }}
          >
            在庫情報を登録する
          </button>
        </form>

        <ul className="item-list">
          <table border="1">
            <tr>
              <th>id</th>
              <th>商品名</th>
              <th>値段</th>
              <th>在庫数</th>
              <th>最終入荷日</th>
              <th>備考</th>
            </tr>
            {items.map((item) => (
              <tr>
                <th>{item.id}</th>
                <th>{item.name}</th>
                <th>{item.price}</th>
                <th>{item.count}</th>
                <th>{item.date}</th>
                <th style={{ textAlign: "left" }}>{item.comment}</th>
              </tr>
            ))}
          </table>
          {/* {names.map((name) => (
          <li key={name.id}>{name.text}</li>
        ))} */}
        </ul>
      </div>
    </div>
  );
}
