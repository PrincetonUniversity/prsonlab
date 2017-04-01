<a name="jspsych-text-timed"></a>

## jspsych-text-timed : <code>object</code>
This jsPsych plugin is based on the original jspsych-text plugin.It displays text, with the option of adding a timerFrom mind wandering task, March 2017.Used with jspsych-5.0.3

**Kind**: global namespace  
**Author**: jmildner@princeton.edu  
<a name="jspsych-text-timed.textTimed"></a>

### jspsych-text-timed.textTimed(trial)
**Kind**: static method of <code>[jspsych-text-timed](#jspsych-text-timed)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| trial | <code>Object</code> |  |  |
| trial.text | <code>string</code> |  | Text to display |
| [trial.cont_key] | <code>number</code> | <code>[]</code> | Keycodes of key presses that can end trial (as in jsPsych-text plugin: 'mouse' to use mouse, accepts key names too) |
| [trial.timeLeft] | <code>number</code> | <code></code> | Specify the lime limit on this trial. |

