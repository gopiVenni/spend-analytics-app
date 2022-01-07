//table columns
export default[
    {
      id: 1,
      name: "Title",
      selector: (row) => row.Title,
      sortable: true,
      reorder: true
    },
    {
      id: 2,
      name: "Amount",
      selector: (row) => row.Amount,
      sortable: true,
      reorder: true
    },
    {
      id: 3,
      name: "Date",
      selector: (row) => row.Created_Date,
      sortable: true,
      right: true,
      reorder: true
    }
  ];