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
  $("#Beverage").data({num: 11});
  $("#Desserts").data({num:3});
}
function setData(category) {

  if (category === "classic") {
      $('#classic1').data({ id: "25927", name: "Chicken Sandwich", photoUrl: './images/ChickfilA-Chicken-Sandwich.png', calory: '400'});
      $('#classic2').data({ id: "1387599", name: "Chicken Deluxe Sandwich", photoUrl: './images/Chicken-Deluxe-Sandwich.png', calory: '490'});
      $('#classic3').data({ id: "779759", name: "Spicy Chicken Sandwich", photoUrl: './images/Spicy-Chicken-Sandwich.png', calory: '490'});
      $('#classic4').data({ id: "874825", name: "Spicy Chicken Deluxe Sandwich", photoUrl: './images/Spicy-Chicken-Deluxe-Sandwich.png', calory: '570'});
      $('#classic5').data({ id: "27279", name: "Nuggets", photoUrl: './images/Nuggets.png', calory: '270'});
      $('#classic6').data({ id: "60107", name: "Chick-n-Strips", photoUrl: './images/ChicknStrips.png', calory: '360'});
      $('#classic7').data({ id: "8267448", name: "Grilled Chicken Club Sandwich", photoUrl: './images/Grilled-Chicken-Club-Sandwich.png', calory: '440'});
      $('#classic8').data({ id: "3373280", name: "Grilled Chicken Sandwich", photoUrl: './images/Grilled-Chicken-Sandwich.png', calory: '320'});
      $('#classic9').data({ id: "60108", name: "Chicken Salad Sandwich", photoUrl: './images/Chicken-Salad-Sandwich.png', calory: '500'});
      $('#classic10').data({ id: "7194136", name:"Grilled Nuggets", photoUrl: './images/Grilled-Nuggets-6.png', calory: '140'});
  } else if (category === "beverage") {
      $('#beverage1').data({ id: "60155", name: "Ice Tea - Sweet", photoUrl: './images/Iced-Tea-Sweetened.png', calory: '120'});
      $('#beverage2').data({ id: "60158", name: "Ice Tea - Unsweet", photoUrl: './images/Iced-Tea-Unsweetened.png', calory: '0'});
      $('#beverage3').data({ id: "60161", name: "Lemonade", photoUrl: './images/ChickfilA-Lemonade.png', calory: '230'});
      $('#beverage4').data({ id: "60148", name: "Diet Lemonade", photoUrl: './images/ChickfilA-Lemonade-diet.png', calory: '20'});
      $('#beverage5').data({ id: "60140", name: "Coca-Cola", photoUrl: './images/CocaCola.png', calory: '170'});
      $('#beverage6').data({ id: "60144", name: "Diet Coke", photoUrl: './images/Diet-Coke.png', calory: '0'});
      $('#beverage7').data({ id: "60152", name: "Dr Pepper", photoUrl: './images/Dr-Pepper.png', calory: '180'});
      $('#beverage8').data({ id: "60134", name: "Chick-fil-A Coffee", photoUrl: './images/ChickfilA-Coffee.png', calory: '5'});
      $('#beverage9').data({ id: "9582538", name: "Chick-fil-A Iced Coffee", photoUrl: './images/ChickfilA-Iced-Coffee.png', calory: '180'});
      $('#beverage10').data({ id: "60163", name: "Mlik", photoUrl: './images/Milk-Low-Fat.png', calory: '110'});
      $('#beverage11').data({ id: "60137", name: "Chocolate Milk", photoUrl: './images/Chocolate-Milk.png', calory: '150'});

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
