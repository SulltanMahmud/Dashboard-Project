$(document).ready(function () {
  $.ajax({
    url: "./libs/ChartJs/employees.json",
    dataType: "json",
    success: function (data) {
      const table = $("#employeeTable").DataTable({
        data: data,
        columns: [
          { data: "id" },
          { data: "name" },
          { data: "email" },
          { data: "Department" },
          { data: "time_duration_years" },
          {
            data: "salary",
            render: function (data) {
              return (
                "$" + data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              );
            },
          },
        ],
        dom: '<"row"<"col-sm-12 col-md-6 d-flex"B><"col-sm-12 col-md-6"f>>t<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
        buttons: [
          {
            extend: "copyHtml5",
            className: "btn btn-outline-secondary ",
            text: '<i class="fas fa-copy me-1 mb-sm-2 mb-0"></i> Copy',
            title: "Employee Data",
          },
          {
            extend: "excelHtml5",
            className: "btn btn-outline-success me-1",
            text: '<i class="fas fa-file-excel me-1"></i> Excel',
            title: "Employee Data",
          },
          {
            extend: "csvHtml5",
            className: "btn btn-outline-info me-1",
            text: '<i class="fas fa-file-csv me-1"></i> CSV',
            title: "Employee Data",
          },
          {
            extend: "pdfHtml5",
            className: "btn btn-outline-danger me-1",
            text: '<i class="fas fa-file-pdf me-1"></i> PDF',
            title: "Employee Data",
          },
          {
            extend: "print",
            className: "btn btn-outline-primary",
            text: '<i class="fas fa-print me-1"></i> Print',
            title: "Employee Data",
          },
        ],
        searching: true,
        paging: true,
        pageLength: 10,
        responsive: true,
        order: [[0, "asc"]],
        columnDefs: [
          {
            targets: 5,
            render: function (data, type) {
              return type === "sort"
                ? parseFloat(data)
                : "$" + data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
          },
        ],
        language: {
          search: "_INPUT_",
          searchPlaceholder: "Search employees...",
          paginate: {
            first: "First",
            last: "Last",
            next: "Next",
            previous: "Previous",
          },
        },
      });

      const searchInput = $(".dataTables_filter input");
      searchInput.unwrap();
      searchInput.addClass("form-control");
      searchInput.wrap('<div class="input-group"></div>');
      searchInput.after(
        '<button class="btn btn-primary" type="button" id="searchButton"><i class="fas fa-search"></i></button>'
      );

      $("#searchButton").on("click", function () {
        table.search(searchInput.val()).draw();
      });

      searchInput.on("keypress", function (e) {
        if (e.which === 13) {
          table.search(searchInput.val()).draw();
        }
      });
    },
    error: function (xhr, status, error) {
      console.error("Error loading JSON:", xhr.status, error);
      alert(
        "Failed to load employee data. Please check the JSON file path or server."
      );
    },
  });
});
