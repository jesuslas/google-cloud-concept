import React, { useState } from "react";
import { getAudioInfo } from "../services/service.apiAudio";
import { Grid } from "@material-ui/core";

function FormImage() {
  const [file, setFile] = useState([]);
  const [result, setResult] = useState([]);
  // const [currentDay, setCurrentDay] = useState([]);
  const clear = () => {
    setResult([]);
  };
  const sendImage = async file => {
    clear();
    try {
      let _result = await getAudioInfo(file);
      _result = await _result.json();
      console.log("result", _result);
      setResult(_result);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Grid container justify="center">
      <Grid item xs={3} />
      <Grid item xs={6}>
        <div className="container">
          <div>Seleccionar Audio</div>

          <hr />

          <Grid container>
            <Grid item xs={12}>
              <input
                type="file"
                accept="audio/*"
                onChange={e => {
                  const files = Array.from(e.target.files);
                  setFile(files);
                }}
                capture="microphone"
              />
            </Grid>
            <Grid item xs={12}>
              <button type="submit" onClick={() => sendImage(file)}>
                Send
              </button>
              <button onClick={() => clear()}>Clear</button>
            </Grid>
            <Grid item xs={12}>
              {result.details && result.details}
              {!result.details && result.transcription && result.transcription}
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={6}>
                  {!result.details &&
                    result.sentiment && (
                      <>
                        <hr />
                        Sentimiento escore -1 al 1
                        <p>{result.sentiment.score}</p>
                      </>
                    )}
                </Grid>
                <Grid item xs={6}>
                  {!result.details &&
                    result.entities && (
                      <>
                        <hr />
                        Entidades
                        <ul>
                          {result.entities.map((ent, i) => (
                            <li key={i}>{ent.name}</li>
                          ))}
                        </ul>
                      </>
                    )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Grid>
      <Grid item xs={3} />
    </Grid>
  );
}

export default FormImage;
