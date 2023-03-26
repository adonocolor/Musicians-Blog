(() => {
    let timeStart = Date.now();
    window.addEventListener("load", () => {
        let timeEnd = Date.now();
        let milliseconds = timeEnd - timeStart
        document.getElementById("loading").innerText = `${milliseconds} ms (client)`;
    });
})();