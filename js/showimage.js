/**
 * Created by inet2005 on 4/3/17.
 */

/*** we need a div in index.html
* <div id="img_viewer_div">
* <img id="img_viewer">
* </div>
***/

/***
 * each thumb image should be connected with thumbclicked()
 * eg. <img onclick='thumbclicked(this)' src='...'>
***/

function switchImage(img) {
    $("#viewer_img").attr('src', img);
}

function thumbclicked(elm) {
    switchImage(elm.src);
}
