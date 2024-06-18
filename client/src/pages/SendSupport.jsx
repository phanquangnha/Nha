import React from 'react'
import styled from "styled-components";

const HR = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.text_secondary + 20};
  margin: 10px 0px;
`;
const DashboardMain = styled.div`
padding: 20px 30px;
padding-bottom: 200px;
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



const SendSupport = () => {
  return (
    <DashboardMain>
    <div>
      <Title>Thank you for your report</Title>
      <Text> Any member of the YouTube community can flag content they believe violates our Community Guidelines. When something is flagged, it is not automatically removed. We review flagged content according to the following principles:</Text>
      <Context> Content violations <a>Community Guidelines</a> will be removed from Podstream Daily.</Context>
      <Context> Content not suitable for all younger audiences may be age-restricted.</Context>
      <Context> Reports of content that has been removed by the creator will not appear.</Context>
      <Context><a>Learn more about reporting content on YouTube.</a></Context>
    <HR/>
    </div>
    </DashboardMain>
  )
}

export default SendSupport