$(document).ready(function(){

  $.getJSON('data/data.json', function(data) {

    var sort1 = function(){

        function SortByCountry(b, a){
          var bCountry = a.index;
          var aCountry = b.index; 
          return ((aCountry < bCountry) ? -1 : ((aCountry > bCountry) ? 1 : 0));
        }

        data.sort(SortByCountry);

        $("#icons").empty();
          
          for (i=0; i<data.length; i++) {
            
            if (data[i].sex == "F") {
              $("#icons").append('<div class="athlete female '+data[i].country+' index' + i + '" id="index'+data[i].index+'"><img class="country" src="img/flags/'+data[i].country+'.png"></div>');
            } else if (data[i].sex == "M") {
              $("#icons").append('<div class="athlete male '+data[i].country+' index' + i + '" id="index'+data[i].index+'"><img class="country" src="img/flags/'+data[i].country+'.png"></div>');
            }
          }
        $(".athlete").css("display","inline-table");
    };

  sort1();

   var sort2 = function(){

      // function parseDate(str) {
      //     var mdy = str.split('/')
      //     return new Date(mdy[2], mdy[0]-1, mdy[1]);
      // }

      // function daydiff(first, second) {
      //     return Math.round((second-first)/(1000*60*60*24));
      // }

      // var array1 = ["x"];
      // var array2 = []

      // for (i=0; i<data.length; i++) {
      //   //var today = new Date();
      //   var today = parseDate("8/27/2015")
      //   var days_in = daydiff(parseDate(data[i].infractiondate), today);
      //   var years_in = Math.round(days_in/365*10)/10;
      //   if (data[i].ineligabletodate != "Lifetime ban") {
      //     var days_left = daydiff(today, parseDate(data[i].ineligabletodate));
      //     var years_left = Math.round(days_left/365*10)/10;
      //   } else {
      //     var years_left = 20.0;
      //   }
      //   data[i].years_in = years_in;
      //   data[i].years_left = years_left;
      //   array1.push(data[i].country)
      //   array2.push(years_in)
      // }

      // function SortByDaysIn(b, a){
      //   var aCountry = a.years_in;
      //   var bCountry = b.years_in; 
      //   return ((aCountry < bCountry) ? -1 : ((aCountry > bCountry) ? 1 : 0));
      // }

      // function SortBarChart(b, a){
      //   return ((a < b) ? -1 : ((a > b) ? 1 : 0));
      // }

      // data.sort(SortByDaysIn)

      // array2.sort(SortBarChart);
      // array2.unshift("value");

      var array1 = ["x"];
      var array2 = []

      for (i=0; i<data.length; i++) {
        array1.push(data[i].country);
        if (data[i].ineligibleyears == 100) {
          array2.push(15)
        } else {
          array2.push(data[i].ineligibleyears)
        }
      }

      function SortBySanction(b, a){
        var aCountry = a.ineligibleyears;
        var bCountry = b.ineligibleyears; 
        return ((aCountry < bCountry) ? -1 : ((aCountry > bCountry) ? 1 : 0));
      }

      function SortBarChart(b, a){
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
      }

      data.sort(SortBySanction)

      array2.sort(SortBarChart);
      array2.unshift("value");

      $("#icons").empty();
        
        for (i=0; i<data.length; i++) {

          if (data[i].sex == "F") {
            $("#icons").append('<div class="athlete female '+data[i].country+' index' + i + '" id="index'+data[i].index+'"><img class="country" src="img/flags/'+data[i].country+'.png"></div>');
          } else if (data[i].sex == "M") {
            $("#icons").append('<div class="athlete male '+data[i].country+' index' + i + '" id="index'+data[i].index+'"><img class="country" src="img/flags/'+data[i].country+'"></div>');
          }
        }

      $(".athlete").css("display","block");
      $(".athlete").css({"width":"35px","height":"35px"});
      $("#icons").append('<div id="rank3" class="large-12 columns"></div>');

      var rank2 = c3.generate({
        bindto: '#rank3',
        data: {
            x: 'x',
            columns: [array1, array2],
            type: 'bar',
            colors: { value: '#F7A6A2'},
            labels: {
      //            format: function (v, id, i, j) { return "Default Format"; },
                  format: {
                      //value: d3.format('years'),
                      value: function (v, id, i, j) { 
                        if (v == 15) {
                          return "Lifetime ban";
                        } else {
                          return v + " ineligible years";
                        }
                         
                      },
                  }
            }
        },
        bar: {
            width: 25,
        },
        axis: {
            rotated: true,
            x: {
                type: 'category',
                show: false
            },
            y: {
              show: false,
              max: 18
            }
        },
        tooltip: {
            grouped: false
        },
        legend: {
            show: false
        }
    });


    };


   var sort3 = function(){
    
      function parseDate(str) {
          var mdy = str.split('/')
          return new Date(mdy[2], mdy[0]-1, mdy[1]);
      }

      function daydiff(first, second) {
          return Math.round((second-first)/(1000*60*60*24));
      }

      var array1 = ["x"];
      var array2 = []

      for (i=0; i<data.length; i++) {
        //var today = new Date();
        var today = parseDate("8/27/2015")
        var days_in = daydiff(parseDate(data[i].infractiondate), today);
        var years_in = Math.round(days_in/365*10)/10;
        if (data[i].ineligabletodate != "Lifetime ban") {
          var days_left = daydiff(today, parseDate(data[i].ineligabletodate));
          var years_left = Math.round(days_left/365*10)/10;
        } else {
          var years_left = 10;
        }
        data[i].years_in = years_in;
        data[i].years_left = years_left;
        array1.push(data[i].country)
        array2.push(years_left)
      }

      function SortByDaysIn(a, b){
        var aCountry = a.years_left;
        var bCountry = b.years_left; 
        return ((aCountry < bCountry) ? -1 : ((aCountry > bCountry) ? 1 : 0));
      }

      function SortBarChart2(a, b){
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
      }

      data.sort(SortByDaysIn)

      array2.sort(SortBarChart2);
      array2.unshift("value");

      $("#icons").empty();
        
        for (i=0; i<data.length; i++) {

          if (data[i].sex == "F") {
            $("#icons").append('<div class="athlete female '+data[i].country+' index' + i + '" id="index'+data[i].index+'"><img class="country" src="img/flags/'+data[i].country+'.png"></div>');
          } else if (data[i].sex == "M") {
            $("#icons").append('<div class="athlete male '+data[i].country+' index' + i + '" id="index'+data[i].index+'"><img class="country" src="img/flags/'+data[i].country+'"></div>');
          }
        }

      $(".athlete").css("display","block");
      $(".athlete").css({"width":"35px","height":"35px"});
      $("#icons").append('<div id="rank2" class="large-12 columns"></div>');


      var rank3 = c3.generate({
        bindto: '#rank2',
        data: {
            x: 'x',
            columns: [array1, array2],
            type: 'bar',
            colors: { 
              value: '#F7A6A2'
              // value: function (v, id, i, j) { 
              //           if (i%2 == 1) {
              //             return "#7C6464";
              //           } else {
              //             return "blue";
              //           }
                         
              //         },
            },
            labels: {
      //            format: function (v, id, i, j) { return "Default Format"; },
                  format: {
                      //value: d3.format('years'),
                      value: function (v, id, i, j) { 
                        if (v == 10) {
                          return "Lifetime ban";
                        } else {
                          return v + " years left";
                        }
                         
                      },
                  }
            }
        },
      padding: {
        right: 0,
      },
        bar: {
            width: 25,
        },
        axis: {
            rotated: true,
            x: {
                type: 'category',
                show: false
            },
            y: {
              show: false,
              max: 12
            }
        },
        tooltip: {
            grouped: false
        },
        legend: {
            show: false
        }
    });


    };


    $("#sort1").click(function(){
      $(".sort").removeClass("selected");
      $(this).addClass("selected");
      if ($("#sort1").hasClass("selected")) {
        $(".instruction2").css("display","");
      } else {
        $(".instruction2").css("display","none");
      }      
      sort1();
    })

    $(".clear").click(function(){
      $(".sort").removeClass("selected");
      $("#sort1").addClass("selected");
      if ($("#sort1").hasClass("selected")) {
        $(".instruction2").css("display","");
      } else {
        $(".instruction2").css("display","none");
      }
      $("text").find("tspan").css({"fill":"","font-weight":"", "font-size":""})      
      sort1();
    })

    $("#sort2").click(function(){
      $(".sort").removeClass("selected");
      $(this).addClass("selected");
      $("text").find("tspan").css({"font-weight":"","text-decoration":"","fill":"","font-size":""});
      if ($("#sort1").hasClass("selected")) {
        $(".instruction2").css("display","");
      } else {
        $(".instruction2").css("display","none");
      }      
      sort2();
    })

    $("#sort3").click(function(){
      $(".sort").removeClass("selected");
      $(this).addClass("selected");
      $("text").find("tspan").css({"font-weight":"","text-decoration":"","fill":"","font-size":""});
      if ($("#sort1").hasClass("selected")) {
        $(".instruction2").css("display","");
      } else {
        $(".instruction2").css("display","none");
      }      
      sort3();
    })

    $( document ).on( "mouseover", ".athlete", function () {
      var which_athlete = $(this).attr("id");
      for (i=0;i<data.length;i++) {
          if ("index" + data[i].index == which_athlete) {
            $(this).css("opacity", 0.6)
            $("#tooltip").html("<h5>" + data[i].firstname + " " + data[i].lastname + "</h5><br><b>Country:</b> " + data[i].country + "<br><b>Violation:</b> "+ data[i].rule + "<br><b>Sanction: </b>" + data[i].sanction + "<br><b>Infraction Date:</b> " + data[i].infractiondate + "<br><b>Ineligible until:</b> " + data[i].ineligabletodate);
          }
        }
      $("#tooltip").css("display","inline");
      $( document ).on( "mousemove", function (e) {
        var windowWidth = $(window).width();
        if (e.pageX <= windowWidth/2) {
                $("#tooltip").css("top", e.pageY + 20);
                $("#tooltip").css("left", e.pageX + 20);  
        } else {

                $("#tooltip").css("top", e.pageY + 20);
                $("#tooltip").css("left", e.pageX - 310);  
        }      
      });
    });

    $( document ).on( "mouseout", ".athlete", function () {
      var which_athlete = $(this).attr("id");
      $(this).css("opacity", 1)
      $("#tooltip").css("display","none");
    });

  $("#chart1 text").on("click", function(){
    if ($("#sort1").hasClass("selected")) {
      var country = $(this).find("tspan").html();
      $(".athlete").css("display","none");
      $("."+country).css("display","inline-table");
    }
  })

  $("#chart3 text").on("click", function(){
    if ($("#sort1").hasClass("selected")) {
      var country = $(this).find("tspan").html();
      $(".athlete").css("display","none");
      $("."+country).css("display","inline-table");
    }
  })

  $("#chart2 text").on("click", function(){
    if ($("#sort1").hasClass("selected")) {
      var drug = $(this).find("tspan").html();
      $(".athlete").css("display","none");
      for (i=0; i<data.length; i++) {
        if (data[i].a == drug || data[i].b == drug || data[i].c == drug) {
          $(".index"+i).css("display","inline-table");
        }
      }
    }
    
  })

  $("#chart4 text").on("click", function(){
    if ($("#sort1").hasClass("selected")) {
      var drug = $(this).find("tspan").html();
      $(".athlete").css("display","none");
      for (i=0; i<data.length; i++) {
        if (data[i].a == drug || data[i].b == drug || data[i].c == drug) {
          $(".index"+i).css("display","inline-table");
        }
      }
    }
    
  })

  $("text").on("mousemove", function(){
    if ($("#sort1").hasClass("selected")) {
      $(this).find("tspan").css({"text-decoration":"underline"})
    }
  })

  $("text").on("mouseout", function(){
    if ($("#sort1").hasClass("selected")) {
      $(this).find("tspan").css({"text-decoration":""})
    }
  })

  $("text").on("click", function(){
    if ($("#sort1").hasClass("selected")) {
      $("text").find("tspan").css({"fill":"","font-weight":"", "font-size":""})
      $(this).find("tspan").css({"fill":"#CD5C5C","font-weight":"bold","font-size":""})
    }
  })
        

});

var loadChart1 = function(the_div) {

  var chart = c3.generate({
      bindto: the_div,
      data: {
          x: 'x',
          columns: [
                    ['x', 'Russia', 'India','Morocco', 'Kenya','Turkey', 'Brazil','Ukraine', 'Italy','France', 'Romania', 'Sweden', 'USA'],
                    ['value', 43,34,16,15,13,12,12,10,9,8,8,8]
                  ],
          type: 'bar',
          colors: { value: '#CD5C5C'},
          labels: true
      },
      padding: {
        left: 125,
      },
      bar: {
          // width: {
          //     ratio: 0.7 // this makes bar width 50% of length between ticks
          // }
          width: 20,
      },
            axis: {
          rotated: true,
          x: {
              type: 'category',
              tick: {
                centered: true
              },
              inverted: true
          },
          y: {
            type: 'indexed',
            tick: {
              values: [0, 10, 20, 30, 40, 50],
              outer: true,

            },
            // inverted: true
          }
      },
      grid: {
        y: {
          show: true
        }
      },
      tooltip: {
          grouped: false
      },
      legend: {
          show: false
      }
  });

};

var loadChart2 = function(the_div) {

  var chart2 = c3.generate({
      bindto: the_div,
      data: {
          x: 'x',
          columns: [
                    ['x', 'Stanozolol', 'Norandrosterone','Dehydrochloromethyltestosterone','EPO', 'Methandienone','Testosterone', 'Clenbuterol','Metenolone', 'Methylhexaneamine','Drostanolone','Furosemide'],
                    ['value', 45,27,20,20,15,15,11,9,8,7,7]
                  ],
          type: 'bar',
          colors: { value: '#CD5C5C'},
          labels: true
      },
      padding: {
        left: 220,
      },
      bar: {
          // width: {
          //     ratio: 0.7 // this makes bar width 50% of length between ticks
          // }
          width: 22,
      },
      axis: {
          rotated: true,
          x: {
              type: 'category',
              tick: {
                centered: true,
                multiline: false,
              },
              inverted: true,
          },
          y: {
            type: 'indexed',
            tick: {
              values: [0, 10, 20, 30, 40, 50],
            },
            
          }
      },
      grid: {
        y: {
          show: true
        }
      },
      tooltip: {
          grouped: false
      },
      legend: {
          show: false
      }
  });

};

loadChart1("#chart1");
loadChart1("#chart3");
loadChart2("#chart2");
loadChart2("#chart4");


  // var chart3 = c3.generate({
  //     bindto: '#chart3',
  //     data: {
  //         x: 'x',
  //         columns: [
  //                   ['x', '04', '05','06','07', '08','09', '10','11', '12','13','14',"15"],
  //                   ['value', 5,4,0,3,6,8,11,18,19,60,126,27]
  //                 ],
  //         type: 'bar',
  //         colors: { value: '#CD5C5C'},
  //         labels: true
  //     },
  //     bar: {
  //         // width: {
  //         //     ratio: 0.7 // this makes bar width 50% of length between ticks
  //         // }
  //         width: 22,
  //     },
  //     padding: {
  //       bottom: 20,
  //     }, 
  //     axis: {
  //         // rotated: true,
  //         x: {
  //             type: 'category',
  //             tick: {
  //               centered: true
  //             },
  //         },
  //         y: {
  //           type: 'indexed',
  //           tick: {
  //             values: [0, 30, 60, 90, 120],
  //             outer: false,

  //           },
  //           max: 130,
  //           // inverted: true
  //         }
  //     },
  //     grid: {
  //       y: {
  //         show: true
  //       }
  //     },
  //     tooltip: {
  //         grouped: false
  //     },
  //     legend: {
  //         show: false
  //     }
  // });



  
});