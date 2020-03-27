import React, { useState } from "react";
import { getAudioInfo } from "../services/service.apiAudio";
import { Grid, CircularProgress } from "@material-ui/core";

function FormImage() {
  const [file, setFile] = useState(undefined);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const clear = () => {
    setResult([]);
  };
  const sendImage = async file => {
    clear();
    setLoading(true);
    try {
      let _result = await getAudioInfo(file);
      _result = await _result.json();
      setResult(_result);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };
  return (
    <Grid container justify="center">
      <Grid item xs={1} md={3} xl={3} />
      <Grid item xs={10} md={6} xl={6}>
        <div className="container">
          <div className="title"> 1) Seleccionar Audio</div>
          <div className="subtitle">
            {" "}
            - Solo admite formatos de audio (OPUS, MP3, FLAC, WAV) maxima
            duración 15m
          </div>
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
              />
              <label htmlFor="inputFile">
                {file && file[0] ? file[0].name : "Subir Archivo"}
              </label>
            </Grid>
            <Grid item xs={12} className="buttonActions">
              <button type="submit" onClick={() => sendImage(file)}>
                Enviar
              </button>
              <button onClick={() => clear()}>Borar</button>
            </Grid>
            <Grid item xs={12}>
              <div className="title"> {result.error && result.error}</div>
              {!result.details && result.transcription ? (
                <>
                  <Grid item xs={12} className="text">
                    <div className="title"> 2) Transcripción de Audio</div>
                    <hr />
                    {result.transcription}
                  </Grid>
                  <Grid item xs={12} className="text">
                    {!result.details &&
                      result.sentiment && (
                        <>
                          <div className="title"> 3) Análisis del Texto</div>
                          <hr />
                          <Grid container>
                            <Grid item xs={12} md={6} xl={6}>
                              {!result.details &&
                                result.sentiment && (
                                  <>
                                    <div className="title">
                                      {" "}
                                      - Sentimiento escore -1 al 1
                                    </div>
                                    <p>{result.sentiment.score}</p>
                                  </>
                                )}
                            </Grid>
                            <Grid item xs={12} md={6} xl={6} className="text">
                              {!result.details &&
                                result.entities && (
                                  <>
                                    <div className="title"> - Entidades</div>
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
                </>
              ) : (
                loading && <CircularProgress color="secondary" />
              )}
            </Grid>
          </Grid>
        </div>
      </Grid>
      <Grid item xs={1} md={3} xl={3} />
    </Grid>
  );
}

export default FormImage;
