async function sendAI() {
    const prompt = document.getElementById("prompt").value;
    const resultBox = document.getElementById("result");

    resultBox.textContent = "Loading...";

    try {
        const response = await fetch("/api/ai", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt })
        });

        const data = await response.json();

        if (data.error) {
            resultBox.textContent = "Error: " + data.error;
        } else {
            resultBox.textContent = data.result;
        }

    } catch (err) {
        resultBox.textContent = "Terjadi error koneksi.";
    }
}