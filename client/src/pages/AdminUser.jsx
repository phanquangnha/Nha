import "../css/dashboard.css";
import UserAdmin from "../components/adminuser/UserAdmin";
import styled from "@emotion/styled";

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

const AdminUser = () => {
  return (
    <div className="home">
      <div className="homeContainer">
      <div className="listTitle">
      <Topic>Dashboard / User Management</Topic>
      </div>
        <div className="listContainer">
          <UserAdmin />
        </div>
      </div>
    </div>
   
  );
};

export default AdminUser;
