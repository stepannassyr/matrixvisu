function highlight_related(event){

    row_cl = ""
    col_cl = ""
    for(let i = 0; i < this.classList.length; i++)
    {
        cl = this.classList.item(i);
        if(cl.startsWith("row"))
        {
            row_cl = cl;
        }
        else if (cl.startsWith("col"))
        {
            col_cl = cl;
        }
    }

    collections = []
    if(this.classList.contains("ael"))
    {
        collections = [document.getElementsByClassName("cel " + row_cl),
                       document.getElementsByClassName("ael " + row_cl),
                       document.getElementsByClassName("bel")];
    }
    else if(this.classList.contains("bel"))
    {
        collections = [document.getElementsByClassName("cel " + col_cl),
                       document.getElementsByClassName("bel " + col_cl),
                       document.getElementsByClassName("ael")];
    }
    else if(this.classList.contains("cel"))
    {
        collections = [document.getElementsByClassName("ael " + row_cl),
                       document.getElementsByClassName("bel " + col_cl)];

        this.classList.add("highlight");
    }

    collections.forEach(elements => {
        for (let i = 0; i < elements.length; i++)
        {
            elements[i].classList.add("highlight");
        }});
}

function unhighlight_all(event){
//    console.log("Unhighlighting all");
//    els = document.getElementsByClassName("highlight");
//    for (let i = 0; i < els.length; i++)
//    {
//        els[i].classList.remove("highlight");
//    }
    row_cl = ""
    col_cl = ""
    for(let i = 0; i < this.classList.length; i++)
    {
        cl = this.classList.item(i);
        if(cl.startsWith("row"))
        {
            row_cl = cl;
        }
        else if (cl.startsWith("col"))
        {
            col_cl = cl;
        }
    }

    collections = []
    if(this.classList.contains("ael"))
    {
        collections = [document.getElementsByClassName("cel " + row_cl),
                       document.getElementsByClassName("ael " + row_cl),
                       document.getElementsByClassName("bel")];
    }
    else if(this.classList.contains("bel"))
    {
        collections = [document.getElementsByClassName("cel " + col_cl),
                       document.getElementsByClassName("bel " + col_cl),
                       document.getElementsByClassName("ael")];
    }
    else if(this.classList.contains("cel"))
    {
        collections = [document.getElementsByClassName("ael " + row_cl),
                       document.getElementsByClassName("bel " + col_cl)];

        this.classList.remove("highlight");
    }

    collections.forEach(elements => {
        for (let i = 0; i < elements.length; i++)
        {
            elements[i].classList.remove("highlight");
        }});
    this.classList.remove("highlight");
}

function create_matrix(container, m, n, size, margin, el_class) {
    for (let i = 0; i < m; i++)
    {
        var row_container = document.createElement("div")
        row_container.style.marginTop = margin.toString()+"px"
        row_container.style.height = size.toString()+"px"

        for (let j = 0; j < n; j++)
        {
            var elbox = document.createElement("div")

            elbox.className = "elbox";
            elbox.classList.add(el_class);
            elbox.classList.add("row"+i);
            elbox.classList.add("col"+j);
            elbox.addEventListener('mouseover', highlight_related)
            elbox.addEventListener('mouseout', unhighlight_all)

            row_container.appendChild(elbox);
        }
        container.appendChild(row_container)
    }
}

function create_matmul(abox, bbox, cbox, crossbox, m, n, k, size, margin, border_width)
{
    var elbox_style = document.createElement("style");
    elbox_style.innerHTML = `
    .elbox {
        border : ` + border_width.toString() + `px solid black;
        border-radius: ` + (2*border_width).toString() + `px;
        width: ` + size.toString() + `px;
        height: ` + size.toString() + `px;
        margin-left: ` + margin.toString() + `px;
        box-sizing: border-box;
        float: left;
    }
    .abox .elbox {
        background-color: #b9d25f;
    }
    .bbox .elbox {
        background-color: #eb5f73;
    }
    .cbox .elbox {
        background-color: #ebebeb;
    }
    .highlight {
        border: ` + (2*border_width).toString() + `px solid #fece00;
    }
    `;
    document.head.appendChild(elbox_style);

    create_matrix(abox, m, k, size, margin, "ael");
    abox.style.backgroundColor = "";

    create_matrix(bbox, k, n, size, margin, "bel");
    bbox.style.backgroundColor = "";

    create_matrix(cbox, m, n, size, margin, "cel");
    cbox.style.backgroundColor = "";

    crossbox.style.width = (k*(size+margin)).toString()+"px";
    crossbox.style.height = (k*(size+margin)).toString()+"px";
}
