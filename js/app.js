window.addEventListener("load",function(){
    window.jsPDF = window.jspdf.jsPDF;

    const btnToPDF = document.querySelector(".btn-to-pdf");
    const btnToCSV = document.querySelector(".btn-to-csv");

    btnToPDF.addEventListener("click",Convert_HTML_To_PDF);

    btnToCSV.addEventListener("click",exportTableToCSV);

    function Convert_HTML_To_PDF() {
        var doc = new jsPDF();
        
        // Source HTMLElement or a string containing HTML.
        var elementHTML = document.querySelector("#contentToPrint");

        doc.html(elementHTML, {
            callback: function(doc) {
                // Save the PDF
                doc.save('document-html.pdf');
            },
            margin: [10, 10, 10, 10],
            autoPaging: 'text',
            x: 0,
            y: 0,
            width: 190, //target width in the PDF document
            windowWidth: 675 //window width in CSS pixels
        });
    }

    //user-defined function to download CSV file  
    function downloadCSV(csv, filename) {  
        var csvFile;  
        var downloadLink;  
        
        //define the file type to text/csv  
        csvFile = new Blob([csv], {type: 'text/csv'});  
        downloadLink = document.createElement("a");  
        downloadLink.download = filename;  
        downloadLink.href = window.URL.createObjectURL(csvFile);  
        downloadLink.style.display = "none";  
    
        document.body.appendChild(downloadLink);  
        downloadLink.click();  
    }

    function exportTableToCSV(filename) {  
        //declare a JavaScript variable of array type  
        var csv = [];  
        var rows = document.querySelectorAll("table tr");  
        
        //merge the whole data in tabular form   
        for(var i=0; i<rows.length; i++) {  
            var row = [], cols = rows[i].querySelectorAll("td, th");  
            for( var j=0; j<cols.length; j++)  
            row.push(cols[j].innerText);  
            csv.push(row.join(","));  
        }   
        //call the function to download the CSV file  
        downloadCSV(csv.join("\n"), "MY SCV");  
    }  
});