// fetch data from API
fetch("/libs/ChartJs/employees.json")
  .then((response) => response.json())
  .then((data) => {
    const labelsDepartment = data.map((item) => item.Department);
    const labels = [...new Set(labelsDepartment)];
    const labelsCount = labels.map((label) => {
      return data.filter((item) => item.Department === label).length;
    });

    console.log(labelsCount, "labelsCount");
    console.log(labelsDepartment, "labelsDepartment");
    console.log(labels, "labels");

    // bar chart
    const timeDuration = {
      "1 Year": 0,
      "2-3 Years": 0,
      "5-7 Years": 0,
      "8-10 Years": 0,
      "Above 10 Years": 0,
    };

    data.map((item) => {
      const years = item.time_duration_years;

      if (years === 1) {
        timeDuration["1 Year"]++;
      } else if (years >= 2 && years <= 3) {
        timeDuration["2-3 Years"]++;
      } else if (years >= 5 && years <= 7) {
        timeDuration["5-7 Years"]++;
      } else if (years >= 8 && years <= 10) {
        timeDuration["8-10 Years"]++;
      } else if (years > 10) {
        timeDuration["Above 10 Years"]++;
      }
    });

    const barLabels = Object.keys(timeDuration);
    const barData = Object.values(timeDuration);
    console.log(barLabels, "barLabels");
    console.log(data, "data");

    // salary chart

    const ctx = document.getElementById("Chart").getContext("2d");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: barLabels,
        datasets: [
          {
            label: "Employees",
            data: barData,
            backgroundColor: [
              "#4361ee",
              "#3f37c9",
              "#4895ef",
              "#4cc9f0",
              "#7209b7",
            ],
            borderColor: [
              "#3f37c9",
              "#3f37c9",
              "#4895ef",
              "#4cc9f0",
              "#7209b7",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
          tooltip: {
            backgroundColor: "#fff",
            titleColor: "#000",
            bodyColor: "#333",
            borderColor: "#ccc",
            borderWidth: 1,
            padding: 10,
            titleFont: { weight: "bold" },
          },
          title: {
            display: true,
            text: "Employee Duration",
            font: {
              size: 20,
              weight: "bold",
              family: "Arial, sans-serif",
            },
            color: "#333",
            position: "bottom",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    //  doughnut chart

    const pieChart = new Chart(document.getElementById("myChart"), {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Departments",
            data: labelsCount,
            backgroundColor: [
              "#007bff",
              "#28a745",
              "#ffc107",
              "#dc3545",
              "#17a2b8",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
          title: {
            display: true,
            text: "Employee Tenure",
            font: {
              size: 20,
              weight: "bold",
              family: "Arial, sans-serif",
            },
            color: "#333",
            position: "bottom",
          },
        },
      },
    });

    // line chart
    const salaryRanges = [
      { label: "<20k", min: 0, max: 20000, count: 0 },
      { label: "20k-40k", min: 20000, max: 40000, count: 0 },
      { label: "40k-60k", min: 40000, max: 60000, count: 0 },
      { label: "60k-80k", min: 60000, max: 80000, count: 0 },
      { label: "80k-100k", min: 80000, max: 100000, count: 0 },
      { label: "100k-120k", min: 100000, max: 120000, count: 0 },
    ];

    data.forEach((employee) => {
      const salary = employee.salary;

      for (const range of salaryRanges) {
        if (salary >= range.min && salary <= range.max) {
          range.count++;
          break;
        }
      }
    });
    const lineLabels = salaryRanges.map((range) => range.label);
    const lineData = salaryRanges.map((range) => range.count);

    console.log(lineLabels, "lineLabels");

    console.log(lineData, "lineData");

    const lineChart = new Chart(document.getElementById("lineChart"), {
      type: "line",
      data: {
        labels: lineLabels,
        datasets: [
          {
            label: "Salary Ranges",
            data: lineData,
            backgroundColor: [
              "#007bff",
              "#28a745",
              "#ffc107",
              "#dc3545",
              "#17a2b8",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
          title: {
            display: true,
            text: "Employee Salary",
            font: {
              size: 20,
              weight: "bold",
              family: "Arial, sans-serif",
            },
            color: "#333",
            position: "bottom",
          },
        },
      },
    });
  });
