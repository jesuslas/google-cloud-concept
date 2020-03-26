import React, { memo, useEffect, useState } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import { Tabs, Tab, Grid, AppBar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { toLowerCaseAndRemoveSpaces } from "./utils";
import FormImage from "./form.image";
import FormVoice from "./form.voice";

const renderImage = () => <FormImage />;
const renderVoice = () => <FormVoice />;
const tabs = [
  {
    label: "Imagen",
    to: "/image",
    render: renderImage
  },
  {
    label: "Audio",
    to: "/voice",
    render: renderVoice
  }
];
function TabsRouter(props) {
  const { variant, onChange, hasData = true } = props;
  const [cityId, setCity] = useState("3873544");
  useEffect(() => {}, []);

  const classes = useStyles();
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Route>
          {({ location, match }) => {
            const currentLocation = location.pathname;
            const tabRoute = route =>
              route && `${match.url !== "/" ? match.url : ""}${route}`;
            return (
              <div className={classes.root}>
                <AppBar
                  position="static"
                  color="transparent"
                  className={classes.shadowTabs}
                >
                  <Tabs
                    value={currentLocation}
                    indicatorColor="primary"
                    textColor="primary"
                    centered={!variant}
                    onChange={onChange}
                    variant={variant}
                    scrollButtons="on"
                  >
                    {tabs.map(({ label, to }, index) => (
                      <Tab
                        data-cy={`tab-${toLowerCaseAndRemoveSpaces(label)}`}
                        to={tabRoute(to)}
                        value={tabRoute(to)}
                        key={label}
                        label={label}
                        component={Link}
                        className={`${classes.tabButton} tabButton`}
                        tabIndex={index}
                      />
                    ))}
                  </Tabs>
                </AppBar>
                <Switch>
                  {tabs.map(({ render, to }, i) => (
                    <Route
                      key={i}
                      render={() => (
                        <>
                          {hasData ? (
                            <div>{render({ cityId, setCity })}</div>
                          ) : (
                            <div className={classes.noData}>
                              <Typography>No data to display</Typography>
                            </div>
                          )}
                        </>
                      )}
                      path={tabRoute(to)}
                    />
                  ))}
                  {(tabs[0] || {}).to && (
                    <Redirect to={tabRoute((tabs[0] || {}).to)} />
                  )}
                  ;
                </Switch>
              </div>
            );
          }}
        </Route>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#ffff",
    flexGrow: 1
  },
  shadowTabs: {
    boxShadow: "none"
  },
  tabButton: {
    "&:focus": {
      outline: "none"
    },
    width: 80
  },
  noData: {
    textAlign: "center",
    height: "300px",
    paddingTop: "20px"
  },
  divider: {
    backgroundColor: "gray",
    marginBottom: 5,
    marginTop: 5
  }
}));
export default withRouter(memo(TabsRouter));
