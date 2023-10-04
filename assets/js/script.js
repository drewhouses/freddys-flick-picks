var enterButtonEl = $(".cover-btn");

enterButtonEl.on("click", function () {
  console.log("You clicked the button");
  $(".image-container").remove();
  $("h1").removeClass("hide");
});
