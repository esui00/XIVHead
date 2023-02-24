import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme, Box, Typography, Divider } from '@mui/material';

const HomePageAPI = () => {
  const [newsData, setNewsData] = useState([]);
  const theme = useTheme();
  const boxStyle = {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    padding: theme.spacing(2),
  };
  const itemStyle = {
    marginBottom: theme.spacing(4),
  };
  const linkStyle = {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  };
  const titleStyle = {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  };
  const dateStyle = {
    fontSize: '14px',
    marginBottom: theme.spacing(1),
  };
  const descriptionStyle = {
    fontSize: '16px',
  };
  const dividerStyle = {
    borderBottom: `5px solid ${theme.palette.divider}`,
    paddingBottom: theme.spacing(2),
    marginBottom: theme.spacing(2),
  };
  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/feed');
        const xmlString = response.data;
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlString, 'application/xml');
        const items = xml.querySelectorAll('item');
        const data = [];
        items.forEach((item) => {
          const title = item.querySelector('title').textContent;
          const link = item.querySelector('link').textContent;
          const pubDate = new Date(item.querySelector('pubDate').textContent).toLocaleDateString('en-US');
          const description = item.querySelector('description').textContent;
          const descriptionParser = new DOMParser();
          const descriptionXml = descriptionParser.parseFromString(description, 'text/html');
          data.push({ title, link, pubDate, description});
        });
        setNewsData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNewsData();
  }, []);

  return (
    <Box style={boxStyle}>
      {newsData.map((item, index) => (
        <Box key={index} style={itemStyle}>
          <a href={item.link} target="_blank" rel="noopener noreferrer" style={linkStyle}>
            <Typography variant="h5" style={titleStyle}>
              {item.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" style={dateStyle}>
              {item.pubDate}
            </Typography>
            <Typography variant="body1" style={descriptionStyle}>
              {item.description}
            </Typography>
          </a>
          {index < newsData.length - 1 && <Divider style={dividerStyle} />}
        </Box>
      ))}
    </Box>
  );
};

export default HomePageAPI;