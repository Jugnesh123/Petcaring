@extends("layout")
@section("title", "Hello")
@section('body')
<script>
     google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {

  // Create the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Type');
  data.addColumn('number', 'Count');
  data.addRows([
    ['Pet Owner', {{$petowner}}],
    ['Pet Organization', {{$petorganization}}],
  ]);

  // Set chart options
  var options = {'width':"100%",
                 'height':"100%"};

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(document.getElementById('user_chart'));
  chart.draw(data, options);
  }
</script>
<div class="d-flex justify-content-center align-items-center" style="width: 100%; height: 100%;">
  <div id="user_chart" style="height: 100%; width: 100%;"></div>
</div>
<script>
    document.getElementById("section-body").classList.remove("m-5");
    document.getElementById("section-body").style.height = "calc(100vh - 100px)";
</script>

@endsection