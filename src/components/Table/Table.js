import React, { useState, useMemo } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
  FormControl,
  Select,
  MenuItem,
  TextField,
  TableContainer,
  Paper,
} from "@material-ui/core";

import {
  ArrowDropDown,
  ArrowDropUp,
  ArrowBack,
  ArrowForward,
} from "@material-ui/icons";

import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

const data = [
  {
    asset: "SPZ Spizer",
    price: "$23,418.23",
    change: "+0.48%",
    volume: "15,426.98M",
    marketCap: "$451,550.89M",
  },
  {
    asset: "CDS Cadise",
    price: "$412",
    change: "+0.21%",
    volume: "5,915.54M",
    marketCap: "$204,691.09M",
  },
  {
    asset: "DEQ Deaquer",
    price: "$23,418.23",
    change: "-1.23%",
    volume: "24,184.30M",
    marketCap: "$68,064.63M",
  },
  {
    asset: "FOL Folerz",
    price: "$23,418.23",
    change: "+2.12%",
    volume: "466.74M",
    marketCap: "$53,086.18M",
  },
  {
    asset: "PCV Pacavier",
    price: "$23,418.23",
    change: "-3.31%",
    volume: "560.50M",
    marketCap: "$20,903.82M",
  },
  {
    asset: "SPZ Spizer1",
    price: "$23,418.23",
    change: "+0.48%",
    volume: "15,426.98M",
    marketCap: "$451,550.89M",
  },
  {
    asset: "CDS Cadise1",
    price: "$412",
    change: "+0.21%",
    volume: "5,915.54M",
    marketCap: "$204,691.09M",
  },
  {
    asset: "DEQ Deaquer1",
    price: "$23,418.23",
    change: "-1.23%",
    volume: "24,184.30M",
    marketCap: "$68,064.63M",
  },
  {
    asset: "FOL Folerz1",
    price: "$23,418.23",
    change: "+2.12%",
    volume: "466.74M",
    marketCap: "$53,086.18M",
  },
  {
    asset: "PCV Pacavier1",
    price: "$23,418.23",
    change: "-3.31%",
    volume: "560.50M",
    marketCap: "$20,903.82M",
  },
  {
    asset: "SPZ Spizer2",
    price: "$23,418.23",
    change: "+0.48%",
    volume: "15,426.98M",
    marketCap: "$451,550.89M",
  },
  {
    asset: "CDS Cadise2",
    price: "$412",
    change: "+0.21%",
    volume: "5,915.54M",
    marketCap: "$204,691.09M",
  },
  {
    asset: "DEQ Deaquer2",
    price: "$23,418.23",
    change: "-1.23%",
    volume: "24,184.30M",
    marketCap: "$68,064.63M",
  },
  {
    asset: "FOL Folerz2",
    price: "$23,418.23",
    change: "+2.12%",
    volume: "466.74M",
    marketCap: "$53,086.18M",
  },
  {
    asset: "PCV Pacavier2",
    price: "$23,418.23",
    change: "-3.31%",
    volume: "560.50M",
    marketCap: "$20,903.82M",
  },
];

const tableHeaders = [
  { id: "asset", label: "Assets" },
  { id: "price", label: "Price" },
  { id: "change", label: "Change" },
  { id: "volume", label: "24h Volume" },
  { id: "marketCap", label: "Market Cap" },
];


console.log(data);
const TableComponent = () => {
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState("asset");
  const [order, setOrder] = useState("asc");


  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value);
  };

  const handleSortClick = (property) => {
    if (orderBy === property && order === "asc") {
      setOrder("desc");
    } else {
      setOrder("asc");
      setOrderBy(property);
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setPage(0);
  };

  const handlePageChange = (_, newPage) => {
    setPage(newPage - 1 );
  };

  const dataCheck = data && data.length > 0 ? data.slice() : [];

  const sortedData = useMemo(() => {
    if (!order) {
        return dataCheck;
    }

    if (search) {
        return dataCheck.filter((value) => value.asset.toLowerCase().includes(search.toLowerCase()));
    }

    return dataCheck.sort((a, b) => {
        let aValue = a[orderBy];
        let bValue = b[orderBy];
        if( orderBy === 'price' || orderBy === 'change' || orderBy === 'marketCap' || orderBy === 'volume') {
            aValue = aValue.replace(/[^0-9.\-\+]/g, '');
            bValue = bValue.replace(/[^0-9.]/g, '');
        }
        if (order === "asc") {
          if(orderBy === 'change') {
            return Number(aValue) - Number(bValue);
          }
          return aValue.localeCompare(bValue, 'en', {numeric: true});
        } else {
          if(orderBy === 'change') {
            return Number(bValue) - Number(aValue);
          }
          return bValue.localeCompare(aValue, 'en', {numeric: true});
        }
    })
  },[dataCheck, order, orderBy, search]);

  const filteredData = sortedData.filter((item) => {
    if (filter === "All") {
      return true;
    }
    if (filter === "Crypto") {
      return item.asset.startsWith("C");
    }
    if (filter === "Stock") {
      return item.asset.startsWith("S");
    }
    return false;
  });

  const paginatedData = filteredData.slice(page * 5, (page + 1) * 5);

  return (
    <>
      <TextField
        label="Search Asset"
        value={search}
        onChange={handleSearchChange}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
              <TableRow>
                  {tableHeaders.map((header) => (
                    <TableCell key={header.id}>
                      <TableSortLabel
                        active={orderBy === header.id}
                        direction={order}
                        onClick={() => handleSortClick(header.id)}
                      >
                        {header.label}
                        {orderBy === header.id &&
                          (order === "desc" ? (
                            <ArrowDropDown />
                          ) : (
                            <ArrowDropUp />
                          ))}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                  <TableCell>
                    <FormControl>
                      <Select value={filter} onChange={handleFilterChange}>
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Crypto">Crypto</MenuItem>
                        <MenuItem value="Stock">Stock</MenuItem>
                      </Select>
                    </FormControl>
                </TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow key={item.asset}>
                <TableCell>{item.asset}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell
                  style={{ color: item.change.startsWith("-") ? "red" : "green" }}
                >
                  {item.change}
                </TableCell>
                <TableCell>{item.volume}</TableCell>
                <TableCell>{item.marketCap}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          count={Math.ceil(filteredData.length / 5)}
          page={page}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBack, next: ArrowForward }}
              {...item}
            />
          )}
          onChange={handlePageChange}
        />
      </TableContainer>
    </>
  );
};

export default TableComponent;
