
//handle deletion of users
$(document).ready(function() {
	$('.delete-user').on('click',deleteUser)
});

function deleteUser()
{
	var confirmation=corfirm('Are you sure?');

	if(confirmation)
	{
		//make an ajax call
		$.ajax({
			type:'DELETE',
			url:'/users/delete/'+$(this).data('id')
		}).done((response)=>{
			window.location.replace('/');
		})
	}
	else{
		return false;
	}
}

function confirm(msg){
	if(msg)
		return true;
	return false;
}