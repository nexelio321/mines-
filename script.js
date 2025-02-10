async function predictMines() {
    const serverSeed = document.getElementById("server-seed").value;
    const clientSeed = document.getElementById("client-seed").value;
    const mineCount = parseInt(document.getElementById("mine-count").value);

    if (!serverSeed || !clientSeed || mineCount < 1 || mineCount > 24) {
        alert("Please enter valid inputs!");
        return;
    }

    try {
        let response = await fetch("https://stake-predictor-api.railway.app/predict-mines", {  // 👈 CHANGE THIS TO YOUR DEPLOYED URL
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ serverSeed, clientSeed, mineCount })
        });

        let data = await response.json();
        if (data.error) {
            alert(data.error);
            return;
        }

        displayMines(data.mines);
    } catch (error) {
        alert("Server error! Make sure backend is running.");
    }
}
