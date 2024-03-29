import { Button, Grid, Typography, makeStyles } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import Draft from '../../components/Draft/Draft';
import Published from '../../components/Published/Published';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import './myStoriesStyle.css';


const useStyle = makeStyles({
  writeAStory: {
    marginTop: 18, 
    borderRadius: 100, 
    color: 'rgb(26,136,22)', 
    border: '1px solid rgb(26,136,22)', 
    textTransform: 'none',
    background: '#fff',
  },
  yourStoriesHeading: {
    fontFamily: `'Outfit', 'sans-serif'`, 
    fontSize: 45, 
    color: 'rgb(41,41,41)'
  }
})

const MyStories = ({val}) => {
  const navigate = useNavigate();
  const classes = useStyle();

  useEffect(() => {
    document.title = `Maadhyam | MyStories`
  }, [])

  const [value, setValue] = useState(val);
  const handleTabChange = (event, newValue) => {
    if(newValue!==value) {
      if(newValue===0)
        navigate('/draft');
      else
        navigate('/published');
    }
    setValue(newValue);
  }
  // for styling tabs root component
  const AntTabs = styled(Tabs)({
    borderBottom: '1px solid #E6E6E6',
    '& .MuiTabs-indicator': {
      backgroundColor: '#000000',
      height: 1
    },
    marginBottom: 80,
    paddingTop: 30
  });

  // for styling draft tab
  const AntTab1 = styled((props) => <Tab disableRipple {...props} />)(() => ({
    textTransform: 'none',
    fontSize: 16,
    color: value===0 ? '#000000' : 'rgb(117,117,117)',
    '&.Mui-focusVisible': {
      backgroundColor: '#d1eaff',
    },
    paddingBottom: 7,
  }));

  // for styling published tab
  const AntTab2 = styled((props) => <Tab disableRipple {...props} />)(() => ({
    textTransform: 'none',
    fontSize: 16,
    color: value===1 ? '#000000' : 'rgb(117,117,117)',
    '&.Mui-focusVisible': {
      backgroundColor: '#d1eaff',
    },
    marginLeft: 30,
    paddingBottom: 7,
  }));


  return(
    <div className='myStoriesWrapper'>
      <Grid container style={{paddingRight: 20, paddingLeft: 20}}>
        <Grid item lg={1} md={1} sm={12} xs={12}>

        </Grid>
        <Grid item lg={10} md={10} sm={12} xs={12}>
          <div>
            <div style={{marginTop: 60}}>
              <Grid justifyContent='space-between' container>
                <Grid item>
                  <Typography className={classes.yourStoriesHeading}>
                    Your stories
                  </Typography>
                </Grid>
                <Grid item>
                  <Link to='/write' style={{color: 'inherit', textDecoration: 'none'}}>
                    <Button variant='outlined' className={classes.writeAStory}>
                      Write a story
                    </Button>
                  </Link>
                </Grid>
              </Grid>
              
            </div>
            <div>
              <AntTabs  value={value} onChange={handleTabChange} textColor="#000000" indicatorColor='secondary' >
                <AntTab1 label="Draft" />
                <AntTab2 label="Published" />
              </AntTabs >
              <div>
                {
                  value===0
                  ? <Draft /> 
                  : <Published />
                }
              </div>
            </div>
          </div>
        </Grid>
        <Grid item lg={1} md={1} sm={12} xs={12}>
          
        </Grid>
      </Grid>
    </div>
  );
}

export default MyStories;