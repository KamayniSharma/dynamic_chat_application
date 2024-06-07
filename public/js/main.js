(function ($) {

	"use strict";

	var fullHeight = function () {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function () {
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	$('#sidebarCollapse').on('click', function () {
		$('#sidebar').toggleClass('active');
	});

})(jQuery);

//____________start dynamic chat app script________
function getCookie(name) {
	let matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

var userData = JSON.parse(getCookie('user'));

const sender_id = userData._id
let receiver_id;
const socket = io('/user-namespace', {
	auth: {
		token: userData._id
	}
});

$j(document).ready(function () {
	$j('.user-list').on('click', function () {
		const userId = $j(this).attr('data-id');
		receiver_id = userId;
		$j('.start-head').hide();
		$j('.chat-section').show();

		socket.emit('existingChat', { sender_id: sender_id, receiver_id: receiver_id });
	});

})

//update user online status
socket.on('getOnlineUser', (data) => {
	$j('#' + data.user_id + '-status').text('Online');
	$j('#' + data.user_id + '-status').removeClass('offline-status');
	$j('#' + data.user_id + '-status').addClass('online-status');
});

//update user offline status
socket.on('getOfflineUser', (data) => {
	$j('#' + data.user_id + '-status').text('Offline');
	$j('#' + data.user_id + '-status').removeClass('online-status');
	$j('#' + data.user_id + '-status').addClass('offline-status');
});

//save user chat
$j('#chat-form').submit((event) => {
	event.preventDefault();

	var message = $('#message').val();
	$j.ajax({
		url: '/save-chat',
		type: 'POST',
		data: { sender_id: sender_id, receiver_id: receiver_id, message: message },
		success: (response) => {
			if (response.success) {
				$j('#message').val('');
				const chat = response.data.message;
				const html = `<div class="current-user-chat id='${response.data._id}'"><h5><span>${chat}</span>
					<i class="fa fa-trash" aria-hidden="true" data-id='${response.data._id}' data-toggle="modal" data-target="#deleteChatModal"></i>
					<i class="fa fa-edit" aria-hidden="true" data-id='${response.data._id}' data-msg =${chat}data-toggle="modal" data-target="#editChatModal"></i>
					</h5></div>`;
				$j('#chat-container').append(html);
				socket.emit('newChat', response.data);
				scrollChat();
			} else {
				alert(response.data.msg)
			}
		}
	});
});

socket.on('loadNewChat', (data) => {
	if (sender_id == data.receiver_id && receiver_id == data.sender_id) {
		const html = `<div class="distance-user-chat id='${data._id}'"><h5><span>${data.message}</span>
			</h5></div>`;
		$j('#chat-container').append(html);
	}
	scrollChat();
});

//load old chats
socket.on('loadChats', (data) => {
	$j('#chat-container').html('');

	var chats = data.chats;
	let html = '';
	for (let x = 0; x < chats.length; x++) {
		let addClass = '';

		if (chats[x]['sender_id'] == sender_id) {
			addClass = 'current-user-chat'
		} else {
			addClass = 'distance-user-chat'
		}
		html += `
		<div class=${addClass} id='${chats[x]['_id']}'><h5><span>${chats[x]['message']}</span>`

		if (chats[x]['sender_id'] == sender_id) {
			html += ` <i class="fa fa-trash" aria-hidden="true" data-id='${chats[x]['_id']}' data-toggle="modal" data-target="#deleteChatModal"></i>
			<i class="fa fa-edit" aria-hidden="true" data-id='${chats[x]['_id']}' data-msg ='${chats[x]['message']}' data-toggle="modal" data-target="#editChatModal"></i>
			`
		}

		html += `
			</h5 ></div>
		`
	}
	$j('#chat-container').append(html);
	scrollChat();
});

function scrollChat() {
	$j('#chat-container').animate({
		scrollTop: $j('#chat-container').offset().top + $j('#chat-container')[0].scrollHeight
	}, 0);
}

//delete chat
$j(document).on('click', '.fa-trash', function () {
	let msg = $j(this).parent().text();
	$j('#delete-message').text(msg);
	$j('#delete-message-id').val($j(this).attr('data-id'));
});

$j('#delete-chat-form').submit(function (event) {
	event.preventDefault();

	var id = $j('#delete-message-id').val();
	$j.ajax({
		url: '/delete-chat',
		type: 'POST',
		data: { id: id },
		success: (res) => {
			if (res.success == true) {
				$j('#' + id).remove();
				$j('#deleteChatModal').modal('hide');
				socket.emit('chatDeleted', id);
			} else {
				alert(res.msg);
			}
		}
	})
});

socket.on('chatMessageDeleted', (id) => {
	$j('#' + id).remove();
});


//update chat
$j(document).on('click', '.fa-edit', function () {
	$j('#edit-message-id').val($j(this).attr('data-id'));
	$j('#update-message').val($j(this).attr('data-msg'));
});


$j('#update-chat-form').submit(function (event) {
	event.preventDefault();

	var id = $j('#edit-message-id').val();
	var msg = $j('#update-message').val();
	$j.ajax({
		url: '/update-chat',
		type: 'POST',
		data: { id: id, message: msg },
		success: (res) => {
			if (res.success == true) {
				$j('#editChatModal').modal('hide');
				$j('#' + id).find('span').text(msg);
				$j('#' + id).find('.fa-edit').attr('data-msg', msg);
				socket.emit('chatUpdated', { id: id, message: msg });
			} else {
				alert(res.msg);
			}
		}
	})
});

socket.on('chatMessageUpdated', (data) => {
	$j('#' + data.id).find('span').text(data.message);

});

//get member
$j('.addMember').click(function () {
	var id = $j(this).attr('data-id');
	var limit = $j(this).attr('data-limit');

	$j('#group_id').val(id);
	$j('#limit').val(limit);

	$j.ajax({
		url: '/get-members',
		type: 'POST',
		data: { group_id: id },
		success: function (res) {
			if (res.success == true) {
				let users = res.data;
				let html = '';

				for (let i = 0; i < users.length; i++) {
					html += `
					<tr>
                        <td>
                            <input type="checkbox" name="members[]" value="${users[i]['_id']}">
                            <input type="hidden" name="member_names[]" value="${users[i]['name']}">
                        </td>
                        <td>${users[i]['name']}</td>
                    </tr>
					`
				}
				$j('.addMembersInTable').html(html);
			} else {
				alert(res.msg);
			}
		}
	});
});

//add-member-form

$j('#add-member-form').submit(function(event){
	event.preventDefault();

	var formData = $j(this).serialize();
	console.log("formdata", formData);

	$j.ajax({
		url: "/add-members",
		type: "POST",
		data: formData,
		success: function (res) {
			if (res.success) {
				// $j('#memberModal').modal('hide');
				// $j('#add-member-form')[0].reset();
				alert(res.msg);
			} else {
				$j('#add-member-error').text(res.msg);
				setTimeout(() => {
					$j('#add-member-error').text('');
				}, 3000)
			}
		}
	})
})
