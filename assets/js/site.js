var winnerCount = 0;
var winnerList = [];
// for current rolling gift
var currentGift = {};
var defence = false;
var temp;

// I think Saving jQuery selected is more faster then re-selection again
var $winnerListEl = $(".winner");
var $showWinner = $("#show-winner");
var $applause = $('.applause');
var _winnericon = document.getElementById('winner-icon-atpp');
var _winnername = document.getElementById('winner-name-atpp');

function onEnd(endarray) {
  var idx = endarray[0] - 1;
  var elem = $('.slot li').eq(idx);
  var winner = attendants[idx];
  winnerList.push( { name: winner, gift: currentGift.name });
  // Adding winner list to localStorage 
  localStorage.setItem("winners", ((localStorage.winners&&localStorage.winners+"|")||"")+winner+":"+currentGift.name);
  winnerCount++;
  defence = false;

  // Remove attendants
  console.log("idx = ", idx);
  console.log(attendants);
  temp = attendants.splice(idx, 1);

  // Add Winner
  $('.winner li').removeClass('list-group-item-active');
  var liItem = '<li class="text-center clearfix text-uppercase list-group-item list-group-item-active '+currentGift.abbr+'">' +
    '<span class="badge badge-danger pull-left">' + winnerCount + '</span>' + winner +
    '<span class="'+currentGift.icon+' pull-right"></span></li>';
  $winnerListEl.append(liItem);

  // Adding winner to model Pop-up
  _winnername.innerHTML = winner;
  _winnericon.innerHTML = "<span class="+currentGift.icon+"></spans>"+ currentGift.name;
  $('.applause').random().removeClass('hidden');
  $showWinner.modal('show');
}

function onStart(){
  $applause.addClass("hidden");
}

function main(){
  /* Adding Gift to buttons */
  var giftbtnsContainer = document.getElementById('gift-buttons');
  var giftFilter = $('#gift-filter');
  for (var i = 0; i < gifts.length; i++) {
    var gift = gifts[i];
    var btngroup = document.createElement('div');
    btngroup.setAttribute('class', 'btn-group');
    btngroup.innerHTML = "<button class='btn btn-default gift-button' data-gift='"+i+"'>"+
                        "<span class='"+gift.icon+"'></span> "+
                        gift.name.toUpperCase()+"</button>";
    if(GIFT_FILTER)
        giftFilter.append(btngroup.cloneNode(true));
    giftbtnsContainer.appendChild(btngroup);
  }

  $('#gift-buttons .gift-button').click(function(){
    if(!defence){
        // Protect Error on save current rolling gift until end of loop
        defence = true;
        currentGift = gifts[parseInt(this.getAttribute('data-gift'))];
    }
  });

  if(GIFT_FILTER){
    $('#gift-filter .gift-button').click(function(){
        var gift = gifts[parseInt(this.getAttribute('data-gift'))];
        if(gift)
            $winnerListEl.find("li").show(300).not('.'+gift.abbr).hide(300);
        else
            $winnerListEl.find("li").show(300);
    });    
  }

  if (typeof attendants == 'undefined') {
    alert("Error: attendants variable is not set yet.");
    return;
  }

  $('.slot').empty();
  for (var j = 0; j < attendants.length; j++) {
    $('.slot').append('<li class="text-uppercase">' + attendants[j] + '</li>');
  }

  $('.slot').jSlots({
    number: 1,
    spinner : '#gift-buttons .gift-button',
    time: PLAY_TIME,
    loops: LOOP,
    onStart, onStart,
    onEnd: onEnd,
    arrays: [attendants]
  });
}

$.fn.random = function() {
  var ret = $();

  if(this.length > 0)
    ret = ret.add(this[Math.floor((Math.random() * this.length))]);

  return ret;
};

$("#clear-storage").click(function(event){
    event.preventDefault();
    if(confirm("Are you sure to delete localStorage data of winners list?"))
        localStorage.setItem('winners', '');
    return false;
});

// Logout the full list of winner
function getFullList(){
    if(winnerList){
        for (var i = 0; i < winnerList.length; i++) {
            console.log(winnerList[i].name+": "+winnerList[i].gift);
        }
    }else {
        // re-querying from localStorage
        winnerList = localStorage.winners.split("|");
        for (var i = 0; i < winnerList.length; i++) {
            console.log(winnerList[i][0]+": "+winnerList[i][1]);
        }
    }
}

main();