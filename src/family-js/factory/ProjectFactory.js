// project factory
import { setStore } from '../stores/projectStore';

import Vue from 'vue';
import ProjectMain from '../components/ProjectMain.vue';

const COMPONENTS = {
	'MainComponent': {
		version: 1,
		obj: ProjectMain
	}
};

/**
 *  factory
 */
class ProjectFactory {
	/**
	 * ObjectFactory initialized with objects/functions for communication with surroundings
	 * @param {object}
	 * @prop  {string} locale language ID used for translations e.g. 'en-ww'
	 * @prop  {string} environment test/stage/prod
	 * @prop  {object} externalLinks link templates from CONFIG that can override URL links configured in project files
	 */

	constructor(base, dataHandler) {
		this.store = setStore({
			state: {
				locale: base.locale,
				translate: base.translate,
				brand: base.brand,
				moment: base.moment,
				environment: base.environment,
				externalLinks: base.externalLinks,
				webLinks: base.webLinks,
				configData: base.configData,
				userData: dataHandler.userData
			}
		})
	}

	/**
	 * Get component by it's name and element where component should be bind
	 * @param  {string} compName Name of component you want
	 * @param  {object} element  Element object (e.g. from document.querySelector('...'))
	 * @param  {object} params   Object which specified version of component
	 * @return {object}          return component object
	 */

	get(compName, mountPoint, params = {version: 1}) {
		const component = COMPONENTS[compName];
		if (typeof component !== 'undefined' && component.version === params.version) {
			return new Vue({
				render: h => h(component.obj),
				// router: this.router,
				store: this.store
			}).$mount(mountPoint)
		}
		return undefined;
	}
}

export {
	ProjectFactory
}; 