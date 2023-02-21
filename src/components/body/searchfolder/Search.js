import React from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state/index";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import {
  MenuItem,
  Menu,
  Autocomplete,
  Chip,
  TextField,
  styled,
} from "@mui/material";
import { Box, style } from "@mui/system";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";

import "./Search.css"

const StyledTextField = styled(TextField)({
  "& label": {
    color: "#BBBBBB",
    padding: 0,

    "&.Mui-focused": {
      color: "#BBBBBB",
    },
  },
  "& .MuiOutlinedInput-root.MuiInputBase-root": {
    padding: "0 0 0 10px",
  },
  "& .MuiOutlinedInput-root": {
    fontSize: "12px",
    "& fieldset": {
      borderColor: "#666666",
      borderRadius: "10px",
    },
    "&.Mui-focused": {
      "& fieldset": {
        padding: 0,
        border: "1px solid #666666",
      },
    },
  },
});

const Input = styled(MuiInput)`
  width: 42px;
`;

const Search = (props) => {
  const sexList = ["All", "female", "male"];

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [infList, setInfList] = React.useState([]);
  const [filteredList, setFilteredList] = React.useState([]);
  const [sexOpen, setSexOpen] = React.useState(false);
  const [ageOpen, setAgeOpen] = React.useState(false);
  const [tagOpen, setTagOpen] = React.useState(false);
  const [platformOpen, setPlatformOpen] = React.useState(false);

  const [tagText, setTagText] = React.useState("태그 입력");
  const [platformText, setPlatformText] = React.useState("모두");

  const [sexText, setSexText] = React.useState("All");
  const [ageText, setAgeText] = React.useState("나이"); // 적용 예정

  const platformList = [
    { title: "모두" },
    { title: "인스타그램" },
    { title: "유튜브" },
    { title: "트위터" },
    { title: "페이스북" },
    { title: "틱톡" },
  ];

  const ageValueText = (value) => {
    return `${value}살`;
  };
  // 개발 중
  const [ageValue, setAgeValue] = React.useState([0, 100]);

  const [tagvalue, setTagValue] = React.useState([]);
  const [platformValue, setPlatformValue] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");

  const taglist = [
    { title: "축구" },
    { title: "여행" },
    { title: "게임" },
    { title: "음식" },
    { title: "일상" },
  ];

  const changeTagText = () => {
    console.log("tagList", tagvalue);
    console.log("length", tagvalue.length);
    if (tagvalue.length > 0) {
      let temp = "";
      for (let i = 0; i < tagvalue.length; i += 1) {
        if (i !== tagvalue.length - 1) {
          temp += tagvalue[i].title + ", ";
        } else temp += tagvalue[i].title;
      }
      console.log(temp);
      setTagText(temp);
    }
  };

  const changePlatformText = () => {
    if (platformValue.title) setPlatformText(platformValue.title);
    else setPlatformText("모두");
    // console.log('tagList', platformValue);
    // if (platformValue.length >0) {
    //   let temp = '';
    //   for (let i = 0; i < platformValue.length; i += 1) {
    //     if (i !== platformValue.length - 1) {
    //       temp += platformValue[i].title + ', ';
    //     }
    //     else temp += platformValue[i].title;
    //   }
    // setPlatformText(temp);
    // }
  };

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

  const platformFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
    setPlatformOpen(true);
  };

  const handleClose = () => {
    setSexOpen(false);
    setAgeOpen(false);
    setTagOpen(false);
    setPlatformOpen(false);
    setAnchorEl(null);
  };

  const isAgeInclude = (value) => {
    return value >= ageValue[0] && value <= ageValue[1];
  };

  const handleAgeChange = (event, newValue) => {
    setAgeValue(newValue);
    // setAgeText(`${ageValue[0]} ~ ${ageValue[1]}`)
    console.log("age filter value", ageValue);
  };

  // 필터 로직 성별, 나이, 태그
  const setList = async () => {
    let temp = [];
    let temptemp = [];
    let temptempwithplatform = [];
    if (platformText === "모두") {
      if (sexText === "All" && tagvalue.length === 0)
        temp = infList.filter((item) =>
          isAgeInclude(2022 - Number(item.birthday.slice(0, 4)) + 1)
        );
      if (sexText !== "All" && tagvalue.length === 0)
        temp = infList.filter(
          (item) =>
            item.sex === sexText &&
            isAgeInclude(2022 - Number(item.birthday.slice(0, 4)) + 1)
        );
      if (sexText === "All" && tagvalue.length !== 0) {
        for (let i = 0; i < tagvalue.length; i += 1) {
          temptemp.push(
            infList.filter((item) => item.tags.includes(tagvalue[i].title))
          );
        }
        for (let j = 0; j < temptemp.length; j += 1) {
          if (temptemp[j].length > 0) {
            if (
              isAgeInclude(
                2022 - Number(temptemp[j][0].birthday.slice(0, 4)) + 1
              )
            ) {
              temp.push(temptemp[j][0]);
            }
          }
        }
      }
      if (sexText !== "All" && tagvalue.length !== 0) {
        for (let i = 0; i < tagvalue.length; i += 1) {
          temptemp.push(
            infList.filter((item) => item.tags.includes(tagvalue[i].title))
          );
        }
        for (let j = 0; j < temptemp.length; j += 1) {
          if (temptemp[j].length > 0) {
            if (
              isAgeInclude(
                2022 - Number(temptemp[j][0].birthday.slice(0, 4)) + 1
              ) &&
              temptemp[j][0].sex === sexText
            ) {
              temp.push(temptemp[j][0]);
            }
          }
        }
      }
    } else if (platformText !== "모두") {
      // 유저 플랫폼 비교 로직 필요
      // if (플랫폼 검사)
      if (platformText === "인스타그램") {
        temptempwithplatform = infList.filter((item) => item.insta !== "");
      } else if (platformText === "트위터") {
        temptempwithplatform = infList.filter((item) => item.twitter !== "");
      } else if (platformText === "틱톡") {
        temptempwithplatform = infList.filter((item) => item.tiktok !== "");
      } else if (platformText === "유튜브") {
        temptempwithplatform = infList.filter((item) => item.youtube !== "");
      } else if (platformText === "페이스북") {
        temptempwithplatform = infList.filter((item) => item.facebook !== "");
      }
      if (sexText === "All" && tagvalue.length === 0)
        temp = temptempwithplatform.filter((item) =>
          isAgeInclude(2022 - Number(item.birthday.slice(0, 4)) + 1)
        );
      if (sexText !== "All" && tagvalue.length === 0)
        temp = temptempwithplatform.filter(
          (item) =>
            item.sex === sexText &&
            isAgeInclude(2022 - Number(item.birthday.slice(0, 4)) + 1)
        );
      if (sexText === "All" && tagvalue.length !== 0) {
        for (let i = 0; i < tagvalue.length; i += 1) {
          temptemp.push(
            temptempwithplatform.filter((item) =>
              item.tags.includes(tagvalue[i].title)
            )
          );
        }
        for (let j = 0; j < temptemp.length; j += 1) {
          if (temptemp[j].length > 0) {
            if (
              isAgeInclude(
                2022 - Number(temptemp[j][0].birthday.slice(0, 4)) + 1
              )
            ) {
              temp.push(temptemp[j][0]);
            }
          }
        }
      }
      if (sexText !== "All" && tagvalue.length !== 0) {
        for (let i = 0; i < tagvalue.length; i += 1) {
          temptemp.push(
            temptempwithplatform.filter((item) =>
              item.tags.includes(tagvalue[i].title)
            )
          );
        }
        for (let j = 0; j < temptemp.length; j += 1) {
          if (temptemp[j].length > 0) {
            if (
              isAgeInclude(
                2022 - Number(temptemp[j][0].birthday.slice(0, 4)) + 1
              ) &&
              temptemp[j][0].sex === sexText
            ) {
              temp.push(temptemp[j][0]);
            }
          }
        }
      }
    }
    setFilteredList(temp);
  };

  const getInfList = async () => {
    try {
      const res = await axios
        .post(`http://localhost:1212/inf/getlist`)
        .then((res) => {
          console.log("유저 리스트 필수", res);
          setInfList(res.data);
          setFilteredList(res.data);
          return 0;
        });
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    setList();
    changeTagText();
    changePlatformText();
  }, [sexText, tagvalue, platformValue]);

  React.useEffect(() => {
    getInfList();
  }, []);

  console.log(filteredList);

  return (
    <div style={{}}>
      {/* <h1>Filtered Search Area</h1> */}
      <div style={{ width: "100vw", alignItems: "center", height: "50px" }}>
        <Button id="sex-filter" onClick={sexFilterClick}>
          {sexText}
        </Button>
        <Button id="age-filter" onClick={ageFilterClick}>
          {ageText}
        </Button>
        <Button id="tag-filter" onClick={tagFilterClick}>
          {tagvalue.length === 0 ? "태그 입력" : `${tagText}`}
        </Button>
        <Button id="platform-filter" onClick={platformFilterClick}>
          {`${platformText}`}
        </Button>
        <Menu open={sexOpen} anchorEl={anchorEl} onClose={handleClose}>
          {sexList.map((item) => {
            return [
              <MenuItem
                onClick={() => {
                  setSexText(item);
                  setSexOpen(false);
                }}
              >
                {item}
              </MenuItem>,
            ];
          })}
        </Menu>
        <Menu open={ageOpen} anchorEl={anchorEl} onClose={handleClose}>
          <Box
            sx={{
              width: "500px",
              height: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Slider
              getAriaLabel={() => "ageFilter"}
              style={{ width: "200px", marignLeft: "20px" }}
              value={ageValue}
              onChange={handleAgeChange}
              valueLabelDisplay="auto"
              getAriaValueText={ageValueText}
              disableSwap
            />
            <div style={{ marginLeft: "30px" }}>
              start: {ageValue[0]} / end: {ageValue[1]}
            </div>
            <Button
              onClick={() => {
                setList();
                setAgeOpen(false);
              }}
              style={{ marginLeft: "20px" }}
            >
              적용
            </Button>
          </Box>
        </Menu>
        <Menu open={tagOpen} anchorEl={anchorEl} onClose={handleClose}>
          <div style={{ width: "400px", height: "200px" }}>
            <Autocomplete
              multiple
              options={taglist}
              getOptionLabel={(option) => option.title}
              value={tagvalue}
              onChange={(event, selectedValue) => {
                setTagValue(selectedValue);
              }}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              limitTags={2}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="태그를 입력 또는 선택하세요"
                  placeholder="tags"
                />
              )}
              isOptionEqualToValue={(againstTo, selected) => {
                return selected.title === againstTo.title;
              }}
            />
            <Button
              onClick={() => {
                setList();
                setTagOpen(false);
              }}
            >
              적용
            </Button>
          </div>
        </Menu>
        <Menu open={platformOpen} anchorEl={anchorEl} onClose={handleClose}>
          <div style={{ width: "400px", height: "200px" }}>
            <Autocomplete
              // multiple
              options={platformList}
              getOptionLabel={(option) => option.title}
              value={platformValue}
              onChange={(event, selectedValue) => {
                setPlatformValue(selectedValue);
              }}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              limitTags={1}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="플랫폼을 입력 또는 선택하세요"
                  placeholder="platforms"
                />
              )}
              isOptionEqualToValue={(againstTo, selected) => {
                return selected.title === againstTo.title;
              }}
            />
            <Button
              onClick={() => {
                setList();
                setPlatformOpen(false);
              }}
            >
              적용
            </Button>
          </div>
        </Menu>

        {/* 플랫폼 구분 버튼 */}
        <div></div>
      </div>
      <div className="main_inf">
        {filteredList ? (
          filteredList.map((item) => {
            return (
              <div
                style={{
                
                }}
              >
                <div key={item._id} style={{}}>
                  <Link
                    to={`/ProfileDetailpage/${item._id}`}
                    style={{
                      color: "black",
                      display: "flex",
                      flexDirection: "column",
                      width: "200px",
                      height: "280px",
                      alignItems: "flex-start",
                      backgroundColor: "green",
                    }}
                  >
                    <div
                      style={{
                        width: "200px",
                        height: "200px",
                        backgroundColor: "red",
                      }}
                    >
                      <img
                        className="profile-img"
                        src={item.avatar}
                        width="200px"
                        height="200px"
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div style={{ fontSize: "20px" }}>
                        <div>{item.nickname}</div>
                      </div>
                      <div style={{ fontSize: "20px" }}>{item.youtube}</div>
                    </div>
                    <div style={{ fontSize: "14px" }}>{item.mobile}</div>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div>검색결과 없음</div>
        )}
      </div>
    </div>
  );
};
export default Search;
