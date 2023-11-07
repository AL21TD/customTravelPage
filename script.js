document.addEventListener("DOMContentLoaded", function () {
    var showCodeButton = document.getElementById("showCodeButton");

    // Event-Listener für den Button hinzufügen
    showCodeButton.addEventListener("click", function () {
        var selectedRegion = document.getElementById("countries").value;

        fetch('codes.csv')

            .then(response => response.text())
            .then(csvData => {
                var lines = csvData.split("\n");
                var regions = lines[0].split(";");
                var rows = lines.slice(1);

                var regionIndex = regions.indexOf(selectedRegion);
                if (regionIndex !== -1) {
                    var codes = rows.map(row => row.split(";")[regionIndex]);
                    var nextCode = codes.find(code => code.trim() !== '');
                    if (nextCode) {
                        localStorage.setItem("generatedCode", nextCode);
                        localStorage.setItem("selectedRegion", selectedRegion);
                        window.location.href = "https://al21td.github.io/customTravelPage/code.html";

                    } else {
                        alert("Kein Code verfügbar für die ausgewählte Region.");
                    }
                } else {
                    alert("Ungültige Region ausgewählt.");
                }
            })
            .catch(error => {
                console.error('Fehler beim Laden der CSV-Datei:', error);
            });
    });
});