import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AdminUserTable from '../AdminTables/AdminUserTable';
import AdminRecipesTable from '../AdminTables/AdminRecipesTable';
import AdminIngredientsTable from '../AdminTables/AdminIngredientsTable';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  tabContent: {
    padding: theme.spacing(2),
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function AdminTabs() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="admin tabs"
        centered
      >
        <Tab label="Users" />
        <Tab label="Recipes" />
        <Tab label="Ingredients" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <AdminUserTable />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AdminRecipesTable />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AdminIngredientsTable />
      </TabPanel>
    </Box>
  );
}

export default AdminTabs;
