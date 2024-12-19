import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 18px;
  text-align: left;
`;

export const TableHead = styled.thead`
  background-color: #f2f2f2;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const TableHeader = styled.th`
  padding: 12px 15px;
`;

export const TableCell = styled.td`
  padding: 12px 15px;
`;

export const ActionsCell = styled(TableCell)`
  display: flex;
  gap: 10px;
`;

export const OrderContainer = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
`;

export const OrderInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

export const StatusBadge = styled.span`
  background-color: ${(props) =>
    props.status === "shipped" ? "green" : "red"};
  color: white;
  padding: 5px;
  border-radius: 5px;
`;

export const OrderActions = styled.div`
  margin-top: 10px;
`;

export const ReviewForm = styled.div`
  margin-top: 10px;
`;

export const ReviewTextarea = styled.textarea`
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
`;

export const SubmitReviewButton = styled(Button)`
  background-color: #28a745;
`;

export const ProfileForm = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 5px;
`;
