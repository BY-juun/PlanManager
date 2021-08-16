import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {BiLogInCircle} from 'react-icons/bi'

const BottomLayout = ()=>{
    const [value, setValue] = React.useState(0);
  
    return (
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
      >
        <BottomNavigationAction label="Pastdd" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Today" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Login" icon={<LocationOnIcon />} />
      </BottomNavigation>
    );
};

export default BottomLayout;