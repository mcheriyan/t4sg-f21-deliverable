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
  const [status, setStatus] = useState<string | null>(null);

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
              <FormControl fullWidth>
              <InputLabel id="status-select-label">Status</InputLabel>
              <Select
                labelId="status-select-label"
                fullWidth
                value={status}
                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                  setStatus(event.target.value as string);
                }}
              >
                <MenuItem value={"To Do"}>To Do</MenuItem>
                <MenuItem value={"In Progress"}>In Progress</MenuItem>
                <MenuItem value={"Done"}>Done</MenuItem>
              </Select>
            </FormControl>}> Edit Status </Button>
          </CardSubtitle>
          <CardText>{caseData.description}</CardText>
        </Card>
      </div>
    </Container>
  );

  

};
export default CaseCard;
