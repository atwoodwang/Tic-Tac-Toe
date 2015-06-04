/**
 * Created by Atwood Wang on 2015/6/1.
 */
var curplayer;
var humanid = 1;
var aiid = 2;
var isrunning;
var isvic;
var isdraw;
var cell = new Array(9);


init();

function init() {
    curplayer = 1;
    isrunning = false;
    isvic = false;
    isdraw = false;
    var x = cell.length;
    for (var i = 1; i <= x; i++) {
        cell[i] = 0;
    }
    cell[0] = 999;
}

var x = document.getElementsByTagName("img");
for (var i = 0; i < x.length; i++) {
    x[i].addEventListener("click", play);
}

function set() {
    if (isrunning == true) {
        var x = confirm("Game already started, reset?");
        if (x == false) {
            return;
        }
    }
    reset();
}

function checkfirst() {
    var x = document.getElementsByName("choose");
    if (x[0].checked) {
        humanid = 1;
        aiid = 2;
    }
    else {
        humanid = 2;
        aiid = 1;
    }
    if (curplayer == aiid) {
        ai();
    }
}

function checkdraw() {
    if (isvic == true) {
        return;
    }
    for (var i = 1; i <= 9; i++) {
        if (cell[i] == 0) {
            return;
        }
    }
    alert("draw!-_-");
}


function reset() {
    init();
    var x = document.getElementsByTagName("img");
    for (var i = 0; i < x.length; i++) {
        x[i].src = "blank.png";
    }
    checkfirst();
}

function play(a) {
    isrunning = true;
    var id = a.target.id;
    if (cell[id] != 0) {
        return;
    }
    click(id);
    ai();
}

function click(id) {
    if (isvic == 1||isdraw==1) {
        return;
    }

    var x = document.getElementById(id);
    cell[id] = curplayer;
    if (curplayer == 1) {
        x.src = "cross1.png";
        curplayer = 2;
    }
    else {
        x.src = "circle.png";
        curplayer = 1;
    }
    checkvic();
    checkdraw();
}

function checkvic() {
    var vicid = 0;
    //check row
    for (var i = 1; i <= 7; i = i + 3) {
        if (cell[i] > 0 && cell[i] == cell[i + 1] && cell[i + 1] == cell[i + 2]) {
            isvic = true;
            vicid = cell[i];
        }
    }
//    check column
    for (var i = 1; i <= 3; i++) {
        if (cell[i] > 0 && cell[i] == cell[i + 3] && cell[i + 3] == cell[i + 6]) {
            isvic = true;
            vicid = cell[i];
        }
    }
//    check duijiao
    if (cell[1] > 0 && cell[1] == cell[5] && cell[5] == cell[9]) {
        isvic = true;
        vicid = cell[1];
    }
    if (cell[3] > 0 && cell[3] == cell[5] && cell[5] == cell[7]) {
        isvic = true;
        vicid = cell[3];
    }

    if (isvic) {
        if (vicid == humanid) {
            alert("Congratulations!You Win!^_^");
        }
        else {
            alert("You Lose!!T_T");
        }
    }
}

function ai() {
    seqs = ['123', '456', '789', '147', '258', '369', '159', '357'];
//    check if self have 2 in row
    for (var i = 0; i < seqs.length; i++) {
        var level = 0;
        for (var j = 0; j < 3; j++) {
            var k = parseInt(seqs[i].charAt(j), 10);
            if (cell[k] == aiid) {
                level++;
            }
        }

        if (level > 1) {
            for (var m = 0; m < 3; m++) {
                var n=parseInt(seqs[i].charAt(m), 10);
                if (cell[n] == 0) {
                    click(n);
                    return;
                }
            }
        }
    }


//    check if you have 2 in row
    for (var i = 0; i < seqs.length; i++) {
        var level = 0;
        for (var j = 0; j < 3; j++) {
            var k = parseInt(seqs[i].charAt(j), 10);
            if (cell[k] == humanid) {
                level++;
            }
        }

        if (level > 1) {
            for (var m = 0; m < 3; m++) {
                var n=parseInt(seqs[i].charAt(m), 10);
                if (cell[n] == 0) {
                    click(n);
                    return;
                }
            }
        }
    }

//    if above don't apply, pick a random
    if(cell[5]==0){
        click(5);
        return;
    }
    else{
        for(var i=1;i<cell.length;i++){
            if(cell[i]==0){
                click(i);
                return;
            }
        }
    }
}