import React from 'react'
import styled from "styled-components";
import ReactQuill from 'react-quill';

const HR = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.text_secondary + 20};
  margin: 10px 0px;
`;
const DashboardMain = styled.div`
padding: 20px 30px;
padding-bottom: 400px;
height: 100%;
overflow-y: scroll;
display: flex;
flex-direction: column;
gap: 20px;
@media (max-width: 768px){
  padding: 6px 10px;
}
${({ box, theme }) => box && `
background-color: ${theme.bg};
  padding: 20px 30px;
`}
background-color: ${({ theme }) => theme.bg};
  padding: 20px 30px;

`;

const Title = styled.div`
font-size: 24px;
font-weight: 500;
color: ${({ theme }) => theme.text_secondary};
  padding: 10px 30px;
`;

const Text = styled.div`
font-size: 14px;
font-weight: 500;
color: ${({ theme }) => theme.text_secondary};
  padding: 10px 30px;
`;

const Context = styled.div`
font-size: 14px;
font-weight: 500;
color: ${({ theme }) => theme.text_secondary};
  padding: 10px 30px;
`;


const Wrapper = styled.div`
  max-width: 70%;
  width: 100%;
  border-radius: 16px;
  margin: 0px 20px;
  height: min-content;
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const OutlinedBox = styled.div`
  min-height: 30px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  color: ${({ theme }) => theme.text_secondary};
  ${({ googleButton, theme }) =>
    googleButton &&
    `
    user-select: none; 
  gap: 16px;`}
  ${({ button, theme }) =>
    button &&
    `
    user-select: none; 
  border: none;
    font-weight: 600;
    font-size: 16px;
    background: ${theme.button};
    color:'${theme.bg}';`}
    ${({ activeButton, theme }) =>
    activeButton &&
    `
    user-select: none; 
  border: none;
    background: ${theme.primary};
    color: white;`}
  margin: 3px 20px;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 14px;
`;

const TextInput = styled.input`
  width: 100%;
  border: none;
  font-size: 14px;
  border-radius: 3px;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text_secondary};
`;

const Desc = styled.textarea`
  width: 100%;
  border: none;
  font-size: 14px;
  border-radius: 3px;
  background-color: transparent;
  outline: none;
  padding: 10px 0px;
  color: ${({ theme }) => theme.text_secondary};
`;


const SendFeed = () => {
  return (
    <DashboardMain>
    <div>
      <Title>Thank you for your send feedback</Title>
      <Text> All feedback should be sent to email lequangdoanh888@gmail.com</Text>
      <Context><a>Copyright and ownership belong to Nhã Phan © 2024 LLC</a></Context>
    <HR/>
    </div>
      <Wrapper>
      <h4>Please provide your feedback in the form below</h4>
      <form name="feedback_form" id="feedback_form" method="post"/>
<label style={{ marginBottom: "10px" }}>How do you rate your overall experience?</label>
<div class="mb-3 d-flex flex-row py-1" style={{ "display":"flex", marginBottom: "25px" }}>
  <div class="form-check mr-3">
  <input class="form-check-input" type="radio" name="rating" id="rating_bad" value="bad"/>
  <label class="form-check-label" for="rating_bad">
    Bad
  </label>
  </div>
  
  <div class="form-check mx-3">
  <input class="form-check-input" type="radio" name="rating" id="rating_good" value="good"/>
  <label class="form-check-label" for="rating_good">
    Good
  </label>
  </div>
  
  <div class="form-check mx-3">
  <input class="form-check-input"  type="radio" name="rating" id="rating_excellent" value="excellent"/>
  <label class="form-check-label" for="rating_excellent">
    Excellent!
  </label>
  </div>
</div>

<div >
        <lable >Comment :</lable>
        <ReactQuill
            theme="snow"
            style={{ width: '100%', marginTop:"10px" }}
          />
       
</div>

        <OutlinedBox
          button={true}
          style={{ "width":"8%",marginTop: "15px", marginBottom: "18px" }}
        >
          Submit
        </OutlinedBox>
      </Wrapper>
    
    </DashboardMain>
  )
}

export default SendFeed