import React from "react";
import { Container, Row, Col } from "reactstrap";
import { useQuery } from "urql";
import CaseCard, { CaseData } from "./CaseCard";
import Button from "react-bootstrap/Button";
import DeleteCategoryModal from "./Modals/DeleteCategoryModal";

type CaseCategoryProps = {
  category_id: number;
};

type CaseCategoryData = {
  name: string;
  cases: CaseData[];
};

const CategoryQuery = `
  query CategoryQuery($category_id: bigint = "") {
    category(where: {id: {_eq: $category_id}}, limit: 1) {
      cases {
        name
        status
        description
        id
      }
      name
    }
}
`;

const CaseCategory = (props: CaseCategoryProps) => {
  const category_id = props.category_id;
  const [{ data, fetching, error }, executeQuery] = useQuery({
    query: CategoryQuery,
    variables: { category_id },
  });
  const [deleteCategoryModalOpen, setDeleteCategoryModalOpen] =
    React.useState<boolean>(false);

  const category: CaseCategoryData | null = data ? data?.category[0] : null;

  <DeleteCategoryModal
        onClose={() => setDeleteCategoryModalOpen(false)}
        open={deleteCategoryModalOpen}
      /> 
    
  return (
    <Container
      style={{ width: "100%", borderStyle: "solid", padding: "0.75rem" }}
    >
      <Button variant="dark" onClick={() => setDeleteCategoryModalOpen(true)}>
          Save Changes
      </Button>
      <Row>
        <Col>
          {category ? (
            <h3 className="font-weight-normal t4sg-color text-center">
              {category.name}
            </h3>
          ) :
          fetching ? (
            <h3 className="font-weight-normal t4sg-color text-center">
              Loading data...
            </h3>
          ) : (
            <h3 className="font-weight-normal t4sg-color text-center">
              Something went wrong!
            </h3> 
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          {category 
            ? (category.cases.map((c: CaseData, index: number) => {
                return <CaseCard key={index} data={c} />;
              })) :
            fetching ? (
              "Loading..."
            )
            : "Something went wrong!"}
        </Col>
      </Row>
    </Container>
  );
};



export default CaseCategory;
