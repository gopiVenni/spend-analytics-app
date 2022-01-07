

//table columns
export default[
    {
      id: 1,
      name: "Category Name",
      selector: (row) => row.Category_Name,
      sortable: true,
      reorder: true
    },
    {
      id: 2,
      name: "Date",
      selector: (row) => row.Created_Date,
      sortable: true,
      reorder: true
    }
  ];