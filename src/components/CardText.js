import React, { useRef } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import celebration from "../celebration.jpg";
import html2canvas from "html2canvas";
import DownloadIcon from '@mui/icons-material/Download';

const date = new Date();
const formattedDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

const StyledCard = styled(Card)({
  position: "relative",
  height: 549, 
  width: "47%",
  overflow: "hidden",
});

const StyledImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "fill",
});

const TextContainer = styled("div")({
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "16px",
  color: "black",
  textAlign: "center",
  whiteSpace: "nowrap",
});

const DateContainer = styled("div")({
  position: "absolute",
  bottom: "44px", // Adjust bottom spacing as needed
  left: "39px", // Adjust left spacing as needed
});

const DownloadButton = styled("button")(({ theme }) => ({
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  bottom: "-1px", // Adjust bottom spacing as needed
  padding: "3px 12px",
  backgroundColor: "#ffffff00",
  color: "#515050",
  borderRadius: "4px",
  cursor: "pointer",
  border: '2px solid #949494'
}));


const CardText = ({ score, total, user, title }) => {
  const cardRef = useRef(null);

  const handleDownload = () => {
    html2canvas(cardRef.current).then((canvas) => {
      const url = canvas.toDataURL();
      const a = document.createElement("a");
      a.href = url;
      a.download = `certificate_${user}_${formattedDate}.png`; // Set the filename
      a.click();
    });
  };

  return (
    <div style={{display:'contents'}}>
      <StyledCard ref={cardRef}>
        <StyledImage src={celebration} alt="Card background" />
        <TextContainer>
          <CardContent>
            <Typography variant="h4" fontWeight="bold">
              Certificate of Completion
            </Typography>
            <Typography fontWeight="bold" variant="body2" component="p">
              This is to certify that
            </Typography>
            <Typography my={2} color="primary" fontWeight="bold" variant="h3">
              {user}
            </Typography>
            <Typography fontWeight="bold" variant="body2" component="p">
              Has successfully completed the quiz
            </Typography>
            <Typography my={2} variant="h4" fontWeight="bold">
              " {title} "
            </Typography>
            <Typography fontWeight="bold" variant="body2" component="p">
              With a score of {score} out of {total}
            </Typography>
          </CardContent>
        </TextContainer>
        <DateContainer>
          <Typography>Date: {formattedDate}</Typography>
        </DateContainer>
      </StyledCard>
      <DownloadButton variant={'outlined'} onClick={handleDownload}><DownloadIcon/></DownloadButton>
    </div>
  );
};

export default CardText;
