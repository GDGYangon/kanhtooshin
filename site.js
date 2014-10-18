var winnerCount = 0;

function onEnd(endarray) {
    var idx = endarray[0] - 1;
    var elem = $('.slot li').eq(idx);
    var winner = attendants[idx];
    winnerCount++;

    // Remove attendants
    console.log("idx = ", idx);
    console.log(attendants);
    attendants.splice(idx, 1);


    // Add Winner
    $('.winner li').removeClass('list-group-item-active');
    var liItem = '<li class="text-center text-uppercase list-group-item list-group-item-active">' +
	    '<span class="badge badge-danger pull-left">' + winnerCount + '</span>' + winner + '</li>';
    $('.winner').append(liItem);

    //$('.applause').addClass("hidden");
    $('.applause').random().removeClass('hidden');
}

function onStart() {
        $('.applause').addClass("hidden");
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
    	loops: LOOP,
	onStart, onStart,
    	onEnd: onEnd,
	arrays: [attendants]
    });


}

$.fn.random = function()
{
    var ret = $();

    if(this.length > 0)
        ret = ret.add(this[Math.floor((Math.random() * this.length))]);

    return ret;
};

main();
