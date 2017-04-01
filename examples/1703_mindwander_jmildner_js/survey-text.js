/**
 * jspsych-survey-text
 * a jspsych plugin for free response survey questions
 *
 * Josh de Leeuw
 *
 * documentation: docs.jspsych.org
 * Edited by Judith Mildner
 */


jsPsych.plugins['survey-text'] = (function() {

  var plugin = {};

  plugin.trial = function(display_element, trial) {

    trial.preamble = typeof trial.preamble == 'undefined' ? "" : trial.preamble;
    if (typeof trial.rows == 'undefined') {
      trial.rows = 1;
    }
    if (typeof trial.columns == 'undefined') {
      trial.columns = 40;
      }

    // if any trial variables are functions
    // this evaluates the function and replaces
    // it with the output of the function
    trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);

    // show preamble text
    display_element.append($('<div>', {
      "id": 'jspsych-survey-text-preamble',
      "class": 'jspsych-survey-text-preamble'
    }));

    $('#jspsych-survey-text-preamble').html(trial.preamble);

    // add questions
      // create div
      display_element.append($('<div>', {
        "id": 'jspsych-survey-text',
        "class": 'jspsych-survey-text-question'
      }));

      // add question text
      $("#jspsych-survey-text").append('<p class="jspsych-survey-text">' + trial.questions + '</p>');

      // add text box
      $("#jspsych-survey-text").append('<textarea autofocus name="#jspsych-survey-text-response" cols="' + trial.columns + '" rows="' + trial.rows + '"></textarea>');


    // add submit button
    display_element.append($('<button color=transparent border=0px>', {
      'id': 'jspsych-survey-text',
      'class': 'jspsych-btn jspsych-survey-text'
    }));
    $("#jspsych-survey-text").html('Button');
    $("#jspsych-survey-text-response").keyup(function(event){
      if(event.keyCode == 13){
        $("#jspsych-survey-text").click();
      }
    });
    $("#jspsych-survey-text").click(function() {
      // measure response time
      var endTime = (new Date()).getTime();
      var response_time = endTime - startTime;

      // create object to hold responses
      var question_data = {};
      $("div.jspsych-survey-text-question").each(function(index) {
        var id = "Q" + index;
        var val = $(this).children('textarea').val();
        var obje = {};
        obje[id] = val;
        $.extend(question_data, obje);
      });

      // save data
      var trialdata = {
        "rt": response_time,
        "responses": JSON.stringify(question_data)
      };

      display_element.html('');

      // next trial
      jsPsych.finishTrial(trialdata);
    });

    var startTime = (new Date()).getTime();
  };

  return plugin;
})();
