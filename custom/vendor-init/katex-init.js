function katexRender(
    ele = document.body,
    settings = {
        delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
            { left: "\\[", right: "\\]", display: true },
            { left: "\\(", right: "\\)", display: false }
        ]
    }
) {
    renderMathInElement(ele, settings);
}

document.addEventListener("DOMContentLoaded", function () {
    katexRender();
});