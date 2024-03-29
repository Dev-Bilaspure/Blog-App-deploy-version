import { Box, Button, Grid, Hidden, makeStyles, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import Banner from '../../components/Banner/Banner';
import Categories from '../../components/Categories/Categories';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {CategoryTags} from './../Blog/Blog'
import styled from '@emotion/styled';
import {Link, useNavigate, useLocation} from 'react-router-dom';
// import useStyles from './homeStyles'
import './homeStyle.css'
import categoriesArray from '../../constants/categories';
import Post from '../../components/Post/Post';
import TagsRightSidebar from '../../components/TagsRightSidebar/TagsRightSidebar';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

const useStyles  = makeStyles({
  belowBanner: {
    // paddingTop: 20,
    paddingRight: 15,
    // marginLeft: 15
  },
  bookmarkBtn: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
  browseRecommendedBtn: {
    paddingLeft: 20, 
    paddingRight: 20, 
    background: 'rgb(26,137,23)', 
    color: '#fff', 
    borderRadius: 100, 
    textTransform: 'none', 
    boxShadow: 'none', 
    margin: 'auto',
    '&:hover': {
      background: 'rgb(26,137,23)', 
      color: '#fff', 
    }
  }

})
const Home = ({ user }) => {
  const classes = useStyles();
  return (
    <Box style={{overflowX: 'hidden'}} className='homePageWrapper'> 
      {!user && <Banner/>}
      <Grid container className={classes.belowBanner}>
        <Grid item lg={8} md={8} xs={12} sm={12}>
          <div style={{paddingLeft: 0, paddingRight: 0, paddingTop: 20}}>
            <Grid container>
              <Grid item lg={1} md={1} sm={12} xs={12}>

              </Grid>
              <Grid item lg={10} md={10} sm={12} xs={12} style={{paddingLeft: 15}}>
                <TabsAndContent user={user}/>
              </Grid>
              <Grid item lg={1} md={1} sm={12} xs={12}>
                
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item lg={4} md={4} xs={12} sm={12} style={{borderLeft: '1px solid #E6E6E6', paddingLeft: 0}}>
          <div style={{paddingTop: 40, paddingLeft: 20}}>
            <Grid container>
              <Grid item lg={1} md={0} sm={12} xs={12}>

              </Grid>
              <Grid item lg={10} md={12} sm={12} xs={12}>
                <TagsRightSidebar user={user}/>
              </Grid>
              <Grid item lg={1} md={0} sm={12} xs={12}>
                
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Box>
  )
}

const TabsAndContent = ({user}) => {
  const [value, setValue] = useState(0);
  // for styling tabs root component
  const AntTabs = styled(Tabs)({
    borderBottom: '1px solid #E6E6E6',
    '& .MuiTabs-indicator': {
      backgroundColor: '#000000',
      height: 1
    },
    // marginBottom: 80,
    paddingTop: 15,
    paddingLeft: 10
  });

  // for styling category tab
  const AntTab1 = styled((props) => <Tab disableRipple {...props} />)(() => ({
    // textTransform: 'none',
    fontSize: 15,
    fontWeight: 'bold',
    color: value===0 ? '#000000' : 'rgb(100,100,100)',
    '&.Mui-focusVisible': {
      backgroundColor: '#d1eaff',
    },
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0
  }));

  // for styling following tab
  const AntTab2 = styled((props) => <Tab disableRipple {...props} />)(() => ({
    // textTransform: 'none',
    fontSize: 15,
    color: value===1 ? '#000000' : 'rgb(100,100,100)',
    '&.Mui-focusVisible': {
      backgroundColor: '#d1eaff',
    },
    marginLeft: 40,
    paddingBottom: 0,
    fontWeight: 'bold',
    paddingLeft: 0,
    paddingRight: 0
  }));
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  }
  return(
    <div>
      <div style={{paddingBottom: 60}}>
        {
          user &&
          <AntTabs  value={value} onChange={handleTabChange} textColor="#000000" indicatorColor='secondary' scroll={true} >
            <AntTab1 label="Recommended for you" />
            <AntTab2 label="Following" />
          </AntTabs >
        }
      </div>
      <div>
        {
          value===1 && user
          ? <FollowingUsersPosts user={user} setValue={setValue}/>
          : <HomePagePosts user={user} /> 
        }
        
      </div>
    </div>
  );
}

const HomePagePosts = ({user}) => {
  const [generalPosts, setGeneralPosts] = useState([]);

  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    document.title = `Maadhyam | Home`
    setIsFetching(true);
    const fetchGeneralPosts = async () => {
      try {
        const response = await axios.get(
          `https://blogging-app-server.herokuapp.com/api/posts`
        ).then(res => {
          setGeneralPosts(res.data);
          // console.log(generalPosts);
          setIsFetching(false);
        })
      } catch(error) {
        console.log(error);
        setIsFetching(false);
      }
    }
    fetchGeneralPosts();
  }, [])
  return(
    <div>
      {
        isFetching ? 
        <div style={{textAlign: 'center'}}>
          <CircularProgress color="inherit" />
        </div> :
        generalPosts.map(post => (
          <Post user={user} post={post}/>
        ))
      }
    </div>
  );
}

const FollowingUsersPosts = ({user, setValue}) => {
  const classes = useStyles(); 
  // const followingPostArray = [1,2,3,4,5,6,7]
  const [followingsPost, setFollowingsPosts] = useState([]);

  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    setIsFetching(true);
    const fetchFollowingsPosts = async () => {
      try {
        const response = await axios.get(
          `https://blogging-app-server.herokuapp.com/api/posts/${user._id}/following`
        ).then(res => {
          setFollowingsPosts(res.data);
          setIsFetching(false);
        }).catch(err => {
          console.log(err);
          setIsFetching(false);
        })
      } catch(error) {
        console.log(error);
        setIsFetching(false);
      }
    } 
    fetchFollowingsPosts();
  }, [])
  return(
    <div>
      {
        isFetching ? 
        <div style={{textAlign: 'center'}}>
          <CircularProgress color="inherit" />
        </div> :
        (followingsPost.length 
        ? followingsPost.map(post => (
            <Post user={user} post={post}/>
          ))
        : <div>
            <div style={{width: 380, margin: 'auto', textAlign: 'center', overflowWrap: 'break-word'}}>
              <Typography style={{color: 'rgb(51,51,51)', fontSize: 16}}>
                Stories from the writers you follow will appear here.
              </Typography>
              <div style={{width: 238, margin: 'auto', marginTop: 30}}>
                <Button variant='contained' className={classes.browseRecommendedBtn} onClick={() => {setValue(0)}}>
                  Browse recommended stories
                </Button>
              </div>
            </div>
          </div>)
      }
    </div>
  );
}

export default Home

