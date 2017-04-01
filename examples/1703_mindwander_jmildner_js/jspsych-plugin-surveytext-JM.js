/**
 * @namespace surveytext-JM
 * @desc This jsPsych plugin is based on the original survey-text plugin.
 * It captures free response text with a layout that is better suited for long
 * input, or yes/no questions.
 * By default, enter is used to submit a response.
 * From mind wandering task, March 2017.
 * Used with jspsych-5.0.3
 * @author jmildner@princeton.edu
 */

jsPsych.plugins.surveytext_JM = function surveytext_JM() {
  /**
   * @name surveytext_JM
   * @memberof surveytext-JM
   * @function
   * @param {Object} trial
   * @param {string} trial.question Question prompt
   * @param {boolean} [trial.yesno=false] Is this a yes or no question? If true, the trial will end when y/Y or n/N is pressed.
   * @param {string} [trial.id='Q+index'] Name this trial
   * @param {boolean} [trial.longText=false] Do you want a full page text box for a long typed response?
   * @param {string} [trial.background=null] Specify a background color (in css accepted format, e.g. hex), if you want to change it for the duration of the trial.
   *
   */

  var plugin = {};

  plugin.trial = function(display_element, trial) {

    // set default values for parameters
    trial.question = trial.question || 'default value';
    trial.yesno = trial.yesno || false;
    trial.id = trial.id || "Q" + index;
    trial.longText = trial.longText || false;
    trial.background = trial.background || null;




    // allow variables as functions
    // this allows any trial variable to be specified as a function
    // that will be evaluated when the trial runs. this allows users
    // to dynamically adjust the contents of a trial as a result
    // of other trials, among other uses. you can leave this out,
    // but in general it should be included
    trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);
    //set background color
    if(trial.background){
              $('html').css("background-color", trial.background)
        }
    //create div
    display_element.append($('<div>',{
      "id": 'jspsych-survey-text',
      "class": 'jspsych-survey-text-question',
    }));
    //question text
    $("#jspsych-survey-text").append('<p class="jspsych-survey-text">'
        + trial.questions + '</p>')
    if(trial.width > $( document ).width()){
      console.log('trial: '+trial.width);
      console.log('window: '+$( document ).width());
      trial.width = $( document ).width()};
    $("#jspsych-survey-text").append('<textarea name="#jspsych-survey-text-response"'
        +'id="inputfield"> </textarea>')
    //Format the input differently if the long text option is on (for long responses)
    if(trial.longText){
      document.getElementById("inputfield").style.textAlign='left';
      document.getElementById("inputfield").style.fontSize= '1em';
      document.getElementById("inputfield").style.border='0.5px solid grey';
      document.getElementById("inputfield").style.marginTop='2em';
      document.getElementById("inputfield").style.padding='1em';
    }
    //Make the text box active
    document.getElementById("inputfield").focus()

    //Check if this is a yes or no trial
    if (trial.yesno) {
      //Wait until Y or N is pressed
      var input_text = document.getElementsByName("#jspsych-survey-text-response")
        $(input_text).keyup( function(e){
          var code = e.keyCode;
          if(code == 89 || code == 78){endTrial();}
        });
      } else {
        //Wait until enter is pressed
        var input_text = document.getElementsByName("#jspsych-survey-text-response")
          $(input_text).keyup( function(e){
            var code = e.keyCode;
            if(code == 13){endTrial();}
          });
      };

    function endTrial() {
    // measure response time
    var endTime = (new Date()).getTime();
    var response_time = endTime - startTime;

    // create object to hold responses
    var question_data = {};
    $("div.jspsych-survey-text-question").each(function(index) {
      var id = trial.id;
      var val = $(this).children('textarea').val();
      var obje = {};
      obje[id] = val;
      $.extend(question_data, obje);
    });

    var trial_data = {
      "rt": response_time,
      "responses": JSON.stringify(question_data)
    };

    display_element.html('')
    //clear background color
    if(trial.background){
      $('html').css("background-color", "");
    }
    // end trial
    jsPsych.finishTrial(trial_data);
  };
  var startTime = (new Date()).getTime();
};
  return plugin;
}();
