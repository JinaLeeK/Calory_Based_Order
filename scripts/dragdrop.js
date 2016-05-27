var theFaves = document.getElementById('faves');

$("article").on("dragstart", "#currentPanel img", function(evt) {
	evt.dataTransfer.setData("text", $(this).parents('.menu').attr("id"))
})


$('#section-below')
	.bind('dragover', function (evt) {
		$('#section-below p').css('background-color','#A59292');
		evt.preventDefault();
	})
	.bind('dragleave', function (evt) {
		$('#favorites p').css('background-color','beige');
		evt.preventDefault();
	})
	.bind('dragenter', function (evt) {
		evt.preventDefault();
	}).bind('drop', function(evt) {
		var id 					= evt.dataTransfer.getData('text'),
		    item  		  = $("#"+id),
				html = null;
		html = '<tr><td class="bucket">' + item.data().name +
							'</td><td class="calory">' + item.data().calory +
							'</td><td><button class="destroy glyphicon glyphicon-remove"></button></td></tr>';
		$(html).appendTo($("#favList"));
		$('#section-below p').css('background-color', 'beige');
		evt.stopPropagation();
		return false;

	});

	function saveFaves() {
		localStorage.setItem('favorites', theFaves.innerHTML);
	};

	// loadFaves();

	function loadFaves() {
		if (localStorage.getItem('favorites')) {
			theFaves.innerHTML = localStorage.getItem('favorites');
		}
	}
