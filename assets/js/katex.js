options = {
	"macros":{
		"\\abs":"\\left\\lvert #1 \\right\\rvert",
		"\\norm":"\\left\\lVert #1 \\right\\rVert",
		"\\parens":"\\left( #1 \\right)",
		"\\squareb":"\\left[ #1 \\]",
		"\\curlyb":"\\left\\{ #1 \\right\\}",
		"\\cross":"\\left\\langle #1 \\right\\rangle",
		"\\Eb":"\\mathbb{E}",
		"\\Pb":"\\mathbb{P}",
		"\\Rb":"\\mathbb{R}"
	}
};

$("script[type='math/tex']").replaceWith(
  function(){
    var tex = $(this).text();
    return "<span class=\"inline-equation\">" +
           katex.renderToString(tex, options) +
           "</span>";
});

$("script[type='math/tex; mode=display']").replaceWith(
  function(){
    var tex = $(this).text();
    return "<div class=\"equation\">" +
           katex.renderToString("\\displaystyle "+tex, options) +
           "</div>";
});
