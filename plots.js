// Dynamically Generate Dropdown Menu Items
function init() {
  // Using D3.select() method to selct the dropdown menu
  var selector = d3.select("#selDataset");

  // D3.json() method is used to read the data from sample.json file
  d3.json("samples.json").then((data) => {
    console.log(data);
    // Inside the data object, the names array, as seen from console.log(data), contains the ID 
    // numbers of all the study participants. The variable sampleNames is assigned to this array
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
    optionChanged(sampleNames[0])
  }
)}

init();


// Function called when a change takes place in the dropdown menu in the browser
function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
}

// Declare the first function: buildMetadata()
function buildMetadata(sample) {
  // d3.json() pulls in the entire dataset contained in samples.json. 
  // Once the dataset is read in, it is referred to as data
  d3.json("samples.json").then((data) => {
    // The metadata array in the dataset (data.metadata) is assigned the variable metadata
    var metadata = data.metadata;
    // Then the filter() method is called on the metadata array to filter for an object in the array whose id property 
    // matches the ID number passed into buildMetadata() as sample. Recall that each object in
    // the metadata array contains information about one person
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    // Because the results of the filter() method are returned as an array, the first item in the array (resultArray[0])
    // is selected and assigned the variable result
    var result = resultArray[0];
    console.log(result)
    // The id of the Demographic Info panel is sample-metadata. The d3.select() method is used to select this <div>, and 
    // the variable PANEL is assigned to it
    var PANEL = d3.select("#sample-metadata");
    
    // PANEL.html("") ensures that the contents of the panel are cleared when another ID number
    // is chosen from the dropdown menu
    PANEL.html("");
    // Finally, the append() and text() methods are chained to append a H6 heading to the panel 
    // and print the location of the volunteer to the panel, respectively.
    Object.entries(result).forEach(([key, value]) => {
      console.log(`${key}: ${value}`)
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

    // Create gauge
    wfreq = result.wfreq;
    console.log(wfreq);

    // Enter a speed between 0 and 180
    var level = wfreq;

    // Trig to calc meter point
    var degrees = (9-level)*20;
    console.log(degrees)
        radius = .2;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);
    

    // Path: may have to change to create a better triangle
    var mainPath = 'M -.0 -0.015 L .0 0.015 L ',
    pathX = String(x),
    space = ' ',
    pathY = String(y),
    pathEnd = 'Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);

    var data = [{ type: 'pie',
      x: [0], y:[0],
        marker: {size: 28, color:'850000'},
        showlegend: false,
        name: 'Belly Buttom Washing',
        text: level,
        hoverinfo: 'text+name'},
      { values: [81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81],
      rotation: 90,
      direction: "clockwise",
      text: ['0-1', '1-2', '2-3', '3-4',
                '4-5', '5-6', '6-7', '7-8', '8-9', ''],
      textinfo: 'text',
      textposition:'inside',
      marker: {colors:['','','','','','','','','','white']},
      labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9', ''],
      hoverinfo: 'label',
      hole: .5,
      type: 'pie',
      showlegend: false
    }];

    var layout = {
      shapes:[{
          type: 'path',
          path: path,
          fillcolor: '850000',
          line: {
            color: '850000'
          }
        }],
      title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
      height: 600,
      width: 600,
      xaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]},
      yaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]}
    };

    Plotly.newPlot('gauge', data, layout);
    });
}


function buildCharts(sample) {

  d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var resultArraySamples = samples.filter(sampleObj => sampleObj.id == sample)
    var resultSamples = resultArraySamples[0]
    console.log(resultSamples);

    var SampleValues = resultSamples.sample_values.slice(0,10).reverse()
    var OTU_ID_num = resultSamples.otu_ids.slice(0,10).reverse()
    var OTU_ID_String = OTU_ID_num.map(id => id.toString())
    var OTU_Labels = resultSamples.otu_labels.slice(0,10).reverse()

    // Adding the prefix OTU to yaxis
    var yaxis_OTU = OTU_ID_String.map(el => prefix = "OTU " + el);
    console.log(yaxis_OTU);

    // Create a Bar Chart with the Arrays
    var trace = {
      x: SampleValues,
      y: yaxis_OTU,
      text: OTU_Labels,
      type: "bar",
      orientation: "h"
    };
    var data = [trace];

    var layout = {
      title: 'Top Ten Bacterial Species by Individual',
    };

    Plotly.newPlot("bar", data, layout);

    // Create a bubble chart
    var trace1 = {
      y: resultSamples.sample_values,
      x: resultSamples.otu_ids,
            mode: 'markers',
      marker: {
        color: resultSamples.otu_ids,
        colorscale: 'Jet',
        size: resultSamples.sample_values
      }
    };
    
    var data = [trace1];
    
    var layout = {
      title: 'Relative Frequency of All the Bacterial Species by Individual',
    };
    
    Plotly.newPlot("bubble", data, layout);
    });
  
};


