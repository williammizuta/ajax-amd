define('ajax', [], function() {
	if (!String.prototype.trim) {
		(function(){
			// Make sure we trim BOM and NBSP
			var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
			String.prototype.trim = function () {
				return this.replace(rtrim, "");
			}
		})();
	}

	if (!String.prototype.isEmpty) {
		String.prototype.isEmpty = function() {
			var value;
			if(this !== null && this !== undefined){
				value = this.toString();
			}
			return value===null || value===undefined || value.trim()==="";
		};
	}

	return {
		'serializeObject': function(form){
			var inputs = Array.prototype.slice.call(form.getElementsByTagName("input")),
				textareas = Array.prototype.slice.call(form.getElementsByTagName("textarea")),
				selects = Array.prototype.slice.call(form.getElementsByTagName("select")),
				formElements = inputs.concat(textareas).concat(selects);

			return formElements.filter(function(element) {
				return !element.disabled && !element.name.isEmpty();
			}).reduce(function(serialize, element) {
				if(element.type === 'radio' || element.type === 'checkbox'){
					if(element.checked){
						serialize[element.getAttribute('name')] = element.value;
					}
				} else {
					serialize[element.getAttribute('name')] = element.value;
				}
				return serialize;
			}, {});
		}
	}
});
