$(document).ready(function() {
	performAjaxAll();

	$("#addNew").click(function() {
		$("#info").html("Add New Image"+
			"<form action='' method='post'>"+
			"<label>Title:</label>"+
			"<input id='noteTitleInput' name='title' type='text' placeholder='Image Title'><br/>"+
			"<label>URL:</label>"+
			"<input id='noteUrlInput' name='url' type='text' placeholder='Image Url'><br/>"+
			"<label>Description:</label>"+
			"<input id='noteDescriptionInput' name='description' type='text' placeholder='Image Description'>"+
			"</form>");
		$("#info").dialog({
			resizable: false,
			height: "auto",
			width: 400,
			modal: true,
			buttons: {
				"Submit": function() {
					var newTitle = " "+$("#noteTitleInput").val();
					var newUrl = " "+$("#noteUrlInput").val();
					var newDescription = " "+$("#noteDescriptionInput").val();
					if (newTitle  === '') {
						alert('Title is empty.');
						return false;
					}
					if (newUrl  === '') {
						alert('URL is empty.');
						return false;
					}
					if (newDescription  === '') {
						alert('Description is empty.');
						return false;
					}

					var saveData = '{'
						+'"title":"'+newTitle+'",'
						+'"url":"'+newUrl+'",'
						+'"description":"'+newDescription+'"}';
					performAjaxSaveNew(saveData);
					$( this ).dialog( "close" );
				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			}
		});
	});
});

function performAjaxAll(){
	var getUrl = "https://imagegallery-3fb62.firebaseio.com/images.json";

	$.ajax({
		url: getUrl,
		type: "GET",
		dataType:"json",
		headers: {"Access-Control-Allow-Headers": "x-requested-with"},
		success: function(result){
			displayAll(result);
		},
		error: function(err){
			$("#info").html("Error calling API");
			$( "#info" ).dialog();
		}
	});
}

function performAjaxSaveNew(saveData){
	$.ajax({
		url: "https://imagegallery-3fb62.firebaseio.com/images.json",
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		data: saveData,
		success: function(result){
			performAjaxAll();
		},
		error: function(err){
			$("#info").html("Error saving post to API");
			$( "#info" ).dialog();
		}
	});
}

function performAjaxShowEdit(id){
	$.ajax({
		url: "https://imagegallery-3fb62.firebaseio.com/images/"+id+".json",
		type: "GET",
		success: function(result){
			displayEdits(result, id);
		},
		error: function(err){
			$("#info").html("Error calling Edit Information");
			$( "#info" ).dialog();
		}
	});
}

function performAjaxSaveEdit(saveData, id){
	$.ajax({
		url: "https://imagegallery-3fb62.firebaseio.com/images/"+id+".json",
		type: "PUT",
		data: saveData,
		success: function(result){
			performAjaxAll();
		},
		error: function(err){
			$("#info").html("Error saving post to API");
			$( "#info" ).dialog();
		}
	});
}

function performAjaxDelete(id){
	$.ajax({
		url: "https://imagegallery-3fb62.firebaseio.com/images/"+id+".json",
		method: "DELETE",
		success: function(result){
			performAjaxAll();
		},
		error: function(err){
			$("#info").html("Error deleting post");
			$( "#info" ).dialog();
		}
	});
}

function displayAll(data){
	var list = $("#list");

	list.empty();
	if (data != null){
		for (var i=0; i<Object.keys(data).length; i++){
			var obj = Object.keys(data)[i];
			list.append(
				'<div class="col-xs-12 col-md-3" id="'+obj+'"><h3>'+data[obj].title+'</h3>'
				+'<img class="thumbnail showBig" src="'+data[obj].url+'" alt="'+data[obj].title+'" height="200"/>'
				+'<div class="buttonContainer"><button type="button" class="btn btn-warning edit" ><span class="glyphicon glyphicon-pencil"></span> Edit</button>'
				+'<button type="button" class="btn btn-danger pull-right delete" ><span class="glyphicon glyphicon-trash"></span> Delete</button></div>'
				+'<div class="image_description"><p>'+data[obj].description+'</p></div>'
				+'</div>'
			);
		}
	}

	$(".delete").click(function(){
		var id = this.parentNode.parentNode.id;
		$("#info").html("Are you sure you would like to delete this image?");
		$("#info").dialog({
			resizable: false,
			height: "auto",
			width: 400,
			modal: true,
			buttons: {
				"Delete Image": function() {
					performAjaxDelete(id);
					$( this ).dialog( "close" );
				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			}
		});
	});

	$(".edit").click(function(){
		var id = this.parentNode.parentNode.id;
		performAjaxShowEdit(id);
	});

	$(".showBig").click(function () {
		thumbClicked(this);
	});
}

function displayEdits(data, id){
	var tite = data.title;
	var url = data.url;
	var description = data.description;

	$("#info").html("Update Image"+
		"<form action='' method='post'>"+
		"<label>Title:</label>"+
		"<input id='noteTitleInput' name='title' type='text' value='"+tite+"'><br/>"+
		"<label>URL:</label>"+
		"<input id='noteUrlInput' name='url' type='text' value='"+url+"'><br/>"+
		"<label>Description:</label>"+
		"<input id='noteDescriptionInput' name='description' type='text' value='"+description+"'>"+
		"</form>");
	$("#info").dialog({
		resizable: false,
		height: "auto",
		width: 400,
		modal: true,
		buttons: {
			"Submit": function() {
				var newTitle = $("#noteTitleInput").val();
				var newUrl = $("#noteUrlInput").val();
				var newDescription = $("#noteDescriptionInput").val();
				if (newTitle  === '') {
					alert('Title is empty.');
					return false;
				}
				if (newUrl  === '') {
					alert('URL is empty.');
					return false;
				}
				if (newDescription  === '') {
					alert('Description is empty.');
					return false;
				}

				var saveData = '{'
					+'"title": "'+newTitle+'",'
					+'"url": "'+newUrl+'",'
					+'"description": "'+newDescription+'"}';
				performAjaxSaveEdit(saveData, id);
				$( this ).dialog( "close" );
			},
			Cancel: function() {
				$( this ).dialog( "close" );
			}
		}
	});
}

$(document).ajaxStart(function(){
	$("#loader").show();
});

$(document).ajaxStop(function(){
	$("#loader").hide();
	$("#list").slideDown();
});
