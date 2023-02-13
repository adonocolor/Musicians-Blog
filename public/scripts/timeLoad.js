(() => {
    let timeStart = Date.now();
    window.addEventListener("load", () => {
        let timeEnd = Date.now();
        let milliseconds = timeEnd - timeStart
        let seconds = milliseconds / 1000;
        document.getElementById("loading").innerText = `${seconds} s`;
    });
})();