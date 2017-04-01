/**
 * @namespace jspsych-text-timed
 * @desc This jsPsych plugin is based on the original jspsych-text plugin.
 * It displays text, with the option of adding a timer
 * From mind wandering task, March 2017.
 * Used with jspsych-5.0.3
 * @author jmildner@princeton.edu
 */

jsPsych.plugins.textTimed = (function() {
  /**
   * @name textTimed
   * @memberof jspsych-text-timed
   * @function
   * @param {Object} trial
   * @param {string} trial.text Text to display
   * @param {number} [trial.cont_key=[]] Keycodes of key presses that can end trial (as in jsPsych-text plugin: 'mouse' to use mouse, accepts key names too)
   * @param {number} [trial.timeLeft=null] Specify the lime limit on this trial. 
   *
   */
  var plugin = {};

  plugin.trial = function(display_element, trial) {

    trial.cont_key = trial.cont_key || [];
    trial.timeLeft = trial.timeLeft || null;

    // if any trial variables are functions
    // this evaluates the function and replaces
    // it with the output of the function
    trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);

    // set the HTML of the display target to replaced_text.
    display_element.html(trial.text);
    var timer = Math.round(1000*trial.timeLeft)
    console.log(timer)
    if(timer == 0){ timer = 100}
    //start the timer
    if(trial.timeLeft){
      var count = setTimeout(afterTimeOut,timer);
    }

    var after_response = function(info) {
      clearTimeout(count);
      display_element.html(''); // clear the display

      var trialdata = {
        "rt": info.rt,
        "key_press": info.key
      }
      jsPsych.finishTrial(trialdata);
    };

    var mouse_listener = function(e) {

      var rt = (new Date()).getTime() - startTime;

      display_element.unbind('click', mouse_listener);

      after_response({
        key: 'mouse',
        rt: rt
      });

    };

    // check if key is 'mouse'
    if (trial.cont_key == 'mouse') {
      display_element.click(mouse_listener);
      var startTime = performance.now();
    } else {
      jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: trial.cont_key,
        rt_method: 'performance',
        persist: false,
        allow_held_key: false
      });
    };

    function afterTimeOut(){
      clearTimeout(count);
      jsPsych.pluginAPI.cancelAllKeyboardResponses();
      display_element.html(''); // clear the display
      var rt = (new Date()).getTime() - startTime;
      var trialdata = {
        "rt": rt,
        "key_press": 'timeout'
      };
      jsPsych.finishTrial(trialdata);
    };
    var startTime = (new Date()).getTime();
  };

  return plugin;
})();
