(function () {
  ("use strict");
  function startDownload(csv) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");

    for (var i = 0; i < rows.length; i++) {
      var row = [],
        cols = rows[i].querySelectorAll("td, th");

      for (var j = 0; j < cols.length; j++) {
        let columnItem = cols[j].innerText.replace(/"/g, '""');
        columnItem = columnItem.replace(/(\r\n\t|\n|\r\t)/gm, " ").trim(); //remove new lines
        cols[j].querySelectorAll("img").forEach(function (ele) {
          columnItem =
            columnItem + (columnItem.length > 0 ? " " : "") + ele.src;
        });
        cols[j].querySelectorAll("input, textarea").forEach(function (ele) {
          columnItem =
            columnItem +
            (columnItem.length > 0 ? " " : "") +
            ele.value +
            " (i)";
        });
        row.push('"' + columnItem + '"');
      }

      csv.push(row.join(","));
    }

    let downloadLink = document.createElement("a");
    let fileName = "table";
    if (fileName == null) return;
    downloadLink.download = fileName != "" ? fileName + ".csv" : "table.csv";
    downloadLink.href = window.URL.createObjectURL(
      new Blob([csv.join("\r\n")], { type: "text/csv" })
    );
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  if (window.hasOwnProperty("dltcsvRightClick") && dltcsvRightClick) {
    dltcsvRightClick = false;
    startDownload();
  } else {
    var html = document.querySelector("table");

    if (html === null) {
      alert("No table was found");
      return;
    } else {
      var table = html.outerHTML;
      startDownload(table);
    }
  }
})();
