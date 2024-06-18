import "../css/dashboard.css";
import Widget from "../components/widget/Widget";
import Featured from "../components/featured/Featured"
import Chart from "../components/chart/Chart";
import Table from "../components/table/Table";
import styled from "@emotion/styled";

const Container = styled.div`
padding: 20px 30px;
height: 100%;
overflow-y: scroll;
display: flex;
flex-direction: column;
gap: 20px;
`;

const AdminDashboard = () => {
  return (
    <Container>
      
    <div className="home">
    
      <div className="homeContainer">
      
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
    </Container>
  );
};

export default AdminDashboard;
