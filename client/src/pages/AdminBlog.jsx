import "../css/dashboard.css";
import BlogAdmin from "../components/adminblog/BlogAdmin";
import styled from "@emotion/styled";
import { CircularProgress, IconButton } from '@mui/material';
import { useNavigate } from "react-router-dom";

const FilterContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
${({ box, theme }) => box && `
background-color: ${theme.bg};
  border-radius: 10px;
  padding: 20px 30px;
`}

`;
const Topic = styled.div`
  color: grey;
  margin: 0 6px;
  font-size: 15px;
  font-weight: 200;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @maedia (max-width: 768px){
    font-size: 10px;
  }
`;

const Span = styled.span`
  color: ${({ theme }) => theme.text_secondary};
  border: 1px dotted grey;
  border-radius: 4px;
  padding: 3px 4px;
  font-size: 13px;
  font-weight: 200;
  color: grey;
  cursor: pointer;
  @media (max-width: 768px){
    font-size: 14px;
  }
  color: ${({ theme }) => theme.primary};
  &:hover{
    transition: 0.2s ease-in-out;
  }
  `;

const Favorite = styled(IconButton)`
  color:white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  border: 1px solid;
  background: ${({ theme }) => theme.text_secondary + 95} !important;
  color: ${({ theme }) => theme.text_primary} !important;
`;

const AdminBlog = () => {
  const navigate = useNavigate();
  return (
    
    <div className="home">
      <div className="homeContainer">
      <div className="listTitle">
      
      <Topic style={{ "font-weigh": "300"}}>
      {/* <MdDoubleArrow style={{ "font-size": "15px"}} /> */}
      Dasboard / Blog Management
          
    
            </Topic>
            <Span style={{ marginLeft: '16px' }} onClick={() => {
            navigate(`/upload-admin`,{replace: true})
      }}> Upload
            {/* <PlusIcon style={{ width: '16px', height: '16px' }}></PlusIcon> */}
            {/* <Span>Upload</Span> */}
            </Span>
      </div>
      
        <div className="listContainer">
          
          <BlogAdmin />
        </div>
      </div>
    </div>
   
  );
};

export default AdminBlog;
