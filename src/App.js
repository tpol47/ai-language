import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import background from "./img/elf-king.png";
import captionsObj from './captions.js'


function App() {
  console.log('hello')
  const caption = "The tall elf king and his cat look at the heavenly kingdom beyond the horizon"
  const [options, setOptions] = useState([])
  const [to, setTo] = useState("en");
  const [from, setFrom] = useState("en");
  const [input, setInput] = useState(caption);
  const [output, setOutput] = useState("");
  const [display, setDisplay] = useState(false);
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
    });
    console.log('done')
  }, [])

  useEffect(() => {
    setDisplay(false)
    translate()
    console.log('translated')
  }, [to])

  const handleChange = (e) => {
    setTo(e.target.value) 
  }
  return (
    <div className="App-container">
      <div>
        <div className="Select">
          {/* From ({from}):
          <select onChange={e => setFrom(e.target.value) }>
            {options.map(opt => <option key={opt.code} value={opt.code}>{opt.name}</option>)}

          </select> */}
          Select language: ({to}):
          <select onChange={e => handleChange(e)}>
            {options.map(opt => <option key={opt.code} value={opt.code}>{opt.name}</option>)}

          </select>
        </div>
        {/* <div>
          <textarea cols='50' rows='8' onInput={(e) => setInput(e.target.value)}></textarea>
        </div>

        <div>
          <textarea cols='50' rows='8' value={output}></textarea>
        </div> */}

        {/* <div>
          <button onClick={e => translate()}>Translate</button>
        </div> */}

      </div>
      );
      <div className="App" style={{ backgroundImage: `url(${background})` }}>
        <div className="Caption">
          {output}
          <br />
          <button onClick={() => setDisplay(!display)}>Show translation</button>
          <br />
          {display && <div>{caption}</div>}
        </div>
      </div>
    </div>
  );
}

export default App;
