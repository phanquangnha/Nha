import "../css/dashboard.css";
import PodcastAdmin from "../components/adminpodcast/PodcastAdmin";
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

const AdminPodcast = () => {
  return (
    <div className="home">
      <div className="homeContainer">
      <div className="listTitle">
        <Topic>Dashboard / Podcast Management</Topic>
        </div>
        <div className="listContainer">
          <PodcastAdmin />
        </div>
      </div>
    </div>
   
  );
};

export default AdminPodcast;
