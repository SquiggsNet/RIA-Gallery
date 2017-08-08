/**
 * Created by inet2005 on 4/3/17.
 */

/*** we need a div in index.html
 <div id="big_pic" onclick="hiddenBigPic()" style="display:none;">
     <div id="big_pic_center">
         <button id='leftArrow' type='button' class='btn btn-default btn-lg big_pic' onclick="leftArrow()">
             <span class='glyphicon glyphicon-chevron-left' aria-hidden='true'></span>
         </button>

         <img id="viewer_img" class="big_pic" >

         <button id='rightArrow' type='button' class='btn btn-default btn-lg big_pic' onclick="rightArrow()">
             <span class='glyphicon glyphicon-chevron-right' aria-hidden='true'></span>
         </button>
     </div>
 </div>
***/

/***
 * each thumb image should be connected with thumbclicked()
 * eg. <img onclick='thumbclicked(this)' src='...'>
***/

/*** css suggestion for big picture viewer
div#big_pic {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 100%;
    margin: auto;
    background: rgba(0,0,0,0.6);
    z-index: 10;
    min-width: 650px;
}
div#big_pic_center {
    width: 60%;
    margin: auto;
}
.big_pic {
    display: inline-block;
}
img.big_pic {
    width: 70%;
    margin: auto;
}
***/

function switchImage(img) {
    $("#viewer_img").attr('src', img);
}

function getNextImage(dir) {
    var lst = $("#list").find('img');
    var img = $("#viewer_img").attr('src');

    for (var i=0; i<lst.length; i++) {
        var src = $(lst[i]).attr('src');
        if ($(lst[i]).attr('src') == img) return lst[i+dir];
    }
    return null;
}

function thumbClicked(elm) {
    switchImage(elm.src);
    $("#big_pic").show();
}

function leftArrow() {
    var left = getNextImage(-1);
    if (left!==null) switchImage($(left).attr('src'));
    $("#leftArrow").data('clicked', true);
}

function rightArrow() {
    var right = getNextImage(1);
    if (right!==null) switchImage($(right).attr('src'));
    $("#rightArrow").data('clicked', true);
}

function isArrowClicked() {
    var left = $('#leftArrow').data('clicked');
    var right = $('#rightArrow').data('clicked');
    if ($('#leftArrow').data('clicked')) {
        $('#leftArrow').data('clicked', false);
        return true;
    }
    if ($('#rightArrow').data('clicked')) {
        $('#rightArrow').data('clicked', false);
        return true;
    }
    return false;
}

function hiddenBigPic() {
    if (!isArrowClicked()) $("#big_pic").hide();
}
