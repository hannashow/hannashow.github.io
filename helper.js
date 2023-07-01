function $g(selector){
    //nodelist⾄至少包含⼀一個node - Element object
    //如果沒有符合的，則會是⼀一個empty NodeList
    let nodelist = document.querySelectorAll(selector);
    if(nodelist.length==0){
    return null;
    }
    return nodelist.length == 1 ? nodelist[0] :
    nodelist;
    }
    export { $g };


    function $ce(element, text) {
        let el = document.createElement(element);
        if (typeof (text) !== "undefined" && typeof (text) !== "" && typeof (text) !== null) {
            el.innerText = text;
        }
        return el;
    }
    export{$ce};