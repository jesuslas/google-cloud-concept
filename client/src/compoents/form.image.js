import React, { useState } from "react";
import { getImageInfo } from "../services/service.apiImage";
import { Grid, CircularProgress } from "@material-ui/core";

function FormImage() {
  const [file, setFile] = useState(undefined);
  const [objects, setObjects] = useState([]);
  const [faces, setFaces] = useState([]);
  const [explicitContent, setExplicitContent] = useState({});
  const [loading, setLoading] = useState(false);
  // const [currentDay, setCurrentDay] = useState([]);
  const clear = () => {
    setObjects([]);
    setFaces([]);
    setExplicitContent([]);
  };
  const sendImage = async file => {
    clear();
    setLoading(true);
    try {
      let _result = await getImageInfo(file);
      _result = await _result.json();
      setObjects(_result.objects);
      setFaces(_result.faces);
      setExplicitContent(_result.detections);
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
          <div className="title"> 1) Seleccionar Imagen</div>
          <div className="subtitle"> - Solo admite formatos JPG, PNG, GIF</div>
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
                <Grid container justify="center" spacing={1}>
                  <Grid
                    item
                    xs={12}
                    md={2}
                    xl={2}
                    className="displayResults title"
                  >
                    <div className="title"> - Obj. en la imagen</div>
                    <ul>
                      {objects.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={5}
                    xl={5}
                    className="displayResults title"
                  >
                    <div className="title">
                      {" "}
                      - Sentimientos en caras de la imagen
                    </div>
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
                  <Grid
                    item
                    xs={12}
                    md={5}
                    xl={5}
                    className="displayResults title"
                  >
                    <div className="title">
                      {" "}
                      - Analisis de contenido en la imagen
                    </div>
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
              loading && <CircularProgress color="secondary" />
            )}
          </Grid>
        </div>
      </Grid>
      <Grid item xs={1} md={3} xl={3} />
    </Grid>
  );
}

export default FormImage;
