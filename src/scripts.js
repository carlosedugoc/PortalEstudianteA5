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

function setOrder() {
    var $grid = $('.grid').isotope( {
        getSortData: {
          number:'.number parseInt',// text from querySelector
          name: '.name'
        },
        sortBy: [ 'number' ]
      }); 

    //   var $grid = $('.grid').isotope( {
    //     getSortData: {
    //       number:'.number parseInt',// text from querySelector
    //       name: '.name'
    //     },
    //     sortBy: [ 'number' ]
    //   }); 
    // //   $grid.isotope( {sortBy:'number'}); 
    //  $grid.isotope('updateSortData').isotope(); 
    // var $grid = $('.grid').isotope({
    //     itemSelector: '.grid-item',
    //     getSortData: {
    //       number: '.number parseInt'
    //     },
    //     // layout mode options
    //     masonry: {
    //       columnWidth: 200
    //     }
    //   });

    // $('.grid').isotope({
    //     getSortData: {
    //       number: '.number parseInt'
    //     },
    //   });

}