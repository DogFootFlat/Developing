import { Typography } from '@mui/material';
import React from 'react';
import styles from './css/TabPannel.module.css';

export function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <div className={styles.tabPanel}>
          <Typography>{children}</Typography>
        </div>
      )}
    </div>
  );
}
