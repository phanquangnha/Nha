import "./table.css";
import react,{useState,useEffect} from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import axios from "axios";


const List = () => {
  const  [user,setUser] = useState(null)
  const  [data,setData] = useState([])
  const [selected, setSelected] = useState('');

  useEffect(() => {
    new Promise(async () => {
      await getList();
    })
  },[])

  const getList = async () => {
    try {
      const res = await axios.get(`/rooms/list-booking`);
      if (res) {
        setData(res.data);
      }
    } catch (error) {
      
    }
  };

  console.log(data);

  const onHandleClick =(user)=>{
      setUser(user)
      localStorage.setItem("user", JSON.stringify(user));

  }

  const handleChangeData = async (e,id) => {
    const res = await axios.put(`/rooms/update/list-booking/${id}`, { status: e });
    if (res.status === 200) {
      await getList();
    }
  }

  console.log("uer",user)
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Id</TableCell>
            <TableCell className="tableCell">Info Room</TableCell>
            <TableCell className="tableCell">Name User Book</TableCell>
            <TableCell className="tableCell">Action</TableCell>
            <TableCell className="tableCell">Status</TableCell>
            <TableCell className="tableCell">Status Payment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row._id}>
              <TableCell className="tableCell">{row._id}</TableCell>
              <TableCell className="tableCell">
              <table>
                      <tr>
                        <th>Room</th>
                        <th>Des</th>
                        <th>Price</th>
                        <th>Max People</th>
                        <th>Date</th>
                      </tr>
                      {row?.idRoom?.map((it) => (
                      <tr>
                          <td>{it.title}</td>
                           <td>{it.desc}</td>
                          <td>{it.price}</td>
                          <td>{it.maxPeople}</td>
                          <td>{it.updatedAt}</td>
                      </tr>
                      ))}
                    </table>
              </TableCell>
              <TableCell className="tableCell">{row?.idUser?.username}</TableCell>
              <TableCell className="tableCell">
                <select onChange={(e) => handleChangeData(e.target.value, row._id)}>
                  <option value="pending">----------------</option>
                  <option value="cancel">Cancel Booking</option>
                  <option value="success">Confirm</option>
                </select>
              </TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.statusPayment}`}>{row.statusPayment}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
