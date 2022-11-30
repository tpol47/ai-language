import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import background from "./img/elf-king.png";
import captionsObj from './captions.js'


function App() {
  const [options, setOptions] = useState([])
  const [to, setTo] = useState("en");
  const [from, setFrom] = useState("en");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const translate = () => {
    const params = new URLSearchParams();
    params.append('q', input);
    params.append('source', from);
    params.append('target', to);
    params.append('api_key', process.env.TRANSLATE_API_KEY);
    axios.post('https://libretranslate.de/translate', params, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    }).then(res => {
      console.log(res.data)
      setOutput(res.data.translatedText)
    })
  };
  useEffect(() => {
    axios.get("https://libretranslate.de/languages", { headers: { 'accept': 'application/json' } }).then(res => {
      console.log(res)
      setOptions(res.data)
    })
  })
  return (
    <div className="App-container">
      <div>
        <div>
          From ({from}):
          <select onChange={e => setFrom(e.target.value)}>
            {options.map(opt => <option key={opt.code} value={opt.code}>{opt.name}</option>)}

          </select>
          To({to}):
          <select onChange={e => setTo(e.target.value)}>
            {options.map(opt => <option key={opt.code} value={opt.code}>{opt.name}</option>)}

          </select>
        </div>
        <div>
          <textarea cols='50' rows='8' onInput={(e) => setInput(e.target.value)}></textarea>
        </div>

        <div>
          <textarea cols='50' rows='8' value={output}></textarea>
        </div>

        <div>
          <button onClick={e => translate()}>Translate</button>
        </div>

      </div>
      );
      <div className="App" style={{ backgroundImage: `url(${background})` }}>
        <div className="Caption">
          <div>El rey elfo alto y su gato miran el reino celestial más allá del horizonte</div>
          <button>Translate</button>
          <br />
          {captionsObj['elf-king.png']}
        </div>
      </div>
    </div>
  );
}

export default App;
