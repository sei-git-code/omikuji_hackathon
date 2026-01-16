import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8000/api/omikuji";

function App() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [showManagement, setShowManagement] = useState(false);
  const [newResultName, setNewResultName] = useState("");
  const [newResultOrder, setNewResultOrder] = useState("");

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/results`);
      setResults(response.data);
    } catch (error) {
      console.error("結果の読み込みに失敗しました:", error);
    }
  };

  const drawOmikuji = async () => {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/draw`, {});
      setResult(response.data.result);
    } catch (error) {
      console.error("おみくじを引くのに失敗しました:", error);
      alert("おみくじを引くのに失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  const addResult = async () => {
    if (!newResultName.trim()) {
      alert("結果名を入力してください");
      return;
    }
    try {
      const order = newResultOrder
        ? parseInt(newResultOrder)
        : results.length + 1;
      await axios.post(`${API_BASE_URL}/results`, {
        name: newResultName,
        displayOrder: order,
      });
      setNewResultName("");
      setNewResultOrder("");
      loadResults();
    } catch (error) {
      console.error("結果の追加に失敗しました:", error);
      alert("結果の追加に失敗しました");
    }
  };

  const deleteResult = async (id) => {
    if (!window.confirm("この結果を削除しますか？")) {
      return;
    }
    try {
      await axios.delete(`${API_BASE_URL}/results/${id}`);
      loadResults();
    } catch (error) {
      console.error("結果の削除に失敗しました:", error);
      alert("結果の削除に失敗しました");
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>おみくじ</h1>

        <div className="omikuji-section">
          <button
            className="draw-button"
            onClick={drawOmikuji}
            disabled={isLoading}
          >
            {isLoading ? "引いています..." : "おみくじを引く"}
          </button>

          {result && (
            <div className="result-display">
              <div className="result-text">{result}</div>
            </div>
          )}
        </div>

        <div className="management-section">
          <button
            className="toggle-button"
            onClick={() => setShowManagement(!showManagement)}
          >
            {showManagement ? "管理画面を閉じる" : "結果を管理する"}
          </button>

          {showManagement && (
            <div className="management-panel">
              <h2>結果の管理</h2>

              <div className="add-result-form">
                <input
                  type="text"
                  placeholder="結果名（例: 超吉）"
                  value={newResultName}
                  onChange={(e) => setNewResultName(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="表示順（省略可）"
                  value={newResultOrder}
                  onChange={(e) => setNewResultOrder(e.target.value)}
                />
                <button onClick={addResult}>追加</button>
              </div>

              <div className="results-list">
                <h3>現在の結果一覧</h3>
                <ul>
                  {results.map((item) => (
                    <li key={item.id}>
                      <span className="result-item-name">{item.name}</span>
                      <span className="result-item-order">
                        順序: {item.displayOrder}
                      </span>
                      <button
                        className="delete-button"
                        onClick={() => deleteResult(item.id)}
                      >
                        削除
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
