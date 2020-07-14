// account.js
import { ProjectFactory } from './factory/ProjectFactory';

if (window.__BASE__) {
	const projectPages = new ProjectFactory(window.__BASE__, window.__DATA_HANDLER__);
	projectPages.get('MainComponent', '#family');
} else {
	const split = window.location.host.split('.');
	const brand = split[split.length-2];
	window.location.replace(`//id.${brand}.com/error`);
}