import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardSubtitle,
  CardText,
} from "reactstrap";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { useQuery } from "urql";
import CloseIcon from "@material-ui/icons/Close";

type CaseCardProps = {
  data: CaseData;
};

export type CaseData = {
  name: string;
  status: string;
  description: string;
  id: number;
};

const CaseCard: React.FC<CaseCardProps> = (props) => {
  const caseData = props.data;
  const statuses = ["To Do", "In Progress", "Done"]

  return (
    <Container>
      <div style={{ width: "100%", padding: "5px" }}>
        <Card body style={{ backgroundColor: "#e4ebf5" }}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
          >
            <CardTitle tag="h3">{caseData.name}</CardTitle>
            <CloseIcon />
          </Box>

          <CardSubtitle tag="h6" className="mb-2 text-muted">
            {caseData.status}
            <Button onClick={() => 
             {caseData.status == "To Do" ? (caseData.status = "In Progress"
              ) : caseData.status == "In Progress" ? (caseData.status = "Done"
              ) : caseData.status = "To Do"
             }

            }> Change Status </Button>
          </CardSubtitle>
          <CardText>{caseData.description}</CardText>
        </Card>
      </div>
    </Container>
  );

  

};
export default CaseCard;
