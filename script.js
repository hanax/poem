$(function() {
    var TOTAL = 10;
    var PATH = "assets/";
    var HOVER_SOUND = "hover-sound";
    var AFTER_SOUND = "after-sound";
    var SUFFIX = ".mp3";

    var TEXT_MAP = [
        'was', 'your', 'how', 'find', 'see', 
        'number', 'water', 'means', 'home', 'ask', 
        'animal', 'picture', 'world', 'letter', 'country', 
        'thought', 'together', 'walk', 'student', 'list', 
        'family', 'body', 'however', 'become', 'hold', 
        'war', 'king', 'I', 'quickly', 'decided', 
        'understand', 'thousand', 'dark', 'less', 'surface', 
        'anything', 'heart', 'summer', 'interest', 'brother', 
        'sign', 'remember', 'baby', 'section', 'iron', 
        'consonant', 'speak', 'kill', 'die', 'ear', 
        'us', 'information', 'control', 'trouble', 'history', 
        'human', 'not', 'indicate', 'electric', 'blood', 
        'rich', 'sadness', 'wife', 'does', 'will', 
        'substance', 'deal', 'experience', 'oxygen', 'forward',
    ];

    $(".button").mouseenter(function(e) {
        var idx = e.target.dataset.idx;
        var audio = new Audio(PATH + HOVER_SOUND + idx + SUFFIX);
        audio.play();
    });
    
    var clicked = [];
    var clickedCnt = 0;

    $(".indicator").text(clickedCnt + "/" + TOTAL);

    $(".button").click(function(e) {
        var idx = e.target.dataset.idx;

        $(e.target).css({background: "black"});
        
        clicked.push(idx);
        clickedCnt += 1;
        $(".indicator").text(clickedCnt + "/" + TOTAL);

        if (clickedCnt === TOTAL) {
            // Switch view
            $("#view-1").fadeOut("slow");
            $("#view-2").fadeIn("slow");

            var recurse = function(i) {
                if (i === TOTAL) { return; }

                var audio = new Audio(PATH + AFTER_SOUND + clicked[i] + SUFFIX);
                audio.addEventListener('ended', function() {
                    recurse(i + 1);
                });
                audio.play();
            };
            recurse(0);

            var displayText = clicked.map(function(i) { return TEXT_MAP[i]; }).join(' ');
            $(".text-box").text(displayText);
        }
    })

    function makeCircles() {
      $(".button").each(function() {
        $(this).show();

        var wHeight = $(window).height() - 120;
        var wWidth = $(window).width() - 120;
        var topPosition = Math.random() * wHeight - wHeight/2 + "px";
        var leftPosition = Math.random() * wWidth - wWidth/2 + "px";

        $(this).css("transform", "translate(" + leftPosition + "," + topPosition + ")");

        var newSize = Math.floor(Math.random() * 100) + "px";
        $(this).css("width", newSize).css("height", newSize);
      });
    }

    $(".change-button").mouseenter(function() {
        var newColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        $(".change-button").css("background-color", newColor);
        makeCircles();
    });

    $(".change-button").mouseleave(function() {
       $(".change-button").css("background-color","#f00");
    });

});






