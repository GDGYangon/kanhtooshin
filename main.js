function onSpinEnd(winners) {
    idx = winners[0];
    elem = $('.slot li').eq(idx);
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
    	time: 3000,
    	loops: 10,
    	onEnd: onSpinEnd
    });
}

main();
