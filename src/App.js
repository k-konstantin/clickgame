import React, { useState, useEffect } from 'react';
import gameanalytics from 'gameanalytics';

import logo from './logo.svg';
import './App.css';

gameanalytics.GameAnalytics.setEnabledInfoLog(true);
gameanalytics.GameAnalytics.setEnabledVerboseLog(true);

gameanalytics.GameAnalytics.configureBuild('web 0.0.1');

const gameKey = '87ff79f8e1200a35c72df432872eb2e0';
const secretKey = '66dbbe2fc92c7603ed67de1a8d28bf2a365de316';

gameanalytics.GameAnalytics.initialize(gameKey, secretKey);

function App() {
  const [clickedCount, setClick] = useState(0)
  const [level, setLevel] = useState(1)

  useEffect(() => {
    gameanalytics.GameAnalytics.addProgressionEvent(gameanalytics.EGAProgressionStatus.Start, 'level' + level);
    if (level > 1) {
      gameanalytics.GameAnalytics.addProgressionEvent(gameanalytics.EGAProgressionStatus.Complete, 'level' + (level - 1));
    }
  }, [level]);

  useEffect(() => {
    setTimeout(() => {
      gameanalytics.GameAnalytics.addDesignEvent('resource:used');
    }, 60000)
  }, [])

  const onLogoClick = () => {
    gameanalytics.GameAnalytics.addDesignEvent('clickButton:logo', 1);
    const nextClickedCount = clickedCount + 1;
    if (nextClickedCount === 10) {
      setLevel(level + 1);
      setClick(0);
    } else {
      setClick(nextClickedCount);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img onClick={onLogoClick} src={logo} className="App-logo" alt="logo" />
        <p>
          Click React Logo 10 times to win.
        </p>
        <p>
          Level {level}
        </p>
        <p>
          Clicked count = {clickedCount}
        </p>
      </header>
    </div>
  );
}

export default App;
