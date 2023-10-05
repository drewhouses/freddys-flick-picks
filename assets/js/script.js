var enterButtonEl = $(".cover-btn");

//audio section
var freddyCoverAudio = new Audio("thriller-ambient-14563.mp3");
var freddyMainAudio = new Audio(
  "I SHOULD WARN YOU PT2 - AUDIO FROM JAYUZUMI.COM.mp3"
);
// freddyCoverAudio.autoplay = true;
// freddyCoverAudio.play();
// CURRENTLY USING THRILLER-AMBIENT & I SHOULD WARN YOU PT2 MP3

// Ask Drew and Art about this error msg: DOMexception user didn't interact with document

// cover page button
enterButtonEl.on("click", function () {
  freddyCoverAudio.pause();
  freddyMainAudio.play();
  $(".main").removeClass("hide"); // try to get title to render asap
  $(".image-container").fadeOut(1200);
});
