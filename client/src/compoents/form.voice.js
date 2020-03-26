import React, { useState } from "react";
import { getAudioInfo } from "../services/service.apiAudio";
import { Grid } from "@material-ui/core";

function FormImage() {
  const [file, setFile] = useState(undefined);
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
          <div className="title"> 1) Seleccionar Audio</div>
          <hr />
          <Grid container>
            <Grid item xs={12}>
              <input
                id="inputFile"
                type="file"
                accept="audio/*"
                onChange={e => {
                  const files = Array.from(e.target.files);
                  setFile(files);
                }}
                capture="microphone"
              />
              <label htmlFor="inputFile">
                {file ? file[0].name : "Subir Archivo"}
              </label>
            </Grid>
            <Grid item xs={12} className="buttonActions">
              <button type="submit" onClick={() => sendImage(file)}>
                Send
              </button>
              <button onClick={() => clear()}>Clear</button>
            </Grid>
            <Grid item xs={12} className="text">
              {result.details && result.details}
              {!result.details &&
                result.transcription && (
                  <>
                    <div className="title"> 2) Transcripción de Audio</div>
                    <hr />
                    {result.transcription}
                  </>
                )}
            </Grid>
            <Grid item xs={12} className="text">
              {!result.details &&
                result.sentiment && (
                  <>
                    <div className="title"> 3) Análisis del Texto</div>
                    <hr />
                    <Grid container>
                      <Grid item xs={6}>
                        {!result.details &&
                          result.sentiment && (
                            <>
                              Sentimiento escore -1 al 1
                              <p>{result.sentiment.score}</p>
                            </>
                          )}
                      </Grid>
                      <Grid item xs={6} className="text">
                        {!result.details &&
                          result.entities && (
                            <>
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
                  </>
                )}
            </Grid>
          </Grid>
        </div>
      </Grid>
      <Grid item xs={3} />
    </Grid>
  );
}

export default FormImage;
