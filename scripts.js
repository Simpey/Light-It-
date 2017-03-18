// ОШИБКА1{
  $(function() {
    $('.collapse').on('show.bs.collapse', function () {
      $('.collapse.in').collapse('hide');

    });
  });
       // }ОШИБКА1

       function firstToUpperCase( str ) {
        return str.substr(0, 1).toUpperCase() + str.substr(1);
      }

      function dateWithoutTime( str ) {
       var date=new Date(str);
       return date.getUTCMonth() + 1+"/" + date.getUTCDate() + "/" + date.getUTCFullYear();
     }

     $.ajax({
      url: 'https://randomuser.me/api/?results=8&inc=picture,name,gender,login,dob,email,cell,registered,phone,location',
      dataType: 'json',
      success: function(data) {
        console.log(data);
        var row = "";
        var hiddenRowColor="";
        var amountOfMales=0;
        var amountOfFemales=0;
        for (var i in data.results) {
          if(i%2==0){
           hiddenRowColor="#e2e1e1";
         }
         else{
          hiddenRowColor="#f9f9f9";
        }
        if(data.results[i].gender=="male"){
          amountOfMales++;
        }
        else{
          amountOfFemales++;
        }
        row += '<tr data-toggle="collapse" class="accordion-toggle" data-target="#hiddenTable'+i+'" >';
        row += '<td ><img src="'+data.results[i].picture.thumbnail+'" class="img-circle" alt="Profile Pic" width="60" height="60"></td>';
        row += '<td>' + firstToUpperCase(data.results[i].name.last)+ '</td>';
        row += '<td>' +firstToUpperCase(data.results[i].name.first) + '</td>';
        row += '<td>' + data.results[i].login.username + '</td>';
        row += '<td>' + data.results[i].phone + '</td>';
        row += '<td>' + data.results[i].location.state + '</td>';
        row += '<td ></td>';
        row += '</tr>';
        row += '<tr style="background-color:'+hiddenRowColor+'">';
        row += ' <td colspan="7" class="hiddenRow">';
        row += ' <div  class="accordian-body collapse clearfix" id="hiddenTable'+i+'">';
        row += '<div class="container-fluid">';
        row += '<table class="table" style="background-color:'+hiddenRowColor+'">';
        row += '<tr colspan="4"><span class="textBold" id="profileName">'+firstToUpperCase(data.results[i].name.first)+'<i class="fa fa-'+data.results[i].gender+' fa-fw" aria-hidden="true"></i></span></tr>';
        row += '<tr>';
        row += ' <td class="hiddenRow"><span class="textBold">Username </span>'+data.results[i].login.username+'</td>';
        row += ' <td class="hiddenRow"><span class="textBold">Address </span> '+data.results[i].location.street+'</td>';
        row += ' <td class="hiddenRow"><span class="textBold">Birthday </span> '+dateWithoutTime(data.results[i].dob)+'</td>';
        row += ' <td rowspan="3" class="hiddenRow"><img src="'+data.results[i].picture.large+'" class="img-circle" width="160" height="160"alt="Profile Pic Large" ></td>';
        row += ' </tr>';
        row += '<tr>';
        row += ' <td class="hiddenRow"><span class="textBold">Registered </span> '+dateWithoutTime(data.results[i].registered)+'</td>';
        row += ' <td class="hiddenRow"><span class="textBold">City </span> '+data.results[i].location.city+'</td>';
        row += ' <td class="hiddenRow"><span class="textBold">Phone </span> '+data.results[i].phone+'</td>';
        row += '</tr>';
        row += '<tr>';
        row += ' <td class="hiddenRow"><span class="textBold">Email </span> '+data.results[i].email+'</td>';
        row += ' <td class="hiddenRow"><span class="textBold">Zip Code </span> '+data.results[i].location.postcode+'</td>';
        row += ' <td class="hiddenRow"><span class="textBold">Cell </span> '+data.results[i].cell+'</td>';
        row += '</tr>';

        row += '</table></div></div></td>';
        row += '</tr>';

      }
      $(row).appendTo('#dataTable');
      var chart = AmCharts.makeChart( "chartdiv", {
        "type": "pie",
        "theme": "light",
        "dataProvider": [ {
          "gender": "male",
          "amount": amountOfMales
        }, {
          "gender": "female",
          "amount": amountOfFemales
        } ],
        "valueField": "amount",
        "titleField": "gender",
        "balloon":{
         "fixedPosition":false
       }
     } );


    }
  });


function searchFunc() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("dataTable");
  tr = table.getElementsByClassName("accordion-toggle");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

