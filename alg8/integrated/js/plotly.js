// You can reproduce this figure in plotly.js with the following code!

// Learn more about plotly.js here: https://plot.ly/javascript/getting-started

/* Here's an example minimal HTML template
 *
 * <!DOCTYPE html>
 *   <head>
 *     <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
 *   </head>
 *   <body>
 *   <!-- Plotly chart will be drawn inside this div -->
 *   <div id="plotly-div"></div>
 *     <script>
 *     // JAVASCRIPT CODE GOES HERE
 *     </script>
 *   </body>
 * </html>
 */

(function() {

var config = {
  displaylogo: false, 
  collaborate: false,
  modeBarButtonsToRemove: ["lasso2d", "toggleSpikelines", "hoverClosestCartesian",
                           "pan2d", "zoom2d", "hoverCompareCartesian", "select2d", 
                           "autoScale2d"]
};

var trace1, trace2, data, layout;

trace1 = {
  x: [-1.1, -1.06381909548, -1.02763819095, -0.991457286432, -0.95527638191, -0.919095477387, -0.882914572864, -0.846733668342, -0.810552763819, -0.774371859296, -0.738190954774, -0.702010050251, -0.665829145729, -0.629648241206, -0.593467336683, -0.557286432161, -0.521105527638, -0.484924623116, -0.448743718593, -0.41256281407, -0.376381909548, -0.340201005025, -0.304020100503, -0.26783919598, -0.231658291457, -0.195477386935, -0.159296482412, -0.123115577889, -0.0869346733668, -0.0507537688442, -0.0145728643216, 0.021608040201, 0.0577889447236, 0.0939698492462, 0.130150753769, 0.166331658291, 0.202512562814, 0.238693467337, 0.274874371859, 0.311055276382, 0.347236180905, 0.383417085427, 0.41959798995, 0.455778894472, 0.491959798995, 0.528140703518, 0.56432160804, 0.600502512563, 0.636683417085, 0.672864321608, 0.709045226131, 0.745226130653, 0.781407035176, 0.817587939698, 0.853768844221, 0.889949748744, 0.926130653266, 0.962311557789, 0.998492462312, 1.03467336683, 1.07085427136, 1.10703517588, 1.1432160804, 1.17939698492, 1.21557788945, 1.25175879397, 1.28793969849, 1.32412060302, 1.36030150754, 1.39648241206, 1.43266331658, 1.46884422111, 1.50502512563, 1.54120603015, 1.57738693467, 1.6135678392, 1.64974874372, 1.68592964824, 1.72211055276, 1.75829145729, 1.79447236181, 1.83065326633, 1.86683417085, 1.90301507538, 1.9391959799, 1.97537688442, 2.01155778894, 2.04773869347, 2.08391959799, 2.12010050251, 2.15628140704, 2.19246231156, 2.22864321608, 2.2648241206, 2.30100502513, 2.33718592965, 2.37336683417, 2.40954773869, 2.44572864322, 2.48190954774, 2.51809045226, 2.55427135678, 2.59045226131, 2.62663316583, 2.66281407035, 2.69899497487, 2.7351758794, 2.77135678392, 2.80753768844, 2.84371859296, 2.87989949749, 2.91608040201, 2.95226130653, 2.98844221106, 3.02462311558, 3.0608040201, 3.09698492462, 3.13316582915, 3.16934673367, 3.20552763819, 3.24170854271, 3.27788944724, 3.31407035176, 3.35025125628, 3.3864321608, 3.42261306533, 3.45879396985, 3.49497487437, 3.53115577889, 3.56733668342, 3.60351758794, 3.63969849246, 3.67587939698, 3.71206030151, 3.74824120603, 3.78442211055, 3.82060301508, 3.8567839196, 3.89296482412, 3.92914572864, 3.96532663317, 4.00150753769, 4.03768844221, 4.07386934673, 4.11005025126, 4.14623115578, 4.1824120603, 4.21859296482, 4.25477386935, 4.29095477387, 4.32713567839, 4.36331658291, 4.39949748744, 4.43567839196, 4.47185929648, 4.50804020101, 4.54422110553, 4.58040201005, 4.61658291457, 4.6527638191, 4.68894472362, 4.72512562814, 4.76130653266, 4.79748743719, 4.83366834171, 4.86984924623, 4.90603015075, 4.94221105528, 4.9783919598, 5.01457286432, 5.05075376884, 5.08693467337, 5.12311557789, 5.15929648241, 5.19547738693, 5.23165829146, 5.26783919598, 5.3040201005, 5.34020100503, 5.37638190955, 5.41256281407, 5.44874371859, 5.48492462312, 5.52110552764, 5.55728643216, 5.59346733668, 5.62964824121, 5.66582914573, 5.70201005025, 5.73819095477, 5.7743718593, 5.81055276382, 5.84673366834, 5.88291457286, 5.91909547739, 5.95527638191, 5.99145728643, 6.02763819095, 6.06381909548, 6.1], 
  y: [-4.370971, -4.16268078894, -3.95439057789, -3.74610036683, -3.53781015578, -3.32951994472, -3.12122973367, -2.91293952261, -2.70464931156, -2.4963591005, -2.28806888945, -2.07977867839, -1.87148846734, -1.66319825628, -1.45490804523, -1.24661783417, -1.03832762312, -0.83003741206, -0.621747201005, -0.41345698995, -0.205166778894, 0.0031234321608, 0.211413643216, 0.419703854271, 0.627994065327, 0.836284276382, 1.04457448744, 1.25286469849, 1.46115490955, 1.6694451206, 1.87773533166, 2.08602554271, 2.29431575377, 2.50260596482, 2.71089617588, 2.91918638693, 3.12747659799, 3.33576680905, 3.5440570201, 3.75234723116, 3.96063744221, 4.16892765327, 4.37721786432, 4.58550807538, 4.79379828643, 5.00208849749, 5.21037870854, 5.4186689196, 5.62695913065, 5.83524934171, 6.04353955276, 6.25182976382, 6.46011997487, 6.66841018593, 6.87670039698, 7.08499060804, 7.2932808191, 7.50157103015, 7.70986124121, 7.91815145226, 8.12644166332, 8.33473187437, 8.54302208543, 8.75131229648, 8.95960250754, 9.16789271859, 9.37618292965, 9.5844731407, 9.79276335176, 10.0010535628, 10.2093437739, 10.4176339849, 10.625924196, 10.834214407, 11.0425046181, 11.2507948291, 11.4590850402, 11.6673752513, 11.8756654623, 12.0839556734, 12.2922458844, 12.5005360955, 12.7088263065, 12.9171165176, 13.1254067286, 13.3336969397, 13.5419871508, 13.7502773618, 13.9585675729, 14.1668577839, 14.375147995, 14.583438206, 14.7917284171, 15.0000186281, 15.2083088392, 15.4165990503, 15.6248892613, 15.8331794724, 16.0414696834, 16.2497598945, 16.4580501055, 16.6663403166, 16.8746305276, 17.0829207387, 17.2912109497, 17.4995011608, 17.7077913719, 17.9160815829, 18.124371794, 18.332662005, 18.5409522161, 18.7492424271, 18.9575326382, 19.1658228492, 19.3741130603, 19.5824032714, 19.7906934824, 19.9989836935, 20.2072739045, 20.4155641156, 20.6238543266, 20.8321445377, 21.0404347487, 21.2487249598, 21.4570151709, 21.6653053819, 21.873595593, 22.081885804, 22.2901760151, 22.4984662261, 22.7067564372, 22.9150466482, 23.1233368593, 23.3316270704, 23.5399172814, 23.7482074925, 23.9564977035, 24.1647879146, 24.3730781256, 24.5813683367, 24.7896585477, 24.9979487588, 25.2062389698, 25.4145291809, 25.622819392, 25.831109603, 26.0393998141, 26.2476900251, 26.4559802362, 26.6642704472, 26.8725606583, 27.0808508693, 27.2891410804, 27.4974312915, 27.7057215025, 27.9140117136, 28.1223019246, 28.3305921357, 28.5388823467, 28.7471725578, 28.9554627688, 29.1637529799, 29.372043191, 29.580333402, 29.7886236131, 29.9969138241, 30.2052040352, 30.4134942462, 30.6217844573, 30.8300746683, 31.0383648794, 31.2466550905, 31.4549453015, 31.6632355126, 31.8715257236, 32.0798159347, 32.2881061457, 32.4963963568, 32.7046865678, 32.9129767789, 33.1212669899, 33.329557201, 33.5378474121, 33.7461376231, 33.9544278342, 34.1627180452, 34.3710082563, 34.5792984673, 34.7875886784, 34.9958788894, 35.2041691005, 35.4124593116, 35.6207495226, 35.8290397337, 36.0373299447, 36.2456201558, 36.4539103668, 36.6622005779, 36.8704907889, 37.078781], 
  error_x: {color: 'rgba(31,119,180,1)'}, 
  error_y: {color: 'rgba(31,119,180,1)'}, 
  hoverinfo: ['text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text'], 
  hoverinfosrc: 'dimiller:4:11bbe2', 
  hoverlabel: {
    bgcolor: 'white', 
    font: {
      color: 'black', 
      family: '"lato",Arial,Helvetica,sans-serif', 
      size: 14
    }
  }, 
  hovertext: ['Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line', 'Prediction line'], 
  hovertextsrc: 'dimiller:4:a04480', 
  line: {
    color: 'darkgrey', 
    dash: 'dot'
  }, 
  marker: {
    color: 'rgba(31,119,180,1)', 
    line: {color: 'rgba(31,119,180,1)'}
  }, 
  mode: 'lines', 
  text: ['<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>', '<text>Prediction line</text>'], 
  textsrc: 'dimiller:4:459cd4', 
  type: 'scatter', 
  xaxis: 'x', 
  xsrc: 'dimiller:4:8d82e0', 
  yaxis: 'y', 
  ysrc: 'dimiller:4:49f231'
};
trace2 = {
  x: [1.8651316, 5.5408401, 1.9655862, 2.2833786, 2.3364544, 1.1340086, 2.4469376, 1.7561698, 1.2528601, 1.5987816, 2.6821661, 1.6970823, 2.6165333, 4.7292032, 1.9900069, 1.0457125, 1.6068168, 2.441473, 2.1064775, 1.4684262, 1.6597376, 0.61888814, 2.9132805, 2.8710833, 2.3799958, 1.5991197, -0.17874527, 2.670063, 1.7172008, 2.4041224, 2.401372, 2.0279779, 1.5927191, 2.7352929, 1.8463202, 2.9624748, 4.0906916, 1.5329747, 1.6485233, 1.5176964, 2.1521907, 2.4884727, 4.0893211, 2.2457185, 2.1853838, 2.339313, 1.4837594, 2.2040558, 2.8771615, 2.081449, 2.3297253, 3.0084171, 1.9136848, 1.9417152, 1.63901, 3.3248048, 0.98815632, 1.7404718, 1.5859861, 2.1186256, 1.9453669, 2.2335486, 3.2220387, 1.829813, 1.8290319, 1.7591715, 1.8275962, 1.645334, 2.699935, 3.2124786, 2.637991, 1.0470715, 1.4711907, 2.6329083, 3.6862659, 4.2362461, 1.1050615, 1.5672703, 2.4009476, 2.2070799, 2.2071929, 2.9824533, 2.5663257, 2.6656127, 2.5429254, 2.4563694, 1.4861922, 2.4459643, 2.4829493, 2.609941, 2.6268337, 3.1416354, 2.7791138, 2.6261716, 3.2662194], 
  y: [7.4034967, 45.816225, 20.504169, 19.679424, 13.924631, 7.9986952, 3.0500978, 0.31562001, 8.5549086, 15.84186, 2.2062957, 1.0923288, 14.161289, 17.603989, 6.1169535, 6.2127471, 18.00207, 31.33342, 17.288893, 6.7412376, 8.9194804, -21.9428, 2.3881322, 20.383553, 16.98117, 15.870759, 14.775454, 11.941735, 5.7119116, 29.402196, 14.909583, 8.3934925, -2.0533651, 25.80336, 12.732433, 17.839178, 10.027507, 8.866401, 19.341056, 8.7820515, 22.758432, 11.275168, 21.892776, 16.022468, 13.464616, 8.5939497, 24.849154, 13.731815, 9.610267, 19.391692, 16.128439, 18.455532, 17.30919, 20.441487, 15.757266, 30.31196, 6.8246827, 8.2558922, 17.326382, 11.969285, 18.217331, 5.7151981, 33.874092, 18.266943, 0.96406713, 10.984462, 12.165296, 20.181715, 24.145591, 6.7288756, 28.821442, -0.93564242, 30.190796, 17.150486, 19.39303, 13.7205, 8.9786448, 20.06536, 18.344304, 26.993906, 21.041662, 14.609307, 15.960254, 19.022286, 17.465961, 26.25322, 19.883679, 14.975242, 34.949267, 17.11937, 17.740299, 37.352651, 17.466611, 17.695697, 16.717903], 
  error_x: {color: 'rgba(255,127,14,1)'}, 
  error_y: {color: 'rgba(255,127,14,1)'}, 
  hoverinfo: ['text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text'], 
  hoverinfosrc: 'dimiller:4:966e38', 
  hoverlabel: {
    bgcolor: 'white', 
    font: {
      color: 'black', 
      family: '"lato",Arial,Helvetica,sans-serif', 
      size: 14
    }
  }, 
  hovertext: ['<b> Mobile County School District, AL </b> <br> 1962 Black students <br> 1703 White students', '<b> Atlanta City School District, GA </b> <br> 2783 Black students <br> 381 White students', '<b> Henrico County Public Schools, VA </b> <br> 1479 Black students <br> 1613 White students', '<b> Knox County School District, TN </b> <br> 593 Black students <br> 3279 White students', '<b> Baltimore City Public Schools, MD </b> <br> 4498 Black students <br> 391 White students', '<b> Columbus City School District, OH </b> <br> 2341 Black students <br> 914 White students', '<b> Howard County Public Schools, MD </b> <br> 937 Black students <br> 1738 White students', '<b> Forsyth County School District, GA </b> <br> 117 Black students <br> 2402 White students', '<b> Rutherford County School District, TN </b> <br> 661 Black students <br> 2190 White students', '<b> Virginia Beach City Public Schools, VA </b> <br> 1307 Black students <br> 2674 White students', '<b> Davis School District, UT </b> <br> 86 Black students <br> 4835 White students', '<b> Cleveland Municipal School District, OH </b> <br> 2252 Black students <br> 529 White students', '<b> Union County Public Schools, NC </b> <br> 440 Black students <br> 2367 White students', '<b> District of Columbia Public Schools, DC </b> <br> 2833 Black students <br> 362 White students', '<b> Baltimore County Public Schools, MD </b> <br> 3025 Black students <br> 3202 White students', '<b> Jordan School District, UT </b> <br> 55 Black students <br> 3645 White students', '<b> Frisco Independent School District, TX </b> <br> 436 Black students <br> 2141 White students', '<b> Anne Arundel County Public Schools, MD </b> <br> 1164 Black students <br> 3075 White students', '<b> Jefferson County School District, KY </b> <br> 2599 Black students <br> 3257 White students', '<b> Chesterfield County Public Schools, VA </b> <br> 1266 Black students <br> 2424 White students', '<b> Douglas County School District, CO </b> <br> 43 Black students <br> 3997 White students', '<b> Detroit City School District, MI </b> <br> 4225 Black students <br> 180 White students', '<b> Alpine School District, UT </b> <br> 52 Black students <br> 4987 White students', '<b> Guilford County Schools, NC </b> <br> 2262 Black students <br> 2053 White students', '<b> Greenville County School District, SC </b> <br> 1200 Black students <br> 3098 White students', '<b> Jefferson Parish School District, LA </b> <br> 1466 Black students <br> 983 White students', '<b> Clayton County School District, GA </b> <br> 2885 Black students <br> 103 White students', '<b> Cherry Creek School District, CO </b> <br> 455 Black students <br> 2332 White students', '<b> Duval County School District, FL </b> <br> 3554 Black students <br> 3015 White students', '<b> Plano Independent School District, TX </b> <br> 520 Black students <br> 1750 White students', '<b> Chandler Unified District, AZ </b> <br> 214 Black students <br> 1968 White students', '<b> Volusia County School District, FL </b> <br> 718 Black students <br> 2684 White students', '<b> Loudoun County Public Schools, VA </b> <br> 417 Black students <br> 3182 White students', '<b> Forsyth County Schools, NC </b> <br> 1235 Black students <br> 1720 White students', '<b> Capistrano Unified School District, CA </b> <br> 52 Black students <br> 2358 White students', '<b> Seminole County School District, FL </b> <br> 701 Black students <br> 2641 White students', '<b> Fulton County School District, GA </b> <br> 3055 Black students <br> 2186 White students', '<b> Hawaii Department of Education, HI </b> <br> 281 Black students <br> 1604 White students', '<b> Metropolitan Nashville Public School District, TN </b> <br> 2387 Black students <br> 1614 White students', '<b> Pasco County School District, FL </b> <br> 323 Black students <br> 3415 White students', '<b> Lewisville Independent School District, TX </b> <br> 419 Black students <br> 2082 White students', '<b> Manatee County School District, FL </b> <br> 447 Black students <br> 1820 White students', '<b> DeKalb County School District, GA </b> <br> 4586 Black students <br> 731 White students', '<b> Round Rock Independent School District, TX </b> <br> 370 Black students <br> 1660 White students', '<b> Elk Grove Unified School District, CA </b> <br> 671 Black students <br> 1053 White students', '<b> Milwaukee School District, WI </b> <br> 2841 Black students <br> 584 White students', '<b> Klein Independent School District, TX </b> <br> 543 Black students <br> 1346 White students', '<b> Fort Bend Independent School District, TX </b> <br> 1604 Black students <br> 1022 White students', '<b> Jefferson County School District, CO </b> <br> 60 Black students <br> 4208 White students', '<b> Conroe Independent School District, TX </b> <br> 292 Black students <br> 2283 White students', '<b> Collier County School District, FL </b> <br> 413 Black students <br> 1340 White students', '<b> Cobb County School District, GA </b> <br> 2766 Black students <br> 3350 White students', '<b> Katy Independent School District, TX </b> <br> 606 Black students <br> 2173 White students', '<b> Arlington Independent School District, TX </b> <br> 1173 Black students <br> 1039 White students', '<b> Washoe County School District, NV </b> <br> 106 Black students <br> 1961 White students', '<b> Wake County Schools, NC </b> <br> 2949 Black students <br> 6345 White students', '<b> Corona-Norco Unified School District, CA </b> <br> 228 Black students <br> 1153 White students', '<b> Polk County School District, FL </b> <br> 1458 Black students <br> 3033 White students', '<b> Prince William County Public Schools, VA </b> <br> 1352 Black students <br> 2248 White students', '<b> Mesa Unified District, AZ </b> <br> 215 Black students <br> 2447 White students', '<b> Garland Independent School District, TX </b> <br> 868 Black students <br> 870 White students', '<b> Tucson Unified District, AZ </b> <br> 232 Black students <br> 783 White students', '<b> Charlotte-Mecklenburg Schools, NC </b> <br> 4581 Black students <br> 3599 White students', '<b> Lee County School District, FL </b> <br> 958 Black students <br> 2980 White students', '<b> Philadelphia City School District, PA </b> <br> 6759 Black students <br> 1742 White students', '<b> Osceola County School District, FL </b> <br> 514 Black students <br> 1091 White students', '<b> San Bernardino City Unified School District, CA </b> <br> 475 Black students <br> 256 White students', '<b> Fairfax County Public Schools, VA </b> <br> 1424 Black students <br> 5529 White students', '<b> North East Independent School District, TX </b> <br> 397 Black students <br> 1486 White students', '<b> Montgomery County Public Schools, MD </b> <br> 2285 Black students <br> 3642 White students', '<b> Long Beach Unified School District, CA </b> <br> 859 Black students <br> 840 White students', '<b> Aldine Independent School District, TX </b> <br> 1060 Black students <br> 73 White students', '<b> San Antonio Independent School District, TX </b> <br> 243 Black students <br> 99 White students', '<b> Fresno Unified School District, CA </b> <br> 467 Black students <br> 539 White students', '<b> Austin Independent School District, TX </b> <br> 461 Black students <br> 1503 White students', '<b> Denver County School District, CO </b> <br> 823 Black students <br> 1184 White students', '<b> Pasadena Independent School District, TX </b> <br> 304 Black students <br> 244 White students', '<b> El Paso Independent School District, TX </b> <br> 170 Black students <br> 396 White students', '<b> Fort Worth Independent School District, TX </b> <br> 1320 Black students <br> 663 White students', '<b> Cypress-Fairbanks Independent School District, TX </b> <br> 1556 Black students <br> 2378 White students', '<b> Gwinnett County School District, GA </b> <br> 4519 Black students <br> 3635 White students', '<b> Palm Beach County School District, FL </b> <br> 3620 Black students <br> 4486 White students', '<b> Albuquerque Public Schools, NM </b> <br> 167 Black students <br> 1380 White students', '<b> San Diego City Unified School District, CA </b> <br> 828 Black students <br> 1986 White students', '<b> Orange County School District, FL </b> <br> 3730 Black students <br> 4022 White students', '<b> Hillsborough County School District, FL </b> <br> 3224 Black students <br> 5388 White students', '<b> Northside Independent School District, TX </b> <br> 546 Black students <br> 1441 White students', '<b> Broward County School District, FL </b> <br> 7539 Black students <br> 4404 White students', '<b> Dallas Independent School District, TX </b> <br> 2606 Black students <br> 441 White students', '<b> Houston Independent School District, TX </b> <br> 3663 Black students <br> 1272 White students', '<b> Clark County School District, NV </b> <br> 3457 Black students <br> 6859 White students', '<b> Chicago Public School District, IL </b> <br> 9941 Black students <br> 2329 White students', '<b> Dade County School District, FL </b> <br> 5517 Black students <br> 2166 White students', '<b> New York City Department Of Education, NY </b> <br> 19048 Black students <br> 10459 White students', '<b> Los Angeles Unified School District, CA </b> <br> 3533 Black students <br> 3666 White students'], 
  hovertextsrc: 'dimiller:4:dfa164', 
  line: {color: 'rgba(255,127,14,1)'}, 
  marker: {
    color: '#56B4E9', 
    line: {color: '#222'}, 
    opacity: 0.5, 
    size: [35.8360633337, 41.6278482683, 31.8400585682, 22.1824862927, 51.4270070604, 38.6358151101, 26.4675191737, 12.9160046348, 23.1124447957, 30.2617616126, 11.8595898125, 38.0000366817, 19.8715620446, 41.9508496469, 43.1654362986, 10.5879364752, 19.8061356953, 28.868523575, 40.413472553, 29.8704512336, 10, 50.0117787067, 10.4475207746, 38.0720915132, 29.2269788478, 31.7240886426, 42.2837615903, 20.1143005143, 46.3253206177, 21.1226157853, 15.5258885628, 23.8556849253, 19.491179872, 29.5703575828, 10.4475207746, 23.6372062099, 43.3516940711, 16.9871142237, 38.9596829723, 17.8149370742, 19.5246664513, 19.9853465771, 51.8739919295, 18.679755618, 23.2450909201, 42.002264553, 21.4641468726, 32.9301330305, 10.8137070801, 17.2095880895, 19.4239649307, 41.5173677542, 22.364240202, 28.9586511273, 12.5592939795, 42.6894073242, 15.8483033879, 31.6524668268, 30.6842477982, 15.5492616063, 25.6811373274, 15.9385911313, 51.8487105934, 26.7010611617, 61.7964821242, 21.0322848666, 20.4318103991, 31.3458590948, 19.1517936629, 38.2372155761, 25.5762938461, 27.8006290144, 16.1829446614, 20.305624139, 20.2102736006, 25.1513241174, 17.4475589301, 14.437091433, 30.3845502735, 32.5167488614, 51.5340682765, 46.702555168, 14.3579772724, 25.2108958983, 47.3237170454, 44.3842757579, 21.5081568702, 64.9555744214, 40.4604437242, 46.9464815707, 45.7644847755, 73.7717112504, 56.3627953746, 100, 46.204558096], 
    sizemode: 'diameter', 
    sizeref: 2, 
    sizesrc: 'dimiller:4:268430'
  }, 
  mode: 'markers', 
  text: ['<text>Mobile County School District, AL</text>', '<text>Atlanta City School District, GA</text>', '<text>Henrico County Public Schools, VA</text>', '<text>Knox County School District, TN</text>', '<text>Baltimore City Public Schools, MD</text>', '<text>Columbus City School District, OH</text>', '<text>Howard County Public Schools, MD</text>', '<text>Forsyth County School District, GA</text>', '<text>Rutherford County School District, TN</text>', '<text>Virginia Beach City Public Schools, VA</text>', '<text>Davis School District, UT</text>', '<text>Cleveland Municipal School District, OH</text>', '<text>Union County Public Schools, NC</text>', '<text>District of Columbia Public Schools, DC</text>', '<text>Baltimore County Public Schools, MD</text>', '<text>Jordan School District, UT</text>', '<text>Frisco Independent School District, TX</text>', '<text>Anne Arundel County Public Schools, MD</text>', '<text>Jefferson County School District, KY</text>', '<text>Chesterfield County Public Schools, VA</text>', '<text>Douglas County School District, CO</text>', '<text>Detroit City School District, MI</text>', '<text>Alpine School District, UT</text>', '<text>Guilford County Schools, NC</text>', '<text>Greenville County School District, SC</text>', '<text>Jefferson Parish School District, LA</text>', '<text>Clayton County School District, GA</text>', '<text>Cherry Creek School District, CO</text>', '<text>Duval County School District, FL</text>', '<text>Plano Independent School District, TX</text>', '<text>Chandler Unified District, AZ</text>', '<text>Volusia County School District, FL</text>', '<text>Loudoun County Public Schools, VA</text>', '<text>Forsyth County Schools, NC</text>', '<text>Capistrano Unified School District, CA</text>', '<text>Seminole County School District, FL</text>', '<text>Fulton County School District, GA</text>', '<text>Hawaii Department of Education, HI</text>', '<text>Metropolitan Nashville Public School District, TN</text>', '<text>Pasco County School District, FL</text>', '<text>Lewisville Independent School District, TX</text>', '<text>Manatee County School District, FL</text>', '<text>DeKalb County School District, GA</text>', '<text>Round Rock Independent School District, TX</text>', '<text>Elk Grove Unified School District, CA</text>', '<text>Milwaukee School District, WI</text>', '<text>Klein Independent School District, TX</text>', '<text>Fort Bend Independent School District, TX</text>', '<text>Jefferson County School District, CO</text>', '<text>Conroe Independent School District, TX</text>', '<text>Collier County School District, FL</text>', '<text>Cobb County School District, GA</text>', '<text>Katy Independent School District, TX</text>', '<text>Arlington Independent School District, TX</text>', '<text>Washoe County School District, NV</text>', '<text>Wake County Schools, NC</text>', '<text>Corona-Norco Unified School District, CA</text>', '<text>Polk County School District, FL</text>', '<text>Prince William County Public Schools, VA</text>', '<text>Mesa Unified District, AZ</text>', '<text>Garland Independent School District, TX</text>', '<text>Tucson Unified District, AZ</text>', '<text>Charlotte-Mecklenburg Schools, NC</text>', '<text>Lee County School District, FL</text>', '<text>Philadelphia City School District, PA</text>', '<text>Osceola County School District, FL</text>', '<text>San Bernardino City Unified School District, CA</text>', '<text>Fairfax County Public Schools, VA</text>', '<text>North East Independent School District, TX</text>', '<text>Montgomery County Public Schools, MD</text>', '<text>Long Beach Unified School District, CA</text>', '<text>Aldine Independent School District, TX</text>', '<text>San Antonio Independent School District, TX</text>', '<text>Fresno Unified School District, CA</text>', '<text>Austin Independent School District, TX</text>', '<text>Denver County School District, CO</text>', '<text>Pasadena Independent School District, TX</text>', '<text>El Paso Independent School District, TX</text>', '<text>Fort Worth Independent School District, TX</text>', '<text>Cypress-Fairbanks Independent School District, TX</text>', '<text>Gwinnett County School District, GA</text>', '<text>Palm Beach County School District, FL</text>', '<text>Albuquerque Public Schools, NM</text>', '<text>San Diego City Unified School District, CA</text>', '<text>Orange County School District, FL</text>', '<text>Hillsborough County School District, FL</text>', '<text>Northside Independent School District, TX</text>', '<text>Broward County School District, FL</text>', '<text>Dallas Independent School District, TX</text>', '<text>Houston Independent School District, TX</text>', '<text>Clark County School District, NV</text>', '<text>Chicago Public School District, IL</text>', '<text>Dade County School District, FL</text>', '<text>New York City Department Of Education, NY</text>', '<text>Los Angeles Unified School District, CA</text>'], 
  textfont: {
    size: [35.8360633337, 41.6278482683, 31.8400585682, 22.1824862927, 51.4270070604, 38.6358151101, 26.4675191737, 12.9160046348, 23.1124447957, 30.2617616126, 11.8595898125, 38.0000366817, 19.8715620446, 41.9508496469, 43.1654362986, 10.5879364752, 19.8061356953, 28.868523575, 40.413472553, 29.8704512336, 10, 50.0117787067, 10.4475207746, 38.0720915132, 29.2269788478, 31.7240886426, 42.2837615903, 20.1143005143, 46.3253206177, 21.1226157853, 15.5258885628, 23.8556849253, 19.491179872, 29.5703575828, 10.4475207746, 23.6372062099, 43.3516940711, 16.9871142237, 38.9596829723, 17.8149370742, 19.5246664513, 19.9853465771, 51.8739919295, 18.679755618, 23.2450909201, 42.002264553, 21.4641468726, 32.9301330305, 10.8137070801, 17.2095880895, 19.4239649307, 41.5173677542, 22.364240202, 28.9586511273, 12.5592939795, 42.6894073242, 15.8483033879, 31.6524668268, 30.6842477982, 15.5492616063, 25.6811373274, 15.9385911313, 51.8487105934, 26.7010611617, 61.7964821242, 21.0322848666, 20.4318103991, 31.3458590948, 19.1517936629, 38.2372155761, 25.5762938461, 27.8006290144, 16.1829446614, 20.305624139, 20.2102736006, 25.1513241174, 17.4475589301, 14.437091433, 30.3845502735, 32.5167488614, 51.5340682765, 46.702555168, 14.3579772724, 25.2108958983, 47.3237170454, 44.3842757579, 21.5081568702, 64.9555744214, 40.4604437242, 46.9464815707, 45.7644847755, 73.7717112504, 56.3627953746, 100, 46.204558096], 
    sizesrc: 'dimiller:4:abf757'
  }, 
  textsrc: 'dimiller:4:a8bf3b', 
  type: 'scatter', 
  xaxis: 'x', 
  xsrc: 'dimiller:4:da5703', 
  yaxis: 'y', 
  ysrc: 'dimiller:4:69e9d8'
};
data = [trace1, trace2];
layout = {
  annotations: [
    {
      x: 0.85, 
      y: 2.7, 
      font: {size: 13}, 
      showarrow: false, 
      text: '↑ White higher', 
      xanchor: 'left', 
      xref: 'paper'
    }, 
    {
      x: 0.85, 
      y: -2.1, 
      font: {size: 13}, 
      showarrow: false, 
      text: '↓ Black higher', 
      xanchor: 'left', 
      xref: 'paper'
    }
  ], 
  font: {
    color: 'black', 
    family: '"lato",Arial,Helvetica,sans-serif', 
    size: 14
  }, 
  hovermode: 'closest', 
  margin: {
    r: 10, 
    t: 25, 
    b: 40, 
    l: 10
  }, 
  showlegend: false, 
  xaxis: {
    automargin: true, 
    domain: [0, 1], 
    nticks: 14, 
    range: [-1.1, 6.1], 
    showgrid: false, 
    showline: true, 
    ticks: 'outside', 
    title: 'White – Black Test Score Gap', 
    titlefont: {
      color: 'black', 
      family: '"lato",Arial,Helvetica,sans-serif', 
      size: 18
    }, 
    zeroline: false
  }, 
  yaxis: {
    automargin: true, 
    domain: [0, 1], 
    fixedrange: true, 
    nticks: 14, 
    range: [-32, 52], 
    showgrid: false, 
    showline: true, 
    ticks: 'outside', 
    title: 'White – Black Enrollment Gap', 
    titlefont: {
      color: 'black', 
      family: '"lato",Arial,Helvetica,sans-serif', 
      size: 18
    }, 
    zeroline: true
  }
};


Plotly.plot('plotly-div', {
  data: data,
  layout: layout,
  config: config
});




function makePan(e) {
  $(".modebar-btn[data-val=reset]").css("display", "inline-block");
  //$(".modebar-btn[data-title='Zoom out']").css("display", "inline-block");

  $("#plotly-div").unbind('plotly_relayout');
  Plotly.relayout('plotly-div', {dragmode: 'pan'});
  setTimeout(function() {
    $("#plotly-div").on('plotly_relayout', makeZoom);
  },200);
}

var xRange = layout.xaxis.range.slice();
function makeZoom(event, d) {
  if ((d['xaxis.range[0]'] != xRange[0]) || (d['xaxis.range[1]'] != xRange[1])) return;

  $(".modebar-btn[data-val=reset]").css("display", "none");
  //$(".modebar-btn[data-title='Zoom out']").css("display", "none");


  $("#plotly-div").unbind('plotly_relayout');
  Plotly.relayout('plotly-div', {dragmode: 'zoom'});
  setTimeout(function() {
    $("#plotly-div").on('plotly_relayout', makePan);
  }, 200);
}

$("#plotly-div").on('plotly_relayout', makePan);
$(".modebar-btn[data-val=reset]").css("display", "none");
//$(".modebar-btn[data-title='Zoom out']").css("display", "none");


//use my own formatting for the tooltip - definately hackish
$("#plotly-div")[0].on('plotly_hover', function(data) { 

  var i = data.points[0].pointIndex;
  var points = d3.selectAll("#plotly-div .points path");
  if (data.points[0].curveNumber == 1) {
    points.style("opacity", 0.2);
    d3.select(points[0][i]).style("opacity", 1);
  }

  //get default text properties
  /*dflt = d3.select("#plotly-div .hovertext text.nums");

  //add new g with the custom HTML set by the text field
  d3.select("#plotly-div .hovertext")
    .append("g")
      .attr("transform", "translate(" + dflt.attr("x") + "," + dflt.attr("y") + ")")
      .attr("text-anchor", dflt.attr("text-anchor"))
      .attr("style", dflt.attr("style"))
    .html(data.points[0].text); //text field stores custom text*/
});

$("#plotly-div")[0].on('plotly_unhover', function(data) { 
  d3.selectAll("#plotly-div .points path")
    .style("opacity", 0.5)
});



})();


//Plotly.relayout('plotly-div', {dragmode: 'pan'})
//Plotly.relayout('plotly-div', {dragmode: 'pan'})