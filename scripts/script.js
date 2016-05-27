var valueCriteria;
var valueSum = 0;

$(document).ready(function() {
  valueCriteria = $("#section-above input").val();

  setMenu();     // set number for each category

  // panel initialize
  setPanel($("#banner li a")[0], $("#currentPanel")[0]);
  $("#currentPanel").css("display","block");

  // panel change
  $("#category a").click(function() {

    var category = $(this).attr("id").toLowerCase();

    if ($("#currentPanel .panel").attr("id") === category) {

    } else {
      $("#category a").removeClass("selected");
      $(this).addClass("selected");
      $("#prePanel").remove();
      $("#currentPanel").attr("id","prePanel");

      var elem = document.createElement('div');
      $(elem).attr("id", "currentPanel");

      setPanel(this, elem);
      filterItems(valueCriteria - valueSum);

      $("#prePanel").fadeOut("slow", function() {
        $("#currentPanel").fadeIn("slow");
      })
    }
  });


  // modal content
  $("article").on("mouseenter", ".inline-popups",function() {
    var foodId = $(this).data().id;
    $("#popup-template .modal-title").html($(this).find(".name").html());
    setPopup(foodId);
  }).on("mouseleave", ".inline-popups", function() {
    closePopup();
  })

  // select from modal
  $("body").on("click", "#popup-template #select-btn", function(evt) {
    var _this = $(this).parents(".modal-content")
    var html = '<tr><td class="bucket">' + _this.find(".modal-title").html() +
              '</td><td class="calory">' + parseInt(_this.find(".fatsecret_calories_value").html()) +
              '</td><td><button class="destroy glyphicon glyphicon-remove"></button></td></tr>';
    $(html).appendTo($("#favList"));

  })

  // reset btn
  $("#reset-btn").click(function(e) {
    $("#favList tr").remove();
  })

  $("#slider").slider({
    tooltip: 'always'
  });

  $("#section-above input").change(function() {
    valueCriteria = $(this).val();
    filterItems(valueCriteria);
  })

  // consequeses for list changed
  $("#favList").bind('DOMSubtreeModified',function(e) {
      startDestroyFunc();
    valueSum = 0;
    $.each($("#favList .calory"), function(i, item) {
      valueSum += parseInt($(item).html())
    });
    $("#total").html("<tr><td></td><td>" + valueSum + "</td><td></td></tr>")


    filterItems(valueCriteria - valueSum);
//     var reValue = valueCriteria - valueSum;
// /    // filterItems(valueCriteria - valueSum);
  });
})

function setPanel(category, elem) {
  var num = $(category).data().num;
  var thisId = $(category).attr("id").toLowerCase();
  $(elem).html($("#menu-template").html());
  $(elem).children("div").attr("id", thisId);
  $(elem).find("h1").html($(category).html());
  $(elem).css("display","none");

  $(elem).appendTo("article");

  $.each($("#currentPanel .menu"), function(i,item) {
    $(item).attr("id", thisId + (i+1).toString());
    // $(item).css("display","block")
    if ((i+1) === num) {
      setData(thisId);
      setValue(num);
      return false
    }
  })
}


function startDestroyFunc() {
  $(".destroy").click(function() {
    $(this).parents("tr").remove();
  });
}

function filterItems(theValue) {
  $.each($(".menu"), function(i, item) {
    $item = $(item);
    itemData = parseInt($item.data().calory);
    if (itemData <= theValue) {
      $item.animate({opacity: 1});
      itemData.matching = true;
    } else {
      $item.animate({opacity: 0.5});
      itemData.matching = false;
    }
  });
}

function closePopup() {
  $("#template #fatsecret_output_0").html('');
  $("#template #fatsecret_output_1").html('');
  $("#template #container").html('');

}

function setPopup(foodId) {
  var s = document.createElement('script');
  var scriptContent = "fatsecret.setContainer('container');";
  scriptContent += 'fatsecret.setCanvas("food.get", {food_id:"' + foodId + '"});';
  s.innerHTML = scriptContent;

  $("#template").append(s);

  var timeOut = setInterval(function() {
    if( $("#template").find(".fatsecret_nutritionpanel").length > 0 ) {
        clearInterval(timeOut);
        $("#popup-template .modal-body").html($("#template .fatsecret_nutritionpanel").html());
        // setContent();
      }
    }, 100)
}

function setMenu() {
  $("#Classic").data({num: 10});
  $("#Side").data({num: 3});
  $("#Desserts").data({num:3});
}
function setData(category) {
  if (category === "classic") {
      $('#classic1').data({ id: "25927", name: "Chicken Sandwich", photoUrl: './_images/ChickfilA-Chicken-Sandwich.png', calory: '400'});
      $('#classic2').data({ id: "1387599", name: "Chicken Deluxe Sandwich", photoUrl: './_images/Chicken-Deluxe-Sandwich.png', calory: '490'});
      $('#classic3').data({ id: "779759", name: "Spicy Chicken Sandwich", photoUrl: './_images/Spicy-Chicken-Sandwich.png', calory: '490'});
      $('#classic4').data({ id: "874825", name: "Spicy Chicken Deluxe Sandwich", photoUrl: './_images/Spicy-Chicken-Deluxe-Sandwich.png', calory: '570'});
      $('#classic5').data({ id: "27279", name: "Nuggets", photoUrl: './_images/Nuggets.png', calory: '270'});
      $('#classic6').data({ id: "60107", name: "Chick-n-Strips", photoUrl: './_images/ChicknStrips.png', calory: '360'});
      $('#classic7').data({ id: "8267448", name: "Grilled Chicken Club Sandwich", photoUrl: './_images/Grilled-Chicken-Club-Sandwich.png', calory: '440'});
      $('#classic8').data({ id: "3373280", name: "Grilled Chicken Sandwich", photoUrl: './_images/Grilled-Chicken-Sandwich.png', calory: '320'});
      $('#classic9').data({ id: "60108", name: "Chicken Salad Sandwich", photoUrl: './_images/Chicken-Salad-Sandwich.png', calory: '500'});
      $('#classic10').data({ id: "7194136", name:"Grilled Nuggets", photoUrl: './_images/Grilled-Nuggets-6.png', calory: '140'});
  } else if (category === "side") {
      $('#side1').data({ id: "25927", name: "Chicken Sandwich", photoUrl: './_images/ChickfilA-Chicken-Sandwich.png', calory: '400'});
      $('#side2').data({ id: "1387599", name: "Chicken Deluxe Sandwich", photoUrl: './_images/Chicken-Deluxe-Sandwich.png', calory: '490'});
      $('#side3').data({ id: "779759", name: "Spicy Chicken Sandwich", photoUrl: './_images/Spicy-Chicken-Sandwich.png', calory: '490'});

  }
}

function setValue(num) {
  $("#currentPanel .menu").each(function(index) {
    var thisData = $(this).data();
    $(this).css("display", "block");
    $(this).find("img").attr("src", thisData.photoUrl);
    $(this).find(".name").html(thisData.name);
    $(this).find(".value").html(thisData.calory+'kcal');
    if (index+1 === num ) { return false;}
  })
}
