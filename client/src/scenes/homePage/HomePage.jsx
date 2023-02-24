import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme,Box, Typography} from '@mui/material';



const HomePageAPI = () => {
  const [newsData, setNewsData] = useState([]);
    //theme.palette.dark for dark, etc. from theme.js
    const theme = useTheme();
    const boxStyle = {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      padding: theme.spacing(2),
    };

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await axios.get('https://cors-anywhere.herokuapp.com/https://na.lodestonenews.com/feed/na.xml/');
        const xmlString = response.data;
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlString, 'application/xml');
        const items = xml.querySelectorAll('item');
        const data = [];
        items.forEach((item) => {
          const title = item.querySelector('title').textContent;
          const link = item.querySelector('link').textContent;
          const pubDate = item.querySelector('pubDate').textContent;
          const description = item.querySelector('description').textContent;
          data.push({ title, link, pubDate, description });
        });
        setNewsData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNewsData();
  }, []);

  return (
    <Box style = {boxStyle}>
      {newsData.map((item, index) => (
        <Box item xs={12} md={4} key={index} style = {boxStyle} >
          <a href={item.link} target="_blank" rel="noopener noreferrer">

              <Typography variant="h2" gutterBottom>{item.title}</Typography>
              <Typography variant="body4" color="grey">{item.pubDate}</Typography>
          </a>
        </Box>
      ))}
    </Box>
    
  );
};

export default HomePageAPI;