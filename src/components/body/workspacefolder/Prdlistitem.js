import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';

import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../state/index';
import Popper from '@mui/material/Popper';

import {
  getAuth
} from "firebase/auth";

const Prdlistitems = ({chatlistopen, getlistopen, getChatData}) => {

  const auth = getAuth();

  const [product, setProduct] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();
  const state = useSelector((state) => state)
  const {loginUser, logoutUser, fbuser, nofbuser} = bindActionCreators(actionCreators, dispatch);

  

  const getListById = async () => {
    
    const uid = state.auth.state.loginData.uid
    try {
       const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/products/getlistbyid`, 
       { params: { uid } })
       .then((res) => { 
        console.log(res.data);
        setProduct(res.data);
        
        return 0;
      })
    } 
    catch (err) {
      console.log(err)
    }
  }

  const ctrldrawer = (event) => {
    // getlistopen(true);
    // chatlistopen(true);
    setAnchorEl(event.currentTarget);
  }


  useEffect(() => {
    getListById();
  }, []);
  

  return (
    <div className="main_Right_chan" style={{}}>
      {product ? product.map(item => {
        return (
            
          <div key={item._id}>
              
            <Link to={`/Detail/${item._id}`} style={{ color: 'black', alignItems: 'flex-start' }}>
              {/* <Link to={`/Detail/${item.name}`} />                 */}
                <ListItemButton 
                onClick={() => {
                  getlistopen(true);
                  chatlistopen(true);
                  getChatData(item.joinInf);
                }}
                >
                    <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                </ListItemButton>
            </Link>
          </div>
        )
      }) : ''}
    </div> 
  )
}



export default Prdlistitems
