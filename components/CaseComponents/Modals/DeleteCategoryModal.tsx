import React, { useState } from "react";
import StyledModal from "./StyledModal";
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
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useMutation, useQuery } from "urql";
import {
  ManagementCategory,
  ManagementContainerQuery,
} from "../CaseManagementContainer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "25ch",
    },
  })
);

type DeleteCaseModalProps = {
  open: boolean;
  onClose: () => void;
};

const RemoveCategoryMutation = `
mutation RemoveCategoryMutation($id: bigint!) {
  delete_category_by_pk(id: $id) {
    id
  }

}
`;

const DeleteCategoryModal: React.FC<DeleteCaseModalProps> = (props) => {
  const classes = useStyles();
  const [id, setId] = useState<number>(-1);
  const [result, executeMutation] = useMutation(RemoveCategoryMutation);
  const [category, setCategory] = useState<number | null>(null);
  const [{ data, fetching, error }, executeQuery] = useQuery({
    query: ManagementContainerQuery,
  });

  return (
    <StyledModal open={props.open} onClose={props.onClose}>
      <Typography variant="h4" align="center">
        Delete a Category
      </Typography>
      <Box>
        {data ? (
          <FormControl fullWidth>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              fullWidth
              value={category}
              onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                setId(event.target.value as number);
              }}
            >
              <MenuItem value={data.id}>{data.name}</MenuItem> 
              {data.category.map((category: any, index: number) => {
                return <MenuItem key={index} value={category.id}>
                  {category.name}
                </MenuItem>
              })}


              {/* END TODO */}
            </Select>
          </FormControl>
        ) : fetching ? (
          "Loading Categories"
        ) : null}
      </Box>
      <Box mt="10px" display="flex" justifyContent="center">
        <Button
          variant="outlined"
          onClick={() => {
            executeMutation({
              id
            });
            props.onClose();
          }}
        >
          Delete
        </Button>
      </Box>
    </StyledModal>
  );
};
export default DeleteCategoryModal;
