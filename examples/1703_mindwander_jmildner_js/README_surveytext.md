<a name="surveytext-JM"></a>

## surveytext-JM : <code>object</code>
This jsPsych plugin is based on the original survey-text plugin.It captures free response text with a layout that is better suited for longinput, or yes/no questions.By default, enter is used to submit a response.From mind wandering task, March 2017.Used with jspsych-5.0.3

**Kind**: global namespace  
**Author**: jmildner@princeton.edu  
<a name="surveytext-JM.surveytext_JM"></a>

### surveytext-JM.surveytext_JM(trial)
**Kind**: static method of <code>[surveytext-JM](#surveytext-JM)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| trial | <code>Object</code> |  |  |
| trial.question | <code>string</code> |  | Question prompt |
| [trial.yesno] | <code>boolean</code> | <code>false</code> | Is this a yes or no question? If true, the trial will end when y/Y or n/N is pressed. |
| [trial.id] | <code>string</code> | <code>&quot;&#x27;Q+index&#x27;&quot;</code> | Name this trial |
| [trial.longText] | <code>boolean</code> | <code>false</code> | Do you want a full page text box for a long typed response? |
| [trial.background] | <code>string</code> | <code>null</code> | Specify a background color (in css accepted format, e.g. hex), if you want to change it for the duration of the trial. |

