//// Método que llama todos los eventos del MainJS
function llamarEventosMainJS() {
    mainNavToogle(); 
    checkItems(); 
    gridMasonryDashboard(); 
    rotate180(); 
    activeForParentAcordion(); 
    inputFileClear(); 
    appearWhenChange(); 
    newInputs(); 
    valideLogin(); 
    showAndHidePassword(); 
    changeIconsOnHeaderAndTooltips(); 
    closeMessageInfo(); 
    getElementsHeight(); 
    viewOptionsUser(); 
    $('.selectpicker').selectpicker(); 
    setOrder(); 
}

//// Método para ocultar los botones de guardado y cancelar.
function hideWhenCancel() {
    $(".boxButtonsCenter").fadeOut(); 
}
/**
 * Esta función es fundamental para que los estilos de masonry y boostrap select no dañen los controles.
 * 
 */
function cambiarPosicionHojaEstilos() {
    var cssGeneral = $("#estilos")
    if (cssGeneral != undefined && cssGeneral[0] != undefined) {
        $('#estilos').remove()
        $('head').append(cssGeneral[0])
    }
}