import React, { useState } from "react";
import { getImageInfo } from "../services/service.apiImage";
import { Grid } from "@material-ui/core";

function FormImage() {
  const [file, setFile] = useState(undefined);
  const [objects, setObjects] = useState([]);
  const [faces, setFaces] = useState([]);
  const [explicitContent, setExplicitContent] = useState({});
  // const [currentDay, setCurrentDay] = useState([]);
  const clear = () => {
    setObjects([]);
    setFaces([]);
    setExplicitContent([]);
  };
  const sendImage = async file => {
    clear();
    try {
      let _result = await getImageInfo(file);
      _result = await _result.json();
      setObjects(_result.objects);
      setFaces(_result.faces);
      setExplicitContent(_result.detections);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Grid container justify="center">
      <Grid item xs={3} />
      <Grid item xs={6}>
        <div className="container">
          <div className="title"> 1) Seleccionar Imagen</div>

          <hr />

          <Grid container>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              {file && (
                <img
                  src={window.URL.createObjectURL(file[0])}
                  alt="not"
                  className="displayImage"
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <input
                id="inputFile"
                type="file"
                accept="image/*"
                onChange={e => {
                  const files = Array.from(e.target.files);
                  setFile(files);
                }}
                capture="camera"
                className="input"
              />
              <label htmlFor="inputFile">
                {file ? file[0].name : "Subir Archivo"}
              </label>
            </Grid>
            <Grid item xs={12}>
              <button type="submit" onClick={() => sendImage(file)}>
                Enviar
              </button>

              <button
                onClick={() => {
                  clear();
                  setFile(undefined);
                }}
              >
                Borrar
              </button>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            {objects && (objects.length || faces.length) ? (
              <>
                <div className="title"> 1) Análisis de Imagen</div>
                <hr />
                <Grid container justify="center">
                  <Grid item xs={2} className="displayResults title">
                    <ul>
                      {objects.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </Grid>
                  <Grid item xs={5} className="displayResults title">
                    <ul>
                      {faces.map((item, i) => (
                        <li key={i}>
                          <ul>
                            <li>{item.faceNum}</li>
                            <li>Probabilidad Alegría: {item.joyLikelihood}</li>
                            <li>Probabilidad de ira: {item.angerLikelihood}</li>
                            <li>
                              Probabilidad de tristeza: {item.sorrowLikelihood}
                            </li>
                            <li>
                              Probabilidad de sorpresa:{" "}
                              {item.surpriseLikelihood}
                            </li>
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </Grid>
                  <Grid item xs={5} className="displayResults title">
                    {explicitContent.adult && (
                      <ul>
                        <li>Adulto: {explicitContent.adult}</li>
                        <li>Medica: {explicitContent.medical}</li>
                        <li>Bromear: {explicitContent.spoof}</li>
                        <li>Violencia: {explicitContent.violence}</li>
                        <li>Atrevido: {explicitContent.racy}</li>
                      </ul>
                    )}
                  </Grid>
                </Grid>
              </>
            ) : (
              "  "
            )}
          </Grid>
        </div>
      </Grid>
      <Grid item xs={3} />
    </Grid>
  );
}

export default FormImage;
