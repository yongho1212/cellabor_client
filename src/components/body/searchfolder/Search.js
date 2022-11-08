import React from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../state/index';
import axios from "axios";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import { MenuItem, Menu, Autocomplete, Chip, TextField, styled } from "@mui/material";

const StyledTextField = styled(TextField)({
  '& label': {
    color: '#BBBBBB',
    padding: 0,

    '&.Mui-focused': {
      color: '#BBBBBB',
    },
  },
  '& .MuiOutlinedInput-root.MuiInputBase-root': {
    padding: '0 0 0 10px',
  },
  '& .MuiOutlinedInput-root': {
    fontSize: '12px',
    '& fieldset': {
      borderColor: '#666666',
      borderRadius: '10px',
    },
    '&.Mui-focused': {
      '& fieldset': {
        padding: 0,
        border: '1px solid #666666',
      },
    },
  },
});


const Search = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state)
  const {loginUser, logoutUser, fbuser, nofbuser} = bindActionCreators(actionCreators, dispatch);
  // const channels = state.auth.state.loginData.joinedChannel

  // const lists = channels.map((chat) => 
  // <li>{chat}</li>
  // )

  const sexList = ['All','female', 'male'];
  const tagList = ['태그 전체', '패션', '여행', '외국', '섹스']

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [infList, setInfList] = React.useState([]);
  const [filteredList, setFilteredList] = React.useState();
  const [sexOpen, setSexOpen] = React.useState(false);
  const [ageOpen, setAgeOpen] = React.useState(false);
  const [tagOpen, setTagOpen] = React.useState(false);
  const [testOpen, setTestOpen] = React.useState(false);

  const [sexText, setSexText] = React.useState('All');
  const [ageText, setAgeText] = React.useState('나이');
  const [tagText, setTagText] = React.useState('태그 전체');
  const [testText, setTestText] = React.useState('태그');

  const [value, setValue] = React.useState();
  const [placeholder, setPlaceholder] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState();
  const [openOptionsMenu, setOpenOptionMenu] = React.useState(false); //안쓸듯

  console.log(inputValue);
  console.log(value); // 이거로 필터 해야함

  const taglist = [
    {title: '축구'},
    {title: '여행'},
    {title: '게임'},
    {title: '음식'},
    {title: '일상'},
  ];

  const sexFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
    setSexOpen(true);
  };

  const ageFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
    setAgeOpen(true);
  };

  const tagFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
    setTagOpen(true);
  };

  const testFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
    setTestOpen(true);
  };

  const selectSexMenu = (item) => {
    setSexText(item);
    setSexOpen(false);
  };


  const handleClose = () => {
    setSexOpen(false);
    setAgeOpen(false);
    setTagOpen(false);
    setTestOpen(false);
    setAnchorEl(null);
  };

  const getInfList = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/inf/getlist`)
        .then((res) => {
          console.log(res);
          setInfList(res.data);
          return 0;
        })
    }
    catch (err) {
      console.log(err)
    }
  }

  const setList = () => {
    let temp = []
    // 1. 태그입력을 하면 태그 배열이 생긴다. 
    // 2. 성별,나이 
    if (sexText === 'All') temp = infList.filter(item => item.tags.includes(tagText));
    if (sexText !== 'All' && tagText !== '태그 전체') temp = infList.filter(item => item.tags.includes(tagText) && item.sex === sexText);
    if (tagText === '태그 전체') temp = infList.filter(item => item.sex === (sexText));
    setFilteredList(temp);
  };

  const filterSelected = (a) => {
    setSexText(a);
    setList();
    setAnchorEl(null);
  }

  React.useEffect(() => {
    getInfList();
  }, []);

  React.useEffect(() => {
    setList();
  }, [sexText, tagText]);

  console.log(sexText);
  console.log(tagText);
  console.log(filteredList);
  
  return (
    <div style={{display:'flex'}}>
      {/* <h1>Filtered Search Area</h1> */}
      <div style={{ width: '80vw', backgroundColor:'red', alignItems:'center'}}>
        <Button id="sex-filter" onClick={sexFilterClick}>
          {sexText}
        </Button>
        <Button id="age-filter" onClick={ageFilterClick}>
          {ageText}
        </Button>
        <Button id="tag-filter" onClick={tagFilterClick}>
          {tagText}
        </Button>
        <Button id="tag-filter" onClick={testFilterClick}>
          텍스트 입력
        </Button>
        <Menu open={sexOpen} anchorEl={anchorEl} onClose={handleClose}>
          {sexList.map(item => {
            return [
            // <MenuItem onClick={()=>filterSelected(item)}>{item}</MenuItem>
            <MenuItem onClick={() => {setSexText(item); setSexOpen(false);}}>{item}</MenuItem>
            ]})}
        </Menu>
        <Menu open={ageOpen} anchorEl={anchorEl} onClose={handleClose}>
          <MenuItem>20대</MenuItem>
          <MenuItem>30대</MenuItem>
          <MenuItem>30대</MenuItem>
        </Menu>
        <Menu open={tagOpen} anchorEl={anchorEl} onClose={handleClose}>
          {tagList.map(item => {
            return [
            <MenuItem onClick={() => {setTagText(item); setTagOpen(false); }}>{item}</MenuItem>
            ]})}
        </Menu>
        <Menu open={testOpen} anchorEl={anchorEl} onClose={handleClose}>
          <div style={{ width: '400px', height: '200px' }}>
            이찬휘의 입력칸
            <Autocomplete 
              multiple 
              options={taglist} 
              getOptionLabel={(option) => 
                option.title
              }
              value={value}
              onChange={(event, selectedValue) => {
                setValue(selectedValue);
              }}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              limitTags={3}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='standard'
                  label='Multiple values'
                  placeholder="tags"
                />
              )}
              isOptionEqualToValue={(againstTo, selected) => {
                return selected.title === againstTo.title;
              }}
            />
          </div>
        </Menu>

        {/* 플랫폼 구분 버튼 */}
        <div>
              
        </div>
      </div>
      {filteredList ? filteredList.map(item => {
        return (
          <div key={item._id} style={{ marginInline: '40px', marginTop: '40px' }}>
            <Link to={`/Detail/${item._id}`} style={{ color: 'black', display: 'flex', flexDirection: 'column', width: '200px', height: '280px', alignItems: 'flex-start' }}>
              <div style={{ width: '200px', height: '200px', backgroundColor: 'red' }}>
                <img className='profile-img' src={item.avatar} width='200px' height='200px' />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '20px' }}>
                  <div>
                    {item.insta}
                  </div>
                </div>
                <div style={{ fontSize: '20px' }}>
                  {item.nickname}
                </div>
              </div>
              <div style={{ fontSize: '14px' }}>
                {item.mobile}
              </div>
            </Link>
          </div>
        )
      }) : <div>검색결과 없음</div>}
    </div> 
  );
} 
export default Search;
