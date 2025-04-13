"use client"
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const columns: GridColDef[] = [
   { field: "id", headerName: "ID", width: 70 },
   { field: "title", headerName: "عنوان محصول", width: 130 },
   { field: "defImg", headerName: "عکس پیشفرض", width: 130 },
   {
      field: "actions",
      headerName: "عملگر ها",
      type: "number",
      width: 90,
   },
   

];

const rows = [
   { id: 1, defImg: "Snow", title: "Jon", age: 35 },
   { id: 2, defImg: "Lannister", title: "Cersei", age: 42 },
   { id: 3, defImg: "Lannister", title: "Jaime", age: 45 },
   { id: 4, defImg: "Stark", title: "Arya", age: 16 },
   { id: 5, defImg: "Targaryen", title: "Daenerys", age: null },
   { id: 6, defImg: "Melisandre", title: null, age: 150 },
   { id: 7, defImg: "Clifford", title: "Ferrara", age: 44 },
   { id: 8, defImg: "Frances", title: "Rossini", age: 36 },
   { id: 9, defImg: "Roxie", title: "Harvey", age: 65 },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function OrdManagerTable() {
   return (
      <Paper sx={{ height: 400, width: "100%" }}>
         <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
         />
      </Paper>
   );
}
