import { useContext, useState } from "react";
import { Advertisement, SubCampaign } from "../../types/campaign";
import {
  Button,
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { CampaignContext } from "../../contexts/CampaignContext";
import { SubCampaignContext } from "../../contexts/SubCampaignContext";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

type AdTableProps = {
  subCampaigns: SubCampaign[];
};
export default function AdTable(props: AdTableProps) {
  const { campaign, onChange } = useContext(CampaignContext);
  const { selected } = useContext(SubCampaignContext);
  const { subCampaigns } = props;
  const [selectedRows, setSelectedRows] = useState<readonly number[]>([]);
  const rows = subCampaigns[selected].ads;

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((_, i) => i);
      setSelectedRows(newSelected);
      return;
    }
    setSelectedRows([]);
  };

  const handleClick = (index: number) => {
    const selectedIndex = selectedRows.indexOf(index);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRows, index);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelected = newSelected.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selectedRows.slice(0, selectedIndex), selectedRows.slice(selectedIndex + 1));
    }
    setSelectedRows(newSelected);
  };

  const updateSubCampaign = (field: keyof SubCampaign, value: Advertisement[]) => {
    const subCampaignsCopy = [...subCampaigns];
    subCampaignsCopy.splice(selected, 1, { ...subCampaignsCopy[selected], [field]: value });

    return onChange({ ...campaign, subCampaigns: subCampaignsCopy });
  };

  const updateValue = (field: keyof Advertisement, value: string | number, index: number) => {
    const cloneAds = [...rows];
    cloneAds.splice(index, 1, { ...cloneAds[index], [field]: value });
    updateSubCampaign("ads", cloneAds);
  };

  const addAdvertisement = () => {
    const cloneAds = [...rows];
    cloneAds.push({ name: `Quảng cáo ${cloneAds.length + 1}`, quantity: 1 });
    updateSubCampaign("ads", cloneAds);
  };

  const deleteAds = (index?: number[]) => {
    const rowsToDelete = index ?? selectedRows;
    updateSubCampaign(
      "ads",
      [...rows].filter((_, i) => !rowsToDelete.includes(i))
    );
    setSelectedRows([]);
  };
  const isSelected = (index: number) => selectedRows.indexOf(index) !== -1;
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                onChange={handleSelectAllClick}
                indeterminate={selectedRows.length > 0 && selectedRows.length < rows.length}
                checked={rows.length > 0 && selectedRows.length === rows.length}
              />
            </TableCell>
            {selectedRows.length > 0 ? (
              <TableCell>
                <IconButton onClick={() => deleteAds()}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            ) : (
              <>
                <TableCell>Tên quảng cáo*</TableCell>
                <TableCell>Số lượng*</TableCell>
                <TableCell align="right">
                  <Button variant="outlined" startIcon={<AddIcon />} onClick={addAdvertisement}>
                    THÊM
                  </Button>
                </TableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => {
            const isAdSelected = isSelected(i);
            return (
              <TableRow hover selected={isAdSelected} key={i}>
                <TableCell padding="checkbox">
                  <Checkbox checked={isAdSelected} onChange={() => handleClick(i)} />
                </TableCell>
                <TableCell>
                  <TextField
                    value={row.name}
                    required
                    variant="standard"
                    error={row.name.length === 0}
                    onChange={(e) => updateValue("name", e.target.value, i)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={row.quantity}
                    required
                    variant="standard"
                    InputProps={{ inputProps: { min: 0 } }}
                    error={row.quantity <= 0}
                    onChange={(e) => updateValue("quantity", e.target.value, i)}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton disabled={selectedRows.length > 0} onClick={() => deleteAds([i])}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
