import React from 'react';
import { connect } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import DefaultLayout from '../../layouts/index';
import CheckBoxFilter from '../../components/CheckBoxFilter';
import SliderFilter from "../../components/SliderFilter";
import SelectedFilters from '../../components/SelectedFilters';

const useStyles = makeStyles(theme => ({
  askedRoot: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  asked: {
    marginRight: theme.spacing(0.5)
  },
  eachFilter: {
    borderBottomWidth: 1,
    borderBottomColor: "#5e5b61"
  },
  paddingOne: {
    padding: theme.spacing(1),
  },
  marginBottomOne: {
    marginBottom: theme.spacing(1)
  },
  paddingTopBottomZero: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0)
  }
}));

const HomePage = (props) => {
  const classes = useStyles();
  
  return (
    <DefaultLayout>
      <Grid container xl spacing={2}>
        <Grid item xs={2}>
          <Paper>
            <div className={classes.eachFilter}>
              <SelectedFilters/>
            </div>
            <Divider />
            <div className={classes.eachFilter}>
              <CheckBoxFilter 
                limit={5}
                search
                show
                heading={"State"}
                list={props.filters.states}
                setFunc={"addState"}
                type="states"
              />
            </div>
            <Divider />
            <div className={classes.eachFilter}>
              <CheckBoxFilter 
                limit={5}
                search
                show
                heading={"Party"}
                list={props.filters.parties}
                setFunc={"addParty"}
                type="parties"
              />
            </div>
            <Divider />
            <div className={classes.eachFilter}>
              <CheckBoxFilter
                limit={props.filters.education.length}
                heading={"Education"}
                list={props.filters.education}
                setFunc={"addEducation"}
                type="education"
              />
            </div>
            <Divider />
            <div className={classes.eachFilter}>
              <SliderFilter
                heading={"Age"} 
              />
            </div>
            <Divider />
            <div className={classes.eachFilter}>
              <CheckBoxFilter
                limit={props.filters.genders.length}
                heading={"Gender"}
                list={props.filters.genders}
                setFunc={"setGender"}
                type="genders"
              />
            </div>
            <Divider />
            <div className={classes.eachFilter}>
              <CheckBoxFilter
                limit={props.filters.marital.length} 
                heading={"Marital"}
                list={props.filters.marital}
                setFunc={"addMarital"}
                type="marital"
              />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper className={classes.paddingOne}>
            <List className={classes.paddingTopBottomZero}>
              <ListItem className={classes.paddingTopBottomZero}>
                <div>
                  <CardHeader
                    className={classes.paddingOne} 
                    title={
                      <Typography variant="h6">Government Medical College</Typography>
                    }
                  />
                  <CardContent className={classes.paddingOne}>
                    <div className={classes.marginBottomOne}>
                      <Typography variant="subtitle2">Asked By</Typography>
                    </div>
                    <div className={classes.marginBottomOne}>
                      <div className={classes.askedRoot}>
                        <Chip onClick={() => console.log("Okay")} className={classes.asked} label="MP Name Full MP Name Full MP Name Full" avatar={<Avatar src="https://material-ui.com/static/images/avatar/1.jpg" />} />
                        <Chip onClick={() => console.log("Okay")} className={classes.asked} label="MP Name Full" avatar={<Avatar src="https://material-ui.com/static/images/avatar/2.jpg" />} />
                        <Chip onClick={() => console.log("Okay")} className={classes.asked} label="MP Name Full" avatar={<Avatar src="https://material-ui.com/static/images/avatar/3.jpg" />} />
                        <Chip onClick={() => console.log("Okay")} className={classes.asked}label="MP Name Full" avatar={<Avatar src="https://material-ui.com/static/images/avatar/4.jpg" />} />
                      </div>
                    </div>
                    <div className={classes.marginBottomOne}>
                      <Typography variant="subtitle2">In Lok Sabha to Ministry of Space on 26 Jan, 2019</Typography>
                    </div>
                  </CardContent>
                </div>
              </ListItem>
              <Divider/>
              <ListItem>
                <div>
                  <CardHeader
                    className={classes.paddingOne} 
                    title={
                      <Typography variant="h6">Government Medical College</Typography>
                    }
                  />
                  <CardContent className={classes.paddingOne}>
                    <div className={classes.marginBottomOne}>
                      <Typography variant="subtitle2">Asked By</Typography>
                    </div>
                    <div className={classes.marginBottomOne}>
                      <div className={classes.askedRoot}>
                        <Chip className={classes.asked} label="MP Name Full MP Name Full MP Name Full" avatar={<Avatar src="https://material-ui.com/static/images/avatar/1.jpg" />} />
                        <Chip className={classes.asked} label="MP Name Full" avatar={<Avatar src="https://material-ui.com/static/images/avatar/2.jpg" />} />
                        <Chip className={classes.asked} label="MP Name Full" avatar={<Avatar src="https://material-ui.com/static/images/avatar/3.jpg" />} />
                        <Chip className={classes.asked}label="MP Name Full" avatar={<Avatar src="https://material-ui.com/static/images/avatar/4.jpg" />} />
                      </div>
                    </div>
                    <div className={classes.marginBottomOne}>
                      <Typography variant="subtitle2">In Lok Sabha on 26 Jan, 2019</Typography>
                    </div>
                  </CardContent>
                </div>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </DefaultLayout>
  );
}

const mapStateToProps = state => ({
  filters: state.filters
});

export default connect(mapStateToProps)(HomePage);