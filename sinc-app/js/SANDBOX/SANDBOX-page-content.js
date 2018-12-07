//#region PAGE CONTENT
let $grid = $('.grid').packery({
    columnWidth: '.grid-sizer',
    itemSelector: '.grid-item',
    gutter: 0
});

if(draggable)
    $grid.find(".grid-item").each((i, gridItem) => {
        $grid.packery("bindDraggabillyEvents", new Draggabilly(gridItem));
    });

if(demoContent) {
    document.getElementById("textboxtitle").textContent = "San";
    document.getElementById("textboxcontent").textContent =
        "Headquarters of SIRIUS INC, a mercurial organization on the rim of human-occupied space. This fledgling\
        democracy has recently gained independence after years of benign neglect by their parent corporation. The\
        people of San feel a strong affinity with their \"corporate founders\", and preserve the trappings of\
        corporate governance (including corporate name, titles, and other IP). The parent corporation has yet to\
        comment on this rather egregious trademark infringement."
    ;
}
//#endregion