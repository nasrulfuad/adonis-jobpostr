$('a[href="#edit"]').on("click", function(e) {
	e.preventDefault();
	const id = $(this).attr("data-id");
	$("#main-form").attr("action", `/my-jobs/${id}/edit`);
	$.ajax({
		url: `/my-jobs/${id}/edit`,
		success: function({ title, link, description }) {
			$("#btn-submit").addClass("d-none");
			$(".btn-edit").removeClass("d-none");
			clearForm(title, link, description);
		},
		error: function(err) {
			console.log(err);
		}
	});
});
$("#btn-cancel").on("click", function(e) {
	e.preventDefault();
	$("#main-form").attr("action", "/my-jobs/");
	$("#btn-submit").removeClass("d-none");
	$(".btn-edit").addClass("d-none");
	clearForm();
});

function clearForm(title = null, link = null, description = null) {
	$('input[name="title"]').val(title);
	$('input[name="link"]').val(link);
	$('textarea[name="description"]').val(description);
}
