
function onSpinEnd(endarray) {
    var idx = endarray[0] - 1;
    var elem = $('.slot li').eq(idx);
    var winner = attendants[idx];

    // Remove attendants
    console.log("idx = ", idx);
    console.log(attendants);
    attendants.splice(idx, 1);


    // Add Winner
    $('.winner li').removeClass('list-group-item-active');
    var liItem = '<li class="text-center text-uppercase list-group-item list-group-item-active">' + winner + '</li>';
    $('.winner').append(liItem);

}

function main () {
    if (typeof attendants == 'undefined') {
	alert("Error: attendants variable is not set yet.");
	return;
    }

    $('.slot').empty();
    for (var i = 0; i < attendants.length; i++) {
      	$('.slot').append('<li class="text-uppercase">' + attendants[i] + '</li>');
    }

    $('.slot').jSlots({
    	number: 1,
    	spinner : '#playBtn',
    	time: PLAY_TIME,
    	loops: 3,
    	onEnd: onSpinEnd,
	arrays: [attendants]
    });
}

main();
