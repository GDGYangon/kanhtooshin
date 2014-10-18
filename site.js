var firstTime = true;

function onSpinEnd(endarray) {
    var idx = endarray[0] - 1;
    var elem = $('.slot li').eq(idx);
    var winner = attendants[idx];
    console.debug("onSpinEnd = ", idx, winner);

    // Remove attendants
    //attendants.splice(idx, 1);
    //console.log(attendants);

    // Add Winner
    $('.winner li').removeClass('list-group-item-active');
    var liItem = '<li class="text-center text-uppercase list-group-item list-group-item-active">' + winner + '</li>';
    $('.winner').append(liItem);

    firstTime = false;
}

function onSpinStart() {
    $('.slot').empty();
    for (var i = 0; i < attendants.length; i++) {
      	$('.slot').append('<li class="text-uppercase">' + attendants[i] + '</li>');
    }
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
    	loops: 3,
    	onEnd: onSpinEnd,
	onStart: onSpinStart
    });
}

main();
