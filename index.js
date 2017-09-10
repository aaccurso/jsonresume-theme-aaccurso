var fs = require('fs');
var gravatar = require('gravatar');
var _ = require('lodash')
var Mustache = require('mustache');

function render(resumeObject) {


	_.each(resumeObject.work, function(w){
		w.startDate = w.startDate.substr(0,7);
		if(w.endDate) {
			w.endDate = w.endDate.substr(0,7);
		} else { 
			w.endDate = 'Present'
		}
	});
	_.each(resumeObject.volunteer, function(w){
		w.startDate = w.startDate.substr(0,7);
		if(w.endDate) {
			w.endDate = w.endDate.substr(0,7);
		} else { 
			w.endDate = 'Present'
		}
	});
	_.each(resumeObject.education, function(e){
    if( !e.area || !e.studyType ){
      e.educationDetail = (e.area == null ? '' : e.area) + (e.studyType == null ? '' : e.studyType);
    }  else {
      e.educationDetail = e.area + ' – ' + e.studyType;
    }
		e.startDate = e.startDate.substr(0,7);
		if(e.endDate) {
			e.endDate = e.endDate.substr(0,7);
		}  else { 
			e.endDate = 'Present'
		}
	});
	resumeObject.profiles = {};

	_.each(resumeObject.basics.profiles, function(profile){
    	resumeObject.profiles[profile.network.toLowerCase()] = profile.username;
	});
	console.log(resumeObject.profiles);
	var theme = fs.readFileSync(__dirname + '/resume.template', 'utf8');
	var resumeHTML = Mustache.render(theme, resumeObject);
	

	return resumeHTML;
};
module.exports = {
	render: render
}
