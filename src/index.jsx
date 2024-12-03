import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const zodiacSigns = [
  { name: "Aries", image: "aries.png" },
  { name: "Taurus", image: "taurus.png" },
  { name: "Gemini", image: "gemini.png" },
  { name: "Cancer", image: "cancer.png" },
  { name: "Leo", image: "leo.png" },
  { name: "Virgo", image: "virgo.png" },
  { name: "Libra", image: "libra.png" },
  { name: "Scorpio", image: "scorpio.png" },
  { name: "Sagittarius", image: "sagittarius.png" },
  { name: "Capricorn", image: "capricorn.png" },
  { name: "Aquarius", image: "aquarius.png" },
  { name: "Pisces", image: "pisces.png" },
];

const generatePredictions = () => {
  const predictions = [
    "Сьогодні ідеальний день для нових починань!",
    "Вам усміхнеться удача.",
    "Слідуйте за своїм серцем.",
    "День буде наповнений позитивом.",
    "Очікуйте приємний сюрприз.",
    "Можливі нові знайомства.",
    "Ваші старання скоро винагородяться.",
    "Приділіть час собі та відпочинку.",
  ];

  return zodiacSigns.map((sign) => ({
    ...sign,
    prediction: predictions[Math.floor(Math.random() * predictions.length)],
  }));
};

const App = () => {
  const [zodiacs, setZodiacs] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const stored = localStorage.getItem("dailyPredictions");
    if (!stored || JSON.parse(stored).date !== today) {
      const newPredictions = generatePredictions();
      localStorage.setItem(
        "dailyPredictions",
        JSON.stringify({ date: today, data: newPredictions })
      );
      setZodiacs(newPredictions);
    } else {
      setZodiacs(JSON.parse(stored).data);
    }
  }, []);

  return (
    <div className="container">
      <h1>Щоденні передбачення знаків зодіаку</h1>
      <div className="zodiac-grid">
        {zodiacs.map((sign, index) => (
          <div
            key={index}
            className="zodiac-card"
            onClick={() => setSelected(sign)}
          >
            <img
              src={`images/${sign.image}`}
              alt={sign.name}
              className="zodiac-image"
            />
            <div className="zodiac-name">{sign.name}</div>
          </div>
        ))}
      </div>
      {selected && (
        <div className="prediction visible">
          <h2>{selected.name}</h2>
          <p>{selected.prediction}</p>
          <button onClick={() => setSelected(null)}>Закрити</button>
        </div>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
