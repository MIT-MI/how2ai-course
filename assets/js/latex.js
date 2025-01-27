$(document).ready(function() {
    document.querySelectorAll("latex-js")
        .forEach((latexjs) => {
            var shadow = latexjs.shadowRoot;
            var page = Array.from(shadow.childNodes)[3];
            page.style.cssText = "display: block"; 
        });
});
