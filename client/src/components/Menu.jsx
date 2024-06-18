import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { logout } from "../redux/userSlice";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdDarkMode } from "react-icons/md"
import { MdOutlineDarkMode } from "react-icons/md"
import CloseRounded from "@mui/icons-material/CloseRounded";
import LogoIcon from "../Images/Logo.png";
import { openSignin } from "../redux/setSigninSlice";
import { MdDashboard } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { TiFlagOutline } from "react-icons/ti";
import { MdOutlineFeedback } from "react-icons/md";
import { LuHelpCircle } from "react-icons/lu";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { CiLogin } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { MdOutlinePodcasts } from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa6";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { GiNewspaper } from "react-icons/gi";
import { TbPremiumRights } from "react-icons/tb";
import { SiGoogledatastudio } from "react-icons/si";
import { FaHome } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

const MenuContainer = styled.div`
  flex: 0.55;
  flex-direction: column;
  height: 100vh;
  display: flex;
  box-sizing: border-box;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 1100px) {
    position: fixed;
    z-index: 1000;
    width: 100%;
    max-width: 250px;
    left: ${({ setMenuOpen }) => (setMenuOpen ? "0" : "-100%")};
    transition: 0.3s ease-in-out;
  }
`;
const Elements = styled.div`
  padding: 4px 16px;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  color: ${({ theme }) => theme.text_secondary};
  width: 100%;
  &:hover {
    background-color: ${({ theme }) => theme.text_secondary + 15};
    border-radius: 5px;
  }
`;
const NavText = styled.div`
  padding: 8px 0px;
  font-size: 15px;
`;
const HR = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.text_secondary + 20};
  margin: 10px 0px;
`;
const Flex = styled.div`
  margin: 3px;
  justify-content: space-between;
  display: flex;
  align-items: center;
  padding: 5.8px 16px;
  width: 100%;
`;
const FlexSide= styled.div`
  margin-top: 6px;
  justify-content: space-between;
  display: flex;
  align-items: center;
  padding: 10px 16px;
  width: 100%;
 
`;
const Close = styled.div`
  display: none;
  @media (max-width: 1100px) {
    display: block;
  }
`;
const Logo = styled.div`
  color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: purple;  /* fallback for old browsers */
color: -webkit-linear-gradient(to right, #BFE6BA, #D3959B);  /* Chrome 10-25, Safari 5.1-6 */
color: linear-gradient(to right, #BFE6BA, #D3959B); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  gap: 6px;
  font-weight: bold;
  font-size: 16px;
  margin: 10px 0px;
`;
const Image = styled.img`
  height: 25px;
`;
const Underline = styled.div`
  margin: 1rem 1.8rem;
  font-size: 13px;
`;

const Menu = ({ menuOpen,setMenuOpen, darkMode, setDarkMode, setUploadOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const logoutUser = () => {
    dispatch(logout());
    navigate(`/`);
  };

  return (
    <MenuContainer setMenuOpen={setMenuOpen}>
      
      {currentUser?.isAdmin && (
        
        <>
        <Flex>
        
        <Link to="/admin-dashboard" style={{ textDecoration: "none", color: "inherit" }}>
        <Logo>
        
            <Image src={LogoIcon} />
            Admin Podstream
          </Logo>
        </Link>
        
        
        <Close>
          <CloseRounded
            onClick={() => setMenuOpen(false)}
            style={{ cursor: "pointer" }}
          />
        </Close>
      </Flex>
      {/* <hr style={{ "width": "100%", "color": "rgb(255, 255, 255)"}}/> */}
    
      {/* <PictureLogo>
      <Link to='/profile' style={{ textDecoration: 'none' }}>
           <Avatar src={currentUser?.img} >{currentUser?.name.charAt(0).toUpperCase()}</Avatar>
          </Link>
          </PictureLogo>
          <Welcome>{currentUser?.name}</Welcome> */}

          <Link
            to="/admin-dashboard"
            style={{ textDecoration: "none", color: "inherit", width: "100%" }}
          >
            <Elements>
              <MdDashboard className="icons"/>
              <NavText>Dashboard</NavText>
            </Elements>
          </Link>
          <Link
            to="/admin-user"
            style={{ textDecoration: "none", color: "inherit", width: "100%" }}
          >
            <Elements>
              <AiOutlineUsergroupAdd className="icons"/>
              <NavText>Users</NavText>
            </Elements>
          </Link>

          <Link
            to="/admin-podcast"
            style={{ textDecoration: "none", color: "inherit", width: "100%" }}
          >
            <Elements>
              <MdOutlinePodcasts className="icons" />
              <NavText>Podcasts</NavText>
            </Elements>
          </Link>
          
          <Link
            to="/admin-blog"
            style={{ textDecoration: "none", color: "inherit", width: "100%" }}
          >
            <Elements>
              <HiOutlineNewspaper className="icons" />
              <NavText>Blogs</NavText>
            </Elements>
          </Link>

          
        </>
      )}
      {/* --------------------------------------------------------------------------------------------------- */}
      {!currentUser?.isAdmin && (
        <>
        <FlexSide>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo tyle={{ "padding-top":"30px",color: "inherit" }}>
            <Image src={LogoIcon} />
            PodBlogAI UTE
          </Logo>
        </Link>
        <Close>
          <CloseRounded
            onClick={() => setMenuOpen(false)}
            style={{ cursor: "pointer" }}
          />
        </Close>
      </FlexSide>
          <Link
            to="/"
            style={{ textDecoration: "none", color: "inherit", width: "100%" }}
          >
            <Elements>
              <FaHome className="icons" />
              <NavText>Home</NavText>
            </Elements>
          </Link>
          
          <Link
            to="/search"
            style={{ textDecoration: "none", color: "inherit", width: "100%" }}
          >
            <Elements>
              <MdOutlineVideoLibrary className="icons"/>
              <NavText>Library</NavText>
            </Elements>
          </Link>

          { currentUser ? (
        <Link
          to="/favourites"
          style={{ textDecoration: "none", color: "inherit", width: "100%" }}
        >
          <Elements>
            <FaRegHeart className="icons"/>
            <NavText>Favourite</NavText>
          </Elements>
        </Link>
      ) : (
        <Link
          onClick={() => dispatch(openSignin())}
          style={{ textDecoration: "none", color: "inherit", width: "100%" }}
        >
          <Elements>
            <FaRegHeart className="icons" />
            <NavText>Favourite</NavText>
          </Elements>
        </Link>
      )}

          <HR/>
          <Link
            to="/blog"
            style={{ textDecoration: "none", color: "inherit", width: "100%" }}
          >
            <Elements>
              <GiNewspaper className="icons"/>
              <NavText>Blogs</NavText>
            </Elements>
          </Link>
          
          
        </>
      )}

      <Link
        onClick={() => {
          if (currentUser) {
            setUploadOpen(true);
          } else {
            dispatch(openSignin());
          }
        }}
        style={{ textDecoration: "none", color: "inherit", width: "100%" }}
      >
        <Elements>
          <TbPremiumRights className="icons"/>
          <NavText>Add New Post</NavText>
        </Elements>
      </Link>
      {/* {!currentUser ? (
        <Link
          to="/favourites"
          style={{ textDecoration: "none", color: "inherit", width: "100%" }}
        >
          <Elements>
            <SlLike className="icons"/>
            <NavText>Favourite</NavText>
          </Elements>
        </Link>
      ) : (
        <Link
          onClick={() => dispatch(openSignin())}
          style={{ textDecoration: "none", color: "inherit", width: "100%" }}
        >
          <Elements>
            <SlLike className="icons" />
            <NavText>Favourite</NavText>
          </Elements>
        </Link>
      )} */}

      
      {/* <HR/> */}
          
          
          <Link
            to="/send-support"
            style={{ textDecoration: "none", color: "inherit", width: "100%" }}
          >
            <Elements>
              <TbPremiumRights className="icons"/>
              <NavText>Poddaily Premium</NavText>
            </Elements>
          </Link>

          <Link
            to="/send-support"
            style={{ textDecoration: "none", color: "inherit", width: "100%" }}
          >
            <Elements>
              <SiGoogledatastudio className="icons"/>
              <NavText>Poddaily Studio</NavText>
            </Elements>
          </Link>
          {darkMode ? (
        <>
          <Elements onClick={() => setDarkMode(false)}>
            <MdDarkMode className="icons"/>
            <NavText>Dark Mode</NavText>
          </Elements>
        </>
      ) : (
        <>
          <Elements onClick={() => setDarkMode(true)}>
            <MdOutlineDarkMode className="icons" />
            <NavText>Light Mode</NavText>
          </Elements>
        </>
      )}
      <HR/>
      <Link
            to="/send-support"
            style={{ textDecoration: "none", color: "inherit", width: "100%" }}
          >
            <Elements>
              <IoMdSettings className="icons"/>
              <NavText>Setting</NavText>
            </Elements>
          </Link>
          <Link
            to="/send-support"
            style={{ textDecoration: "none", color: "inherit", width: "100%" }}
          >
            <Elements>
              <TiFlagOutline className="icons"/>
              <NavText>Report log</NavText>
            </Elements>
          </Link>
          <Link
            to="/send-support"
            style={{ textDecoration: "none", color: "inherit", width: "100%" }}
          >
            <Elements>
              <LuHelpCircle className="icons"/>
              <NavText>Help</NavText>
            </Elements>
          </Link>
          <Link
            to="/send-feed"
            style={{ textDecoration: "none", color: "inherit", width: "100%" }}
          >
            <Elements>
              <MdOutlineFeedback className="icons"/>
              <NavText>Send Feedback</NavText>
            </Elements>
          </Link>
          {currentUser ? (
        <Elements onClick={() => logoutUser()}>
          <CiLogout className="icons" />
          <NavText>Log Out</NavText>
        </Elements>
      ) : (
        <Elements onClick={() => dispatch(openSignin())}>
          <CiLogin className="icons"/>
          <NavText>Log In</NavText>
        </Elements>
      )}
          <HR/>
          <Underline> © 2024 Copyright owned <br/> by Nhã Phan LLC</Underline>
          
    </MenuContainer>
  );
};

export default Menu;